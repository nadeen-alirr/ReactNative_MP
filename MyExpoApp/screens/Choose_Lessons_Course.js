import React, { useContext, useEffect, useState } from "react";
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
  ScrollView,
} from "react-native";
import { AuthContext } from "../context/Authcontext";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const Choose_Lessons_Course = () => {
  const navigation = useNavigation();
  const { userInfo ,userToken } = useContext(AuthContext);
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState([]);

  const route = useRoute();
  const { itemData } = route.params;
  console.log("Item Data:", itemData);
  console.log("the user info and user token in card screen : " + userInfo + userToken);
  const token = userToken.replace("Bearer ", "");
  const decodedToken = jwt_decode(token);
  console.log("Decoded Token user name:", decodedToken.username);
  console.log("Decoded Token id:", decodedToken.id);
  console.log("Decoded Token email:", decodedToken.email);
  const userId = decodedToken.id;
  const courseId = itemData._id;
  const handle_back = () => {
    navigation.navigate("Your Course");
  };
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`http://192.168.1.116:3010/api/getlessons/${courseId}/${userId}`);
        console.log('data', response.data);
        setLessons(response.data.lessons);
        setCourse(response.data.course);
        
        // console.log("the lessons data", JSON.stringify(response.data.lessons));
        // console.log("the course data", JSON.stringify(response.data.course));
       
        const lessonsarray= JSON.stringify(response.data.lessons)
        const coursearray= JSON.stringify(response.data.course)
        console.log("the lessons array :" + lessonsarray)
        console.log("the course array :" + coursearray)

      } catch (error) {
        console.error('Error fetching lessons:', error.message);
      }
    };
  
    fetchLessons();
  }, []);
  return (
    <SafeAreaView style={styles.Maincontainer}>
      <View style={styles.container_header}>
        <TouchableOpacity style={styles.container_back} onPress={handle_back}>
          <Image
            source={require("../assets/images/backsign.png")}
            resizeMode="cover"
          ></Image>
        </TouchableOpacity>
        <View style={styles.container_title}>
          <Text style={styles.title}>{course.title}</Text>
        </View>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.container_details_course}>
          <View style={styles.container_Image}>
            <View style={styles.backgroundImage}>
              <Image
                source={{ uri: course.image }} 
                style={styles.image_Course}
              ></Image>
              <View style={styles.container_play_btn}>
                <TouchableOpacity>
                  <Image
                    source={require("../assets/icon/Play_Icon.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.container_details}>
              <Text style={styles.title_course}>{course.title}</Text>
              <Text style={styles.mini_description}>
              {course.description}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.container_lessons}>
        {lessons.map((lesson, index) => (
    <TouchableOpacity style={styles.container_details_lessons} key={index}>
      <Image
        source={{ uri: lesson.image }} // Assuming `image` is the URL of the lesson image
        style={styles.image_lessons_course}
      />
      <View style={styles.container_lessons_name_progress_bar}>
        <Text style={styles.titlelessons}>{lesson.title}</Text>
        <View style={styles.container_progress_bar}>
          <View style={styles.progress_bar_indicetor}></View>
        </View>
      </View>
    </TouchableOpacity>
  ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


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
    paddingBottom: 10,
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
  backgroundImage: {
    // backgroundColor: "#D2E6E4",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  container_details_course: {
    padding: 20,
  },
  container_Image: {
    borderWidth: 0.5,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderRadius: 20,
    shadowColor: "#000",
    elevation: 2,
  },
  title_course: {
    fontWeight: "bold",
    fontSize: 20,
  },
  mini_description: {
    color: "gray",
    fontSize:13
  },
  container_details: {
    flexDirection: "column",
    gap: 5,
    padding: 20,
  },
  container_play_btn: {
    // backgroundColor: "#FFF5EE",
    alignItems: "flex-end",
    paddingRight: 15,
    paddingTop: 15,
    // paddingBottom: 8,
  },
  //   lessons styles
  container_lessons: {
    flex:1,
    paddingLeft:20,
    paddingRight:20,
  },
  image_lessons_course: {
    resizeMode:"contain",
    width:70,
    height:50,
    flexDirection:'column',
    borderRadius:12,
  },
  container_details_lessons:{
    flex:1,
    borderRadius:10,
    borderWidth:0.4,
    flexDirection:'row',
    padding:10,
    marginBottom:20,
    elevation: 0.8,
    shadowColor: "#000",
  },
  container_lessons_name_progress_bar:{
    flex:1,
    marginLeft:15
    
  },
  container_progress_bar:{
    width:'100%',
    height:10,
    backgroundColor:'#FFF5EE',
    overflow:'hidden',
    marginTop:10,
    borderRadius:10
  },
  progress_bar_indicetor:{
    backgroundColor:'#94C0E9',
    width:'50%',
    height:'100%',
  },
  titlelessons:{
    fontWeight:'500',
    fontSize:13
  },
  image_Course:{
    // width:"100%",
    // height:200,
    // resizeMode:"cover",
    borderRadius: 10,
    height: 200,
    width: "100%",
  }
});
export default Choose_Lessons_Course;
