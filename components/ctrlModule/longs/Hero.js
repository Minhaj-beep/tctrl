import React, {useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions, View, FlatList, ImageBackground, StatusBar, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import HeroShow from './HeroShow'
const {width, height} = Dimensions.get('window');

const Gradient = styled(LinearGradient)`
  height: 100%;
  justify-content: space-between;
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  z-Index: 2;
  elevation:2
`

const Hero = ({allData}) => { //https://bloomtelly.herokuapp.com/akbarenglish

    // allData.map((i)=> console.log(i))
    const calc = (h) => {
        let ratio = height/width
        return (h/ratio * 1.9740740740)/width
    }
    

    return (
        <Gradient
            Location= {[0, 0.26, 0.6, 1]}
            colors={[
                'rgba(26,26,26,0.6)',
                'rgba(26,26,26,0)',
                'rgba(26,26,26,0)',
                'rgba(26,26,26,0.6)',
            ]}
        >
            <View style={{width:width, height:StatusBar.currentHeight+(width*0.157), }}></View>
            <View style={{flex:1, width:width, alignItems:"center"}}>
            {allData == null ? <></> :
                <FlatList 
                    data={allData}
                    renderItem={({item})=>{
                        return <HeroShow item = {item} />
                    }}
                />
            }
            </View>
        </Gradient>
    )
}

export default Hero