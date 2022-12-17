import React, {useState, useRef, useEffect, useContext} from "react";
import {Dimensions, TouchableOpacity, StatusBar, SafeAreaView, Image, Text, View, TextInput, ScrollView} from "react-native";
import FooterTabs from "../components/nav/FooterTabs";
import Header from "../components/ctrlModule/Header";
import Hero from "../components/ctrlModule/Hero"
import Hero2 from "../components/ctrlModule/longs/Hero";
import Tabs from "../components/ctrlModule/Tabs"
// import { getData } from "../components/Storage";
import styled from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  
`
const Home = ({navigation}) => {
  const [lang, setLang] = useState(null)
  const [allData, setAllData] = useState(null)
  const [finalLoading, setFinalLoading] = useState(true)

  const getVideos = async (val) => {
    let lang2 = val
    const currentLang = await AsyncStorage.getItem('preffredLang')
    if(val == null){
      lang2 = currentLang
    }
    try {
      const jsonValue = await AsyncStorage.getItem('allVideos')
      let value = JSON.parse(jsonValue)
      
      if(value!=null){
        let arr = []
        value.map((i)=>{
          if(lang2 == i.author){
            arr.push(i)
            // console.log(i.title)
          }
        })
        setAllData(arr)
        setFinalLoading(false)
      }
    } catch(e) {
        console.log(e)
    }
}

const storeLang = async (value) => {
  try {
    await AsyncStorage.setItem('preffredLang', value)
  } catch (e) {
    console.log(e)
  }
}

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('language')
      if(value !== null) {
        setLang(value)
      }
    } catch(e) {
      // error reading value
    }
  }
  
  useEffect(()=>{ 
    setFinalLoading(true)
    getVideos(lang)
    storeLang(lang)
  },[lang])

  // useEffect (() => {
  //   fetch("https://bloomtelly.herokuapp.com/allshorts")
  //   .then(res => res.json())
  //   .then(data => {
  //     setAllData(data)
  //     setFinalLoading(false)
  //   })
  // },[])

  const getLang = (res) => { setLang(res) }
  const getType = (res) => { setType(res); console.log(res) }

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Container>
        <View style={{height:'100%', width:"100%", position:"absolute", backgroundColor:"#000", justifyContent:"center", alignItems:"center"}}><Image source={require('../assets/process.gif')} style={{width:125, height:150}} /></View> 
        {/* <Header navigation={navigation} getType={{getType: getType.bind(this)}}/> */}
        {/* { !finalLoading && type == 'shorts' ? <Hero navigation={navigation} finalLoading={finalLoading} finalData={allData} getLanguage={{getLang: getLang.bind(this)}} /> : <View style={{height:'100%', justifyContent:"center", alignItems:"center"}}><Image source={require('../assets/snail.gif')} style={{width:125, height:150}} /></View>} */}
        <Hero navigation={navigation} finalLoading={finalLoading} finalData={allData} getLanguage={{getLang: getLang.bind(this)}} />
        <Tabs/>
      </Container>
      <SafeAreaView style={{flex:1, position:"absolute", width:"100%", bottom:0, flexDirection:"row", justifyContent:"space-between", zIndex:1000, elevation:1000 }}>
        <FooterTabs type={'Longs'} />
      </SafeAreaView>
    </>
  )
};
export default Home;
