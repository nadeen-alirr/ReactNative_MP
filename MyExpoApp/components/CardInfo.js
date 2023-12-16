import React, { useContext } from 'react'
import {
    StyleSheet,
    View,
    StatusBar,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Text,
    Alert,
    TextInput,
    Button,
  } from "react-native";
  import { AuthContext } from '../context/Authcontext';
  import jwt_decode from "jwt-decode";

const CardInfo = () => {
    const { userInfo, userToken } = useContext(AuthContext);
    console.log("the token in the setting edit  :"+userToken)
    const token = userToken.replace("Bearer ", ""); 
    const decodedToken = jwt_decode(token);

    console.log("Decoded Token user name:", decodedToken.username);
    console.log("Decoded Token id:", decodedToken.id);
    console.log("Decoded Token email:", decodedToken.email);
    const handle_save_change =()=>{

    }
  return (
<Text>

</Text>
  )
}

export default CardInfo;
const styles = StyleSheet.create({
    mainContiner2:{
      marginTop:40,
      flexDirection:'column',
      gap:12
    },
    container_icon_pls_details:{
        flexDirection:'row',
        gap:10
    },
    container_card:{
        marginLeft:12,
        marginRight:12,
    },
    back_ground_card:{
        backgroundColor:'#D2E6E4',
        padding:15,
        borderRadius:12
    },
    back_ground_button:{
        backgroundColor:'#FFB606',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderRadius:12,
    },
    container_button:{
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontWeight:'bold',
    }
})