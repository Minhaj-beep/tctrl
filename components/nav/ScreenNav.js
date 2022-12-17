import React, { useContext, useEffect, useState} from 'react'
import { View, Image, Text } from 'react-native';
import Home from '../../screens/Home';
import Language from '../../screens/Language';
import Longs from '../../screens/Longs';
import {createNativeStackNavigator, } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaFrame } from 'react-native-safe-area-context';


export default function ScreensNav() {
  const [check, setCheck] = useState(false)
  const [page, setPage] = useState(null)

  const getCheck = async() => {
    const lang = await AsyncStorage.getItem('preffredLang')
    if(lang != null){
      setPage('Home')
    } else {
      setPage('Language')
    }
    setCheck(true)
  }

  useEffect(()=>{
    getCheck()
  },[])

	return (
    <>
    {check ? 
    <Stack.Navigator initialRouteName={page}>
    <>

      <Stack.Screen name="Home" component={Home}  options={{headerShown: false}}/>
      <Stack.Screen name="Language" component={Language}  options={{headerShown: false}}/>
      <Stack.Screen name="Longs" component={Longs}  options={{headerShown: false}}/>
  
    </>

  </Stack.Navigator>
  : <></>}
    </>
);
}