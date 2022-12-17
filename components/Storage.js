import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('language', value)
        // console.log(await AsyncStorage.getItem('language'))
    } catch (e) {
        console.log(e)
    }
}


export const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('language')
      if(value !== null) {
        // console.log(value)
        return value
      }
    } catch(e) {
      // error reading value
    }
}