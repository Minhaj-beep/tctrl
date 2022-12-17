import React, {useState, useEffect} from 'react'

import { LinearGradient } from 'expo-linear-gradient'

import { Dimensions, View, Text, ImageBackground, Image } from 'react-native'

import styled from 'styled-components/native'

import ViewPager from "@react-native-community/viewpager";

import VideoPlayer from "./VideoPlayer";
import Info from "./Info";
import Sidebar from "./Sidebar";

const {height, width} = Dimensions.get("window");

const Container = styled(ViewPager)`
  height: 100%;
`

const Gradient = styled(LinearGradient)`
  height: 100%;
  justify-content: space-between;
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  z-Index: 2;
`
const Center = styled.View`
  flex: 1;
  flex-direction: row;
`

class Hero extends React.Component{

  constructor(props){  
    super(props);
    this.state = {
      // videoArr: [...this.props.items, ...this.props.api]
    }
}

  state = {
    selected:0
  } 

  // componentDidMount() {
  // this.props.navigation.navigation.addListener('focus', () => {
  //     console.log("hello2");
  //   });
    
  //   this.props.navigation.navigation.addListener('blur', () => {
  //    // console.log("hello");
  //    this.setState({selected:-1})
  //   });
  // }

  componentWillUnmount() {
   // this._unsubscribe();
  }


  setSelected=(postition)=>{
    console.log(postition);
    this.setState({selected:postition});
  }
  mergeArr (){
    let arr = [...this.props.items, ...this.props.api]
    console.log(arr)
    return arr
  }
  getLang (res){
    this.props.getLanguage.getLang(res)
  }

  render(){
    // console.log(this.props.finalData)
    return (
      <>
      <Container orientation='vertical'
        
        onPageSelected={e => this.setSelected(e.nativeEvent.position)} //.sort(() => Math.random() - 0.5)
        initialPage = {0}
      >
        {!this.props.loading && this.props.finalData != null ? 
        this.props.finalData.map((item, index) => {
          return (
            <View style={{justifyContent:"center", alignItems:"center"}} key={index}>
              <Image source={{uri: `https://i.ytimg.com/vi/${item.bookUrl}/maxresdefault.jpg`}} style={{height:"100%", width:width, alignItems:"center", position:"absolute"}}/>
              <VideoPlayer
                video={item.bookUrl}
                // poster={item.snippet.thumbnails.high.url}
                isPlay={this.state.selected === index}
              />
              <Gradient
                Location= {[0, 0.26, 0.6, 1]}
                colors={[
                  'rgba(26,26,26,0.6)',
                  'rgba(26,26,26,0)',
                  'rgba(26,26,26,0)',
                  'rgba(26,26,26,0.6)',
                ]}
              >
              <Center>
                <Info user={item.author} description={item.title} />
                <Sidebar viewCount={item.video_count} shareCount={item.share_count} video={item.bookUrl} id={item.id} getLanguage = {{ getLang: this.getLang.bind(this)}} />
              </Center>
              </Gradient>
            </View>
          )
        })
        :
        <></>
      }
      </Container></>
    )
  }

}

export default Hero