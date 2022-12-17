import React, {useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions, View, Text, } from 'react-native'
import styled from 'styled-components'
import IconA from 'react-native-vector-icons/Ionicons';
// import { playSound } from '../sound';


const Container = styled.View`
  top: 46px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  z-index: 1
`

const Menu = styled.Text`
  color: ${props => (props.bold ? "yellow" : "white")};
  letter-spacing: 0.8px;
  margin: 11px 12px;
  font-weight: ${props => (props.bold ? "bold" : "normal")};
  font-size: ${props => (props.bold ? "36px" : "15px")};
  opacity: ${props => (props.bold ? 1 : 0.8)};
`

const Separetor = styled.View`
  width: 1px;
  height: 13px;
  background-color: #d8d8d8;
  opacity: 0.6;
`

const Header = ({navigation, getType}) => {
  const [selected, setSelected] = useState('shorts')

	return (
		<Container>
      <Text style={{color:`${selected=="shorts" ? 'yellow' : 'white'}`, fontWeight:"bold", fontSize:18, margin: 10  }} onPress={()=>{getType.getType('shorts'); setSelected('shorts');}}>Shorts</Text>
      {/* <Menu>Shorts</Menu> */}
      <Separetor/>
      {/* <Menu blod="true">Longs</Menu> */}
      <Text style={{color:`${selected=="longs" ? 'yellow' : 'white'}`, fontWeight:"bold", fontSize:18, margin: 10  }} onPress={()=>{getType.getType('longs'); setSelected('longs'); } }>Longs</Text>
    </Container>
	)
}

export default Header