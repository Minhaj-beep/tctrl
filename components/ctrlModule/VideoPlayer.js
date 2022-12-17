import React, { useState, useEffect, useRef } from 'react'

import YoutubePlayer from "react-native-youtube-iframe"

import { Dimensions, View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'

import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'
const {width, height} = Dimensions.get('window');

const Play = styled(YoutubePlayer)`
  height: 100%;
`

const Poster = styled.ImageBackground`
  height: 100%;
`

const VideoPlayer = ({ video, poster, isPlay }) => {
	const [image, setImage] = useState(poster)
	const [pause, setPause] = useState(true)
	const [icon, setIcon] = useState(false)
	// console.log(isPlay)
	const [data, setData] = useState(null)
	const youtubePlayerRef = useRef(null)

	useEffect(() => {
		fetch("https://bloomtelly.com/index.php/wp-json/get_short_videos/v1/list")
		.then(res=>res.json())
		.then(data=>{
		  setData(data)
		});
	  },[]);
	  
	  const onReadyForDisplay = () =>{
		setImage('');
	  }
	  const onEnd = () => {
		setImage(poster)
		setPause(true)
	  }


	return isPlay ? (
		<><Play
				ref={youtubePlayerRef}
				height={'100%'}
				width={height*2}
				play={pause}
				videoId={video}
				thumbnail_url={poster}
				thumbnail_height={'100%'}
				controls={false}
				loop={true}
				color='white'
				onChangeState={event => {
					if (event === 'ended') {
					  youtubePlayerRef?.current?.seekTo(0, true);
					}
				  }}
			/>
			<View style={{position:"absolute", top:height*0.4, justifyContent:"center", alignItems:"center", height:200, width:width*0.5, marginHorizontal:width*0.25, elevation:1000, zIndex:1000  }}>
		 		{pause ? 
		 		<TouchableOpacity onPress={()=>setPause(false)}>
		 			<View style={{height:200, width:200, justifyContent:"center", alignItems:"center", }}>
		 				
		 			</View>
		 		</TouchableOpacity>
				
		 		:
		 		<TouchableOpacity onPress={()=>setPause(true)}>
		 			<View style={{height:200, width:200, justifyContent:"center", alignItems:"center",}}>
					 <Icon name='md-play-circle-outline' size={80} color={'white'} />
		 			</View>
		 		</TouchableOpacity>
		 		}
		 	</View></>
	) : (
		<ImageBackground style={{height:"100%"}} source={poster} />
	)
}

export default VideoPlayer
