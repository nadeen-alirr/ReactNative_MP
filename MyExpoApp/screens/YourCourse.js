import React ,{useContext, useEffect, useState}from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import jwt_decode from "jwt-decode";
import Navigator from "../components/Navigator";
import { AuthContext } from "../context/Authcontext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Svg, { Path } from 'react-native-svg';

const YourCourse = () => {
  const [paymentCourses, setPaymentCourses] = useState([]);
const { userInfo ,userToken } = useContext(AuthContext);
console.log("the user info and user token in card screen : " + userInfo + userToken);
const token = userToken.replace("Bearer ", "");
const decodedToken = jwt_decode(token);
console.log("Decoded Token user name:", decodedToken.username);
console.log("Decoded Token id:", decodedToken.id);
console.log("Decoded Token email:", decodedToken.email);

const id_user=decodedToken.id
const navigation = useNavigation();
useEffect(() => {
  const fetchPaymentCourses = async () => {
    try {
      const response = await fetch(`http://192.168.1.116:3010/api/yourCourse/${id_user}`);
      const data = await response.json();
      setPaymentCourses(data.coursesInPayments);
      console.log(paymentCourses)
    } catch (error) {
      console.error('Error fetching payment courses:', error);
    }
  };

  fetchPaymentCourses();
}, []);

  const handle_Items = (itemData) => {
    navigation.navigate("Choose Lessons Course" ,{ itemData });
  };
  
  return (
    <SafeAreaView style={styles.Maincontainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
         {paymentCourses.map((course) => (
        <View style={styles.ContainerImage} key={course._id}>
          <View style={styles.background_image}>
            <Image
             source={{ uri: course.image }} 
              style={styles.image_category}
              resizeMode="contain"
            >
              
            </Image>
          </View>
          <TouchableOpacity
            style={styles.container_info_card}
            onPress={() =>handle_Items(course)}
          >
            <Text style={styles.duration}>{course.duration}</Text>
            <Text style={styles.Title}>{course.title}</Text>
            <Text style={styles.description}>
            {course.description}
            </Text>
          </TouchableOpacity>
        </View>
         ))}
      </ScrollView>
      <View style={styles.navigator}>
        <Navigator />
      </View>
    </SafeAreaView>
  );
};

export default YourCourse;
const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
    marginTop: 0,
  },
  ContainerImage: {
    margin: 12,
    justifyContent: "center",
    borderRadius: 2,
    borderWidth: 0.3,
    borderBlockColor: "gray",
    borderRadius: 10,
    elevation: 2,
    marginBottom: 20,
    shadowColor: "#000",
  },
  background_image: {
    // backgroundColor: "#D2E6E4",
    // paddingBottom: 50,
    // justifyContent: "center",
    // alignItems: "center",
    // paddingTop: 15,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  image_category: {
    borderRadius: 10,
    height: 200,
    width: "100%",
  },
  duration: {
    color:'#0B7077',
  },
  Title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  description: {
    color:'gray',

  },
  container_info_card: {
    marginLeft: 15,
    padding: 12,
    
  },
  container_price: {
    backgroundColor: "#0B7077",
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 18,
    position: "absolute",
    top: 160,
    right: 20,
  },

  price: {
    color: "#fff",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
