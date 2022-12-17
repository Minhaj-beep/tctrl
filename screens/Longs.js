import React, {useState, useEffect} from "react"
import {View, Text, SafeAreaView, StatusBar, Dimensions, TextInput} from 'react-native'
const {width, height} = Dimensions.get('window');
import FooterTabs from "../components/nav/FooterTabs"
import Hero from "../components/ctrlModule/longs/Hero"
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
const calc = (h) => {
    let ratio = height/width
    return (h/ratio * 1.9740740740)/width
}

const Longs = () => {
    const [allData, setAllData] = useState(null)
    const [finalLoading, setFinalLoading] = useState(true)
    const [lang, setLang] = useState(null)

    const getVideos = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('allVideos')
          let value = JSON.parse(jsonValue)

          const currentLang = await AsyncStorage.getItem('preffredLang')
          if(value!=null){
              let arr = []
              value.map((i)=>{
                  if(currentLang == i.author && i.language == 'long'){
                      arr.push(i)
                console.log(i.title)
              }
            })
            setAllData(arr)
            setFinalLoading(false)
          }
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(()=>{
            getVideos()
    },[])

    return (
        <LinearGradient colors={['#040302', '#081537', '#040302']} style={{flex:1}}>
            {finalLoading ? <></> :
            <><LinearGradient colors={['#040302', '#081537']} style={{width:'100%', height:StatusBar.currentHeight+(width*0.157), zIndex:1000, elevation:1000}}>
                <View style={{width:'90%', top:StatusBar.currentHeight, height:(width*0.157), alignItems:"center", flexDirection:"row", marginHorizontal:'5%', justifyContent:"space-between"}}>
                    <TextInput style={{width:'80%', borderBottomWidth:2, color:"#fff", borderBottomColor:"#585E82"}} placeholderTextColor={'#585E82'} placeholder={'Search your favourite topic here..'} />
                    <Text style={{padding:7, paddingHorizontal:10, color:'#081537', borderRadius:10, backgroundColor:"#585E82", fontWeight:"bold"}} onPress={()=>alert('hello')}>Search</Text>
                </View>
            </LinearGradient>
            <Hero allData={allData} />
            <LinearGradient colors={['#585E82', '#585E82']} style={{flex:1, position:"absolute", borderRadius:100, justifyContent:"flex-end", alignItems:"center", width:"20%", zIndex:1000, elevation:100, bottom:60}}>
                <FooterTabs type={'Home'} />
            </LinearGradient></>
            }
        </LinearGradient>
    )
}

export default Longs