import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
const {width, height} = Dimensions.get("window")
const calc = (h) => {
  let ratio = height/width
  return ((h/ratio * 1.9740740740)/width)*width
}

const FooterTabs = (props) => {
  const [type, setType] =useState(props.type)

  const navigation = useNavigation();
  const handlePress = () => {};

  return (
    <View style={{flex: 1, flexDirection: "row",  justifyContent: "space-between", margin: 10, marginHorizontal: 20,}}>
        <TouchableOpacity onPress={()=>{ navigation.navigate(props.type)}}>
          <Image name="Ap" source={require('../../assets/ctrl.png')} resizeMode='contain' style={{width:calc(50), height:calc(50) }} />
        </TouchableOpacity>
    </View>
  )
}

export default FooterTabs