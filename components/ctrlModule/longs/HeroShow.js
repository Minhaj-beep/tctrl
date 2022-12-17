import React, { useRef, useEffect, useState} from "react";
import {Image, TouchableOpacity, Pressable, Share, ImageBackground, SafeAreaView, StyleSheet, Text, View, TextInput, ScrollView, Linking, Dimensions, Modal, Alert} from "react-native";
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconA from 'react-native-vector-icons/Ionicons'
import YoutubePlayer from "react-native-youtube-iframe"
import { LinearGradient } from 'expo-linear-gradient'

const HeroShow = (props) => {
    const [play, setPlay] = useState(null)

    const calc = (h) => {
        let ratio = height/width
        return (h/ratio * 1.9740740740)/width
    }
    
    return (
        <LinearGradient colors={['#040302', '#585E82']} start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
          style={{flex:1, width: width*0.9, height: width*0.65, borderRadius:5, borderWidth:2, alignItems:"center", borderColor:"#585E82", marginVertical:4,}}>
              <TouchableOpacity onPress={(event)=>{
            // global.foo=props.item.bookUrl;
            // // console.log(event.target.value)
            // props.onChange(true)
          }}>   
                { play != null ? 
                    <YoutubePlayer 
                    height={width * 0.5}
                    width={width * 0.888}
                    play={true}
                    videoId={play}
                    style={{zIndex:1000, elevation:1000, position:"absolute"}}
                    />
                :
                    <>
                    <Pressable onPress={()=>setPlay(props.item.bookUrl)} style={{alignItems:"center"}}>
                        <Image source={{ uri: `https://i.ytimg.com/vi/${props.item.bookUrl}/sddefault.jpg` }} style={{ height: width * 0.48, width: width * 0.889, resizeMode: "cover", borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
                        <IconA name='md-play-circle-outline' size={80} color={'white'} style={{ position: "absolute", alignSelf: "center", top: width * 0.17 }} />
                    </Pressable>
                    </>
                }
               </TouchableOpacity>
                  <View style={{flex:1, flexDirection:"row"}}>
                     <View style={{ height:width*0.16, justifyContent:"center", width:width*0.75, marginLeft:5 }}>
                       <Text numberOfLines={2} style={{color:"#FFF", fontWeight:"bold", fontSize:width*calc(16)}} >{props.item.title}</Text>
                       {/* <Text numberOfLines={1} style={{color:"#FFF", fontWeight:"normal"}} >{getDate()}</Text> */}
                     </View>
                     <View style={{width:width*0.1, height:width*0.16, alignItems:"center", justifyContent:"center", marginHorizontal:10}}>
                       <Icon name="share" size={width*calc(33)} color="#FFF" onPress={()=>{}}/>
                     </View>
                  </View>
        </LinearGradient> 
    )
}

export default HeroShow