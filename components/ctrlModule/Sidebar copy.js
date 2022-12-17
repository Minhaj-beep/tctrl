import React, {useState} from 'react'
import { Dimensions, View, Text, TouchableOpacity, Share, Modal, Pressable, TextInput, ScrollView } from 'react-native'
const {width:screenWidth, height:screenHeight} = Dimensions.get('window');
import styled from 'styled-components/native'
import IconA from 'react-native-vector-icons/AntDesign'
import IconB from 'react-native-vector-icons/FontAwesome'

// import { NetworkInfo } from "react-native-network-info";

const Container = styled.View`
  width: 60px;
  height: 100%;
  padding-bottom: 5px;
  justify-content: flex-end;
`
const Menu = styled.TouchableOpacity`
  margin: 9px 0;
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
  height: 40px;
`
const Count = styled.Text`
  color: #fff;
  font-size: 12px;
  letter-spacing: -0.1px;
`

const Sidebar = ({viewCount, shareCount, video, id}) => {
  const [noOfLikes, setNoOfLikes] = useState(0)
  const [noOfShare, setNoOfShare] = useState(0)
  const [newLike, setnewLike] = useState(false)
  const [shared, setShared] = useState(false)
  const [like, setLike] = useState(false)
  const [likeLoad, setLikeLoad] = useState(true)
  const [modalvisible, setModalVisible] = useState(false);
  const [modalVisibleTwo, setModalVisibleTwo] = useState(false);
  const [loading, setLoading] = useState(true);
  const {width, height} = Dimensions.get('window');
  const [name, setName] = useState(null)
  const [comment, setComment] = useState(null)
  const [loadComment, setLoadComment] = useState(null)
  const [success, setSuccess] = useState(null)
  const [ip, setIp] = useState(null)

  // NetworkInfo.getIPAddress().then(ipAddress => {
  //   setIp(ipAddress);
  // });


  // const increaseShareCount = async() => {
  //     const shareCount = await firestore().collection('shortShareCount').doc(id).get().then((documentSnapshot)=>{
  //       if(documentSnapshot.exists){
  //         const create = firestore().collection('shortShareCount').doc(id).update({
  //           'total': 1
  //         }).then(()=>console.log("updated successfully"))
  //       } else {
  //         const update = firestore().collection('shortShareCount').doc(id).set({
  //           'total': noOfShare + 1
  //         }).then(()=>console.log("created successfully"))
  //       }
  //     })
  // }



    const onShare = async () => {
      // increaseShareCount()
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
    
  // const handlePress = () => {
  //   if (comment !== null){
  //     const registerComment = firestore().collection('shortsComments').doc(id).get().then((documentSnapshot)=>{
  //       if(documentSnapshot.exists){
  //         firestore().collection('shortsComments').doc(id).update({
  //           userId:  firestore.FieldValue.arrayUnion(ip),
  //           comment: firestore.FieldValue.arrayUnion(comment),
  //         }).then(()=>console.log('Done'))
          
  //       } else{
  //         firestore().collection('shortsComments').doc(id).set({
  //           userId:  firestore.FieldValue.arrayUnion(ip),
  //           comment: firestore.FieldValue.arrayUnion(comment),
  //         }).then(()=>console.log('done'))
  //         // setSuccess("You comment has been submitted. Please Wait")
  //         // setModalVisibleTwo(false)
  //       }
  //     })
  //   }
  //         setSuccess("You comment has been submitted. Please Wait")
  //         setModalVisibleTwo(false)
  // }

  // const handleLikePress = async() => {
  //   setnewLike(true)
  //   if(like){ 
  //     setLike(false)
  //     const decreaseLike = firestore().collection('shortVideoLikes').doc(id).update({
  //       'totalLikes': noOfLikes.totalLikes-1
  //     })
  //     const dislike = firestore().collection('users').doc(ip).collection('shorts').doc(id).set({
  //       'like': false
  //     }).then(()=>console.log('like removed from users document'))
  //   }
  //   else { 
  //     setLike(true)
  //     const user = firestore().collection('shortVideoLikes').doc(id).get().then((documentSnapshot)=>{
  //       if(documentSnapshot.exists){
  //         firestore().collection('shortVideoLikes').doc(id).update({
  //           'totalLikes': noOfLikes.totalLikes+1
  //         }).then(()=>console.log('Total like has been updated'))
  //       } else {
  //         firestore().collection('shortVideoLikes').doc(id).set({
  //           'totalLikes': 1
  //         }).then(()=> console.log('Total like has been created'))
  //       }
  //     })
  //       const userData = firestore().collection("users").doc(ip).collection('shorts').doc(id).get()
  //       .then((documentSnapshot)=>{
  //         if(documentSnapshot.exists){
  //           firestore().collection('users').doc(ip).collection('shorts').doc(id).update({
  //             'like': true
  //           }).then(()=>console.log('like upadted on users document'))
  //         } else {
  //           firestore().collection('users').doc(ip).collection('shorts').doc(id).set({
  //             'like': true
  //           }).then(()=>console.log('like created on users document'))
  //         }
  //       })
  //     }
  //   }
    // console.log(ip)

  // const getLike = async() => {
  //   const currentNoOfLikes = await firestore()
  //   .collection('shortVideoLikes')
  //   .doc(id)
  //   .get()
  //   .then((documentSnapshot)=>{
  //     if(documentSnapshot.exists){
  //       setNoOfLikes(documentSnapshot.data())
  //       setLikeLoad(false)
  //     }
  //     else{
  //       setNoOfLikes(0)
  //     }
  //   })
  // }
  // const getCurrentLiked = async () => {
  //   const likeOrNot = await firestore()
  //   .collection('users').doc(ip).collection('shorts').doc(id).get()
  //   .then((documentSnapshot)=>{
  //     if(documentSnapshot.exists){
  //       setLike(documentSnapshot.data().like)
  //       setLikeLoad(false)
  //     } else{
  //       setLike(false)
  //       setLikeLoad(false)
  //     }
  //   })
  // }
  // useEffect(()=>{
  //   getLike()
  //   getCurrentLiked()
  //   getTotalShare()
  // },[])

  // const getTotalShare = async() => {
  //   const shareCount = await firestore().collection('shortShareCount').doc(id).get().then((documentSnapshot)=>{
  //     if(documentSnapshot.exists){ setNoOfShare(documentSnapshot.data().total)}
  //   })
  // }


  // const getLikeIcon = () => {
  //     if(like == true){
  //       return 'heartbeat'
  //     } else {
  //       return 'heart-o'
  //     }
  //   }
  //   const updateLikeUI = () => {
  //     if(like){
  //       return noOfLikes.totalLikes
  //     } else {
  //       return noOfLikes.totalLikes-1
  //     }
  //   }
  //   // console.log(id)
  //   const getLikeforUi = () => {
  //     if(noOfLikes >= 0){
  //       return abbreviateNumber(noOfLikes.totalLikes, 1)
  //     }
  //     else{
  //       return 0
  //     }
  //   }

  //   const checkComments = firestore().collection('shortsComments').doc(id).get().then((documentSnapshot)=>{
  //     if(documentSnapshot.exists){
  //       setLoadComment(documentSnapshot.data().comment)
  //     }})
    
  


    return (
      <>
      {/* <Modal animationType='slide' transparent={true} visible={modalVisibleTwo} onRequestClose={()=>{ setModalVisibleTwo(!modalVisibleTwo) }}>
        <View style={{ width: screenWidth*0.95, marginHorizontal:screenWidth*0.025, height: screenHeight*0.57, bottom:0, position:"absolute",  backgroundColor: 'rgba(17, 17, 17, 0.97)', borderRadius:10 }}>
          <View style={{ flexDirection: "row", left: screenWidth * 0.86, top: 7, }}>
            <IconA name="close" size={30} color="red" onPress={()=>{return setModalVisibleTwo(false)}}/>
          </View>
          <View style={{  height: screenHeight*0.25, marginHorizontal: screenWidth*0.05, top: 20, }}> */}
            {/* <TextInput placeholder='Name' onChangeText={(value)=>setName(value)} autoFocus={true} autoCorrect={false} style={{fontSize: 18, color: "white", borderColor:"red", borderBottomWidth: 0.5, height: 46, marginBottom:10}} /> */}
            {/* <TextInput placeholder='Type your comment here ...' onChangeText={(value)=>setComment(value)} multiline={true} autoCorrect={false} style={{fontSize: 18, color: "white", borderColor:"red", borderBottomWidth: 0.5, height: 100}} />
          </View>
          <View style={{ width:screenWidth*0.9, height:screenHeight*0.05, marginHorizontal:screenWidth*0.025, justifyContent:"center", alignItems:"center", borderRadius:20}}>
            <TouchableOpacity onPress={handlePress}><Text style={{fontSize:18, fontWeight:"bold", color:"#fff", backgroundColor:"red", padding:5, paddingHorizontal:50, borderRadius:20}}>Submit</Text></TouchableOpacity>
          </View>
        </View>
    </Modal> */}
    
    {/* <Modal
      animationType="slide"
      transparent={true}
      visible={modalvisible}
      onRequestClose={() => {
        setModalVisible(!modalvisible)
      } }
    >
      <View style={{ width: screenWidth*0.95, marginHorizontal:screenWidth*0.025, height: screenHeight*0.57, bottom:0, position: "absolute", backgroundColor: 'rgba(17, 17, 17, 0.9)', borderRadius:10 }}>
        <View style={{ flexDirection: "row", left: screenWidth * 0.86, top: 7, }}>
          <IconA name="close" size={30} color="red" onPress={()=>{return setModalVisible(false)}}/>
        </View>
        {success !== null ? <View style={{justifyContent:"center", alignItems:"center"}}><Text style={{color:"green"}}>{success}</Text></View> : <></>}
        
        <View style={{  height: screenHeight*0.42, marginHorizontal: screenWidth*0.05, top: 20,  marginBottom:10 }}><ScrollView>
        { loadComment !== null ?
          loadComment.map((i)=>{
            return (
              
                <View>
                  <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Text style={{fontWeight:"bold", fontSize:15}}>{auth().currentUser.displayName} :</Text>
                    <Text style={{fontSize:12, top:4}}>{}</Text>
                  </View>
                  <View style={{width:"100%", top:5, borderWidth:2, borderBottomLeftRadius:10, borderBottomRightRadius:10, borderTopRightRadius:10, borderColor:"green", backgroundColor: 'rgba(230, 230, 230, 0.9)', marginBottom:20}}>
                      <Text style={{fontSize:16, marginHorizontal:5, marginVertical:5}}>{i}</Text>
                  </View>
                </View>
              
            )
          })
          :
          <View style={{width:"100%", height: screenHeight*0.37, justifyContent:"center", alignItems:"center",}}>
            <Text>Oops! there's no comment to show.</Text>
          </View>
        }
        </ScrollView></View>
        <TouchableOpacity onPress={()=>setModalVisibleTwo(true)}>
        <View style={{backgroundColor:"red", width:screenWidth*0.9, height:screenHeight*0.05, marginHorizontal:screenWidth*0.025, justifyContent:"center", alignItems:"center", borderRadius:20}}>
          <Text style={{fontSize:16}}>Drop a comment</Text>
        </View>
        </TouchableOpacity>
      </View>
    </Modal> */}
      <Container>
          {/* <Menu>
            <IconA name={!like ? "heart-o" : getLikeIcon()} size={40} color="white" onPress={handleLikePress}/>
            <Count>{!newLike ? getLikeforUi() : updateLikeUI()}</Count>
          </Menu>
          <Menu>
            <TouchableOpacity onPress={()=>setModalVisible(true)}>
              <Icon resizeMode="contain" source={require('../../assets/icons/comment.png')} />
            </TouchableOpacity>
            <Count>{ loadComment !== null ? Object.keys(loadComment).length : 0}</Count>
          </Menu> */}
          <Menu>
            <IconB name={"language"} size={40} color="white" onPress={()=>alert('like')}/>
            <Count>12</Count>
          </Menu>
          <Menu>
            <IconA name={"hearto"} size={40} color="white" onPress={()=>alert('like')}/>
            <Count>12</Count>
          </Menu>
          <Menu>
            <TouchableOpacity onPress={()=>setModalVisible(true)}>
              <Icon resizeMode="contain" source={require('../../assets/comment.png')} />
            </TouchableOpacity>
            <Count>{ loadComment !== null ? Object.keys(loadComment).length : 0}</Count>
          </Menu>
          <Menu>
            <TouchableOpacity onPress={onShare}>
              <Icon resizeMode="contain" source={require('../../assets/share.png')} />
            </TouchableOpacity>
            <Count>12</Count>
            {/* <Count>{abbreviateNumber(noOfShare, 1)}</Count> */}
          </Menu>
        </Container></>
    )
}

export default Sidebar
