import React ,{useContext} from 'react'
import { View, StyleSheet , StatusBar, Image, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navigator from '../components/Navigator';
import { AuthContext } from '../context/Authcontext';
import { useNavigation } from "@react-navigation/native";
const Profile = () => {
  const {logout} = useContext(AuthContext)
  const navigation = useNavigation();
  const handle_course=()=>{
    navigation.navigate('Your Course')
  }
  const handle_payment=()=>{
    navigation.navigate('Payment')
  }
  const handle_cart=()=>{
    navigation.navigate('Cart course')
  }
  return (
    <SafeAreaView style={styles.Maincontainer}>
          {/* <View style={styles.containerlogo}>
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View> */}
      <View>
      <View style={styles.container_profile_pic}>
        <Image
          source={require("../assets/images/Cool_Kids_Bust.png")}
          style={styles.ProfilePic}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity style={styles.container_Your_Course} onPress={handle_course}>
        <Text style={styles.Course}>Your Course</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.container_Your_Course} onPress={handle_payment}>
        <Text style={styles.Course} >Payment</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.container_Your_Course} onPress={handle_cart}>
        <Text style={styles.Course} >Your Cart</Text>
      </TouchableOpacity>
      <View style={styles.containerButton}>
      <TouchableOpacity style={styles.backgroundButton} onPress={()=> {logout()}}>
  <Text style={styles.Logout}>Logout</Text>
</TouchableOpacity>
      </View>
      </View>
      <Navigator/>
    </SafeAreaView>
  )
}

export default Profile;

const styles = StyleSheet.create({
    Maincontainer: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#fff",
        flexDirection:'column',
        justifyContent:'space-between',
      },
      ProfilePic:{
        alignSelf:'center',
        justifyContent:'center',
      },
      container_profile_pic:{
        borderRadius: 180,
        borderColor:'gray',
        borderWidth:1,
        backgroundColor:'#F8F2EE',
        alignSelf:'center',
        overflow: 'hidden',
        alignSelf: 'center',
        width: 180,
        height: 180,
        alignItems:'center',
        justifyContent:'center'

      },
      container_Your_Course:{
        backgroundColor:'#D2E6E4',
        marginLeft:12,
        marginRight:12,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        marginTop:30,
        borderRadius:20,
        borderColor:'gray',
        borderWidth: 0.5,
      },
      Course:{
        fontWeight:'bold',
        fontSize:15,
      },
      backgroundButton:{
        backgroundColor:'#FFB606',
        padding:15,
        borderRadius:10,
        marginTop:20
      },
      containerButton:{
        justifyContent:'center',
        alignItems:'center',
      },
      Logout:{
        color:'#fff',
      },
})