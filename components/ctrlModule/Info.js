import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions, View, Text } from 'react-native'
const {width, height} = Dimensions.get("window")
import styled from 'styled-components/native'
const calc = (h) => {
  let ratio = height/width
  return ((h/ratio * 1.9740740740)/width)*width
}

const Container = styled.View`
  flex:1;
  justify-content: flex-end;
  margin: 0 0 ${calc(70)}px ${calc(13)}px;
`
const User= styled.View`
  flex-direction: row;
  align-items: center;
`
const UserName= styled.Text`
  font-size: ${calc(17)}px;
  color: rgba(255, 255, 255, 1);
  text-shadow: 3px 3px 3px rgba(0,0,0,0.1);
  font-weight: bold;
  letter-spacing: -0.3px;
`
const Description = styled.Text`
  font-size: ${calc(17)}px;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: ${calc(-0.2)}px;
  margin-top:${calc(6)}px;
  width: 80%;
`

const Info = ({user, description}) => {
	return (
		<Container>
      <User>
        <UserName>{user}</UserName>
      </User>
      <Description>
      {description}
      </Description>
    </Container>
	)
}

export default Info