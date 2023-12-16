import React, { useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
const SplashScreen = () => {
    const navigation = useNavigation();
    useEffect(()=>{
        const Timeout =setTimeout(()=>{
            navigation.navigate('introduction');
        },5000);
        return ()=>clearTimeout(Timeout);
    },[]);
    
  return (
    <SafeAreaView style={styles.Maincontainer}>
      <View style={styles.container_image}>
        <Image
          source={require("../assets/images/image-splashScreen.png")}
        ></Image>
        <Image source={require("../assets/images/Logo.png")}></Image>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
    marginTop: 0,
  },
  container_image: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 50,
  },
});
