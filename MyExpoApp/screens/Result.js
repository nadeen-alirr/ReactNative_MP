import React from "react";
import { useState, useEffect } from "react";
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

import InputFiled from "../components/InputFiled";

import { useNavigation, useRoute } from "@react-navigation/native"; 
const Result = () => {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const route = useRoute(); 
  const searchQuery = route.params?.searchQuery || "";
  const courses = route.params?.courses || [];

  const navigation = useNavigation();
  useEffect(() => {
    console.log("Filtering courses...");
    console.log("Search Query:", searchQuery);
    console.log("All Courses:", courses);
    
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchQuery]); 

  const handle_search = () => {
    navigation.navigate("Result", { searchQuery, courses });
  };
  
  const handle_back = () => {
    navigation.navigate("Home");
  };

  const handle_Items =  (itemData) => {
    navigation.navigate("Details", { itemData });
  };

  console.log(courses)
  return (
    <SafeAreaView style={styles.Maincontainer}>
      <View>
        <Image source={require("../assets/images/Logo.png")}></Image>
      </View>
      <View style={styles.container_header}>
        <TouchableOpacity
          style={styles.container_back_icon}
          onPress={handle_back}
        >
          <Image source={require("../assets/images/backsign.png")}></Image>
        </TouchableOpacity>
        <View style={styles.container_inputfiled}>
          <InputFiled
            style={styles.input_filed}
            placeholder={"Search"}
            value={searchQuery}
          />
          <TouchableOpacity onPress={handle_search}>
            <Image
              source={require("../assets/icon/Search_Icon.png")}
              style={styles.icon_search}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerResult}>
        <Text style={styles.result}>{filteredCourses.length} item</Text>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        {filteredCourses.map((course) => (
          <View key={course._id} style={styles.ContainerImage}>
            <View style={styles.background_image}>
              <Image
                source={{ uri: course.image }} 
                style={styles.image_category}
                onError={(error) =>
                  console.error("Error loading image:", error)
                }
                resizeMode="contain"
              />
              <View style={styles.container_price}>
                <Text style={styles.price}>{course.price}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.container_info_card}
              onPress={() => handle_Items(course)}
            >
              <Text style={styles.duration}>{course.duration}</Text>
              <Text style={styles.Title}>{course.title}</Text>
              <Text style={styles.description}>{course.description}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.centeredContent}>
    {filteredCourses.length === 0 ? (
      <View style={styles.container_no_result}>
        <Image source={require("../assets/images/noresult.png")}></Image>
        <View>
          <Text style={styles.notfound}>Course not found</Text>
          <Text style={styles.desc}>Try searching the course with a different keyword</Text>
        </View>
      </View>
    ) : null}
  </View>
    </SafeAreaView>
  );
};

export default Result;
const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginTop: 0,
    backgroundColor: "#fff",
  },
  container_header: {
    alignItems: "center",
    flexDirection: "row",
  },
  input_filed: {},
  container_inputfiled: {
    flex: 1,
    justifyContent: "center",
  },
  container_back_icon: {
    alignItems: "center",
    marginTop: 10,
    marginLeft: 12,
  },
  containerResult: {
    marginLeft: 12,
  },
  result: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  icon_search: {
    position: "absolute",
    top: -40,
    right: 30,
  },
  category_Items: {
    backgroundColor: "#65AAEA",
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
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
    // width:100,
    // height:100,
    height: 200,
    width: "100%",
  },
  duration: {
    color: "#0B7077",
  },
  Title: {
    fontWeight: "bold",
    fontSize: 25,
  },
  // description: {

  // },
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
    // flex: 1,
    backgroundColor: "#fff",
  },
  notfound: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
  desc:{
    textAlign:'center',
    marginLeft:40,
    marginRight:40
  },
  centeredContent: {
   
    justifyContent: "center",
    alignItems: "center",
  },
});
