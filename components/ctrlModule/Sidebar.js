import React, {useEffect, useState} from 'react'
import { Dimensions, View, Text, TouchableOpacity, Share, Modal, Pressable, TextInput, ScrollView } from 'react-native'
const {width, height} = Dimensions.get('window');
import styled from 'styled-components/native'
import IconA from 'react-native-vector-icons/AntDesign'
import IconB from 'react-native-vector-icons/FontAwesome'
import LanguageModel from './models/LanguageModel';
const calc = (h) => {
  let ratio = height/width
  return ((h/ratio * 1.9740740740)/width)*width
}

const Container = styled.View`
  width: ${calc(60)}px;
  height: 100%;
  padding-bottom: ${calc(5)}px;
  justify-content: flex-end;
`
const Menu = styled.TouchableOpacity`
  margin: ${calc(9)}px 0;
  align-items: center;
`
const User = styled.View`
  width: 48px;
  height: 48px;
  margin-bottom: 13px;
`
const Avatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 48px;
  border-width: 2px;
  border-color: #ffffff;
`
const Icon = styled.Image`
  height: ${calc(40)}px;
`
const Count = styled.Text`
  color: #fff;
  font-size: ${calc(12)}px;
  letter-spacing: -0.1px;
`

const Sidebar = ({viewCount, shareCount, video, id, getLanguage}) => {
  const [model, setModel] = useState(false)
  const [modalvisible, setModalVisible] = useState(false)
  const [lang, setLang] = useState(null)

    const onShare = async () => {
      try {
        const result = await Share.share({
          message: `Enjoy the video: https://youtu.be/${video} Download Bloomtelly app to watch more videos. `,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
            console.log(result.activityType)
          } else {
            // shared
            console.log('shared succesfully')
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
          console.log('canceled share')
        }
      } catch (error) {
        alert(error.message);
      }
    }

    const getModelRequest = (res) => { setModel(res) }
    const getLang = (res) => { setModel(res); getLanguage.getLang(res) }

    return (
      <>
      {model ? <LanguageModel model={model} modelClose={{getModelRequest: getModelRequest.bind(this), getLang: getLang.bind(this) }} /> : <></>}
      <Container>
          <Menu>
            <TouchableOpacity onPress={()=>setModel(true)}>
              <IconB name={"language"} size={calc(40)} color="white" />
            </TouchableOpacity>
            <Count>12</Count>
          </Menu>
          <Menu>
            <IconA name={"hearto"} size={calc(40)} color="white" onPress={()=>alert('like')}/>
            <Count>12</Count>
          </Menu>
          <Menu>
            <TouchableOpacity onPress={()=>setModalVisible(true)}>
              <Icon resizeMode="contain" source={require('../../assets/comment.png')} />
            </TouchableOpacity>
            <Count>3</Count>
          </Menu>
          <Menu>
            <TouchableOpacity onPress={onShare}>
              <Icon resizeMode="contain" source={require('../../assets/share.png')} />
            </TouchableOpacity>
            <Count>12</Count>
          </Menu>
        </Container></>
    )
}

export default Sidebar
