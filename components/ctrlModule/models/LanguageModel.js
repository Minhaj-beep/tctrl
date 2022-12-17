import React, {useState, useEffect} from 'react'
import { Dimensions, View, Text, Modal, Pressable, TextInput, ScrollView } from 'react-native'
const {width, height} = Dimensions.get('window');
import IconA from 'react-native-vector-icons/AntDesign'
import {storeData} from '../../Storage'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageModel = (props) => {
    const [lang , setLang] = useState(null)
    const [loading , setLoading] = useState(true)

    const calc = (h) => {
        let ratio = height/width
        return ((h/ratio * 1.9740740740)/width)*width
    }

    const handleClick = (req) => {
        storeData(req)
        props.modelClose.getModelRequest(false)
        props.modelClose.getLang(req)
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
    useEffect(()=>{
        getData()
    },[])

    return (
        <>
            {loading ? <></> : 
                <Modal
                animationType="slide"
                transparent={true}
                visible={props.model}
                onRequestClose={()=>props.modelClose.getModelRequest(false)}
                >
                
                <View style={{ width: width*0.95, marginHorizontal:width*0.025, height: height*0.57, bottom:0, position: "absolute", backgroundColor: 'rgba(17, 17, 17, 0.9)', borderRadius:10 }}>
                <View style={{ flexDirection: "row", left: width * 0.86, top: calc(7), }}>
                    <IconA name="close" size={calc(30)} color="red" onPress={()=>props.modelClose.getModelRequest(false)}/>
                </View>
                <View style={{justifyContent:"center", alignItems:"center"}}><Text style={{color:"white", fontWeight:"bold", fontSize:calc(16)}}>Select language</Text></View>
                
                <View style={{  height: height*0.42, marginHorizontal: width*0.05, top: calc(20),  marginBottom:calc(10) }}>
                    <ScrollView>
                    <View style={{alignItems:"center"}}>
                        {
                            lang.map((i)=>{
                                return(
                                    <Text style={{fontWeight:"bold", marginBottom:calc(5), paddingHorizontal:width*0.2, borderWidth:calc(2), borderColor:"green", color:"#fff", padding:calc(10), borderRadius:20, fontSize:calc(20)}} onPress={()=>{handleClick(i._id)}}>{i.name}</Text>
                                )
                            })
                        }
                    </View>
                </ScrollView>
                </View>
                </View>
                </Modal>
            }
        </>
    )
}

export default LanguageModel