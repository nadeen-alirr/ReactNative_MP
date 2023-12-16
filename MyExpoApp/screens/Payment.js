import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { Platform } from "react-native";
import axios from "axios";

const Payment = () => {

  const navigation = useNavigation();

  const handle_back = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.Maincontainer}>
      <View style={styles.container_header}>
        <TouchableOpacity style={styles.container_back} onPress={handle_back}>
          <Image source={require("../assets/images/backsign.png")}></Image>
        </TouchableOpacity>
        <View style={styles.container_title}>
          <Text style={styles.title}>Payment</Text>
        </View>
      </View>
      <View style={styles.container_image}>
        <Image
          source={require("../assets/images/illustration_payment.png")}
        ></Image>
      </View>
      <View style={styles.container_details}>
        <Text style={styles.status}> Payment method added</Text>
        <Text style={styles.details}>
          You can buy the course now. Continue to payment.
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.container_btn}>
          <View style={styles.background_color}>
            <Text style={styles.text_btn}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Payment;
const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
    marginTop: 0,
  },
  container_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container_title: {
    justifyContentL: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    alignSelf: "center",
  },
  container_back: {
    marginLeft: 14,
  },
  container_image: {
    marginTop: 35,
  },
  container_details: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 30,
    gap: 20,
  },
  status: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  details: {
    textAlign: "center",
    paddingRight: 30,
    paddingLeft: 30,
  },
  container_btn: {
    padding: 20,
  },
  background_color: {
    backgroundColor: "#FFB606",
    padding: 15,
    borderRadius: 15,
    borderColor: "#FF9A15",
  },
  text_btn: {
    textAlign: "center",
    color: "#fff",
  },
});
