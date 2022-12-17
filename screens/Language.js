import React, {useState, useEffect} from "react"
import {View, Text, StatusBar, Dimensions, Image, ScrollView} from 'react-native'
import { storeData } from "../components/Storage";
const {width, height} = Dimensions.get('window');
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Language = ({navigation}) => {
    const [lang, setLang] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(true)

    const calc = (h) => {
      let ratio = height/width
      return (h/ratio * 1.9740740740)/width
    }

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('allLang')
          let value = JSON.parse(jsonValue)
          
          if(value!=null){
            setLang(value)
            setLoading(false)
          }
        } catch(e) {
            console.log(e)
        }
    }

    const allVideos = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('allVideos', jsonValue)
      } catch (e) {
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

    useEffect(()=>{
        getData()
        fetch("https://thoughtctrl.herokuapp.com/allshorts")
        .then(res=>res.json())
        .then(data=>{
          allVideos(data)
          setLoading2(false)
        });
    },[])

    return (
        <LinearGradient colors={['#040302', '#081537', '#040302']} style={{flex:1}}>
            {loading && loading2 ? <></> :
            <ScrollView contentContainerStyle={{top:StatusBar.currentHeight*2, flex:1, justifyContent:"center", alignItems:"center"}}>
            <Image source={require('../assets/process.gif')} style={{width:width*calc(200), height:width*calc(200), alignSelf:"center"}} />
            <View style={{width:"100%",  justifyContent:"center", alignItems:"center"}}>
                <Text style={{color:"#1D3F98", fontSize:width*calc(17), padding:10}}>What is your preferred language?</Text>
                {lang.map((i)=>{
                    return (
                        <Text style={{fontWeight:"bold", color:'#fff', marginBottom:width*calc(5), paddingHorizontal:width*0.2, borderWidth:width*calc(2), borderColor:"#0E1F4B", padding:width*calc(10), borderRadius:20, fontSize:width*calc(20)}} onPress={()=>{storeLang(i._id); navigation.replace('Home')}}>{i.name}</Text>
                    )
                })}
                {/* <Text style={{fontWeight:"bold", marginBottom:5, paddingHorizontal:width*0.2, borderWidth:2, borderColor:"#0E1F4B", padding:10, borderRadius:20, fontSize:20}} onPress={()=>{storeData('English'); navigation.replace('Home')}}>English</Text>
                <Text style={{fontWeight:"bold", marginBottom:5, paddingHorizontal:width*0.2, borderWidth:2, borderColor:"#0E1F4B", padding:10, borderRadius:20, fontSize:20}} onPress={()=>{storeData('हिन्दी'); navigation.replace('Home')}}>हिन्दी</Text>
                <Text style={{fontWeight:"bold", marginBottom:5, paddingHorizontal:width*0.2, borderWidth:2, borderColor:"#0E1F4B", padding:10, borderRadius:20, fontSize:20}} onPress={()=>{storeData('मराठी'); navigation.replace('Home')}}>मराठी</Text>
                <Text style={{fontWeight:"bold", marginBottom:5, paddingHorizontal:width*0.2, borderWidth:2, borderColor:"#0E1F4B", padding:10, borderRadius:20, fontSize:20}} onPress={()=>{storeData('বাংলা'); navigation.replace('Home')}}>বাংলা</Text>
                <Text style={{fontWeight:"bold", marginBottom:5, paddingHorizontal:width*0.2, borderWidth:2, borderColor:"#0E1F4B", padding:10, borderRadius:20, fontSize:20}} onPress={()=>{storeData('ಕನ್ನಡ'); navigation.replace('Home')}}>ಕನ್ನಡ</Text> */}
            </View>
            <Image source={require('../assets/ctrl.png')} style={{width:width*calc(100), height:width*calc(100), alignSelf:"center", top:StatusBar.currentHeight*2}} />
            <View style={{width:width, height:width/2.5}}></View>
            </ScrollView>
            }
        </LinearGradient>
    )
}

export default Language