import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import { AuthContext } from "../context/Authcontext";
import InputFiled from "../components/InputFiled";
import Navigator from "../components/Navigator";
import { useNavigation } from "@react-navigation/native";
import jwt_decode from "jwt-decode";
import Svg, { Path } from "react-native-svg";

import axios from "axios";
const Home = () => {
  const { userInfo, userToken } = useContext(AuthContext);
  // console.log("the user info in home screen : " + userInfo);
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);
  const [countCart, setcontCart] = useState([]);
  const [username, setusername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // console.log(
  //   "the user info and user token in card screen : " + userInfo + userToken
  // );
  const token = userToken.replace("Bearer ", "");
  const decodedToken = jwt_decode(token);
  // console.log("Decoded Token user name:", decodedToken.username);
  // console.log("Decoded Token id:", decodedToken.id);
  // console.log("Decoded Token email:", decodedToken.email);
  const user_id = decodedToken.id;

  useEffect(() => {
    axios
      .get(`http://192.168.1.116/api/getCourse/${user_id}`)
      .then((response) => {
        setCourses(response.data.courses);
        setcontCart(response.data.cartCount);
        setusername(response.data.username);
            })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  console.log(courses);
  console.log(countCart);
  console.log(username)

  const handle_search = () => {
    // console.log("Search Query:", searchQuery);
    const trimmedSearchQuery = searchQuery.trim();
    if (trimmedSearchQuery !== "") {
      navigation.navigate("Result", {
        searchQuery: trimmedSearchQuery,
        courses,
      });
    } else {
      console.log("input filed is empty");
    }
  };

  const handleInputChange = (text) => {
    setSearchQuery(text);
  };

  const handle_Items = (itemData) => {
    navigation.navigate("Details", { itemData });
  };
  const handle_pro = () => {
    navigation.navigate("programming courses");
  };
  const handle_desi = () => {
    navigation.navigate("Design courses");
  };
  const handle_phot = () => {
    navigation.navigate("PhotoShop courses");
  };
  // console.log(searchQuery);
  return (
    <SafeAreaView style={styles.Maincontainer}>
      <View>
        <Image source={require("../assets/images/Logo.png")}></Image>
      </View>

      <View style={styles.container_header}>
        <View>
          <Text>Hello</Text>
          <Text style={styles.name}>{username}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Cart course")}>
          {/* <Image source={require("../assets/icon/notification.png")}></Image> */}

          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 48 48"
            fill="none"
            style={styles.iconcart}
          >
            <Path
              d="M5.99986 4.59375C5.22321 4.59375 4.59361 5.22335 4.59361 6C4.59361 6.77665 5.22321 7.40625 5.99986 7.40625L5.99986 4.59375ZM10.9999 6L12.3641 5.65893C12.2076 5.03292 11.6451 4.59375 10.9999 4.59375L10.9999 6ZM37.9999 33.4062C38.7765 33.4062 39.4061 32.7766 39.4061 32C39.4061 31.2233 38.7765 30.5937 37.9999 30.5937V33.4062ZM41.9999 10L43.3641 10.3411C43.4691 9.92096 43.3748 9.4759 43.1083 9.13458C42.8418 8.79326 42.4329 8.59375 41.9999 8.59375V10ZM37.9999 26V27.4062C38.6451 27.4062 39.2076 26.9671 39.3641 26.3411L37.9999 26ZM5.99986 7.40625L10.9999 7.40625L10.9999 4.59375L5.99986 4.59375L5.99986 7.40625ZM9.6356 6.34107L10.6356 10.3411L13.3641 9.65893L12.3641 5.65893L9.6356 6.34107ZM10.6356 10.3411L14.6356 26.3411L17.3641 25.6589L13.3641 9.65893L10.6356 10.3411ZM15.9999 24.5937H14.9999V27.4062H15.9999V24.5937ZM14.9999 33.4062H37.9999V30.5937H14.9999V33.4062ZM10.5936 29C10.5936 31.4335 12.5664 33.4062 14.9999 33.4062V30.5937C14.1197 30.5937 13.4061 29.8802 13.4061 29H10.5936ZM14.9999 24.5937C12.5664 24.5937 10.5936 26.5665 10.5936 29H13.4061C13.4061 28.1198 14.1197 27.4062 14.9999 27.4062V24.5937ZM11.9999 11.4062H41.9999V8.59375H11.9999V11.4062ZM40.6356 9.65893L36.6356 25.6589L39.3641 26.3411L43.3641 10.3411L40.6356 9.65893ZM37.9999 24.5937H15.9999V27.4062H37.9999V24.5937ZM36.5936 40C36.5936 40.3279 36.3278 40.5937 35.9999 40.5937V43.4062C37.8811 43.4062 39.4061 41.8812 39.4061 40H36.5936ZM35.9999 40.5937C35.6719 40.5937 35.4061 40.3279 35.4061 40H32.5936C32.5936 41.8812 34.1186 43.4062 35.9999 43.4062V40.5937ZM35.4061 40C35.4061 39.6721 35.6719 39.4062 35.9999 39.4062V36.5937C34.1186 36.5937 32.5936 38.1188 32.5936 40H35.4061ZM35.9999 39.4062C36.3278 39.4062 36.5936 39.6721 36.5936 40H39.4061C39.4061 38.1188 37.8811 36.5937 35.9999 36.5937V39.4062ZM16.5936 40C16.5936 40.3279 16.3278 40.5937 15.9999 40.5937V43.4062C17.8811 43.4062 19.4061 41.8812 19.4061 40H16.5936ZM15.9999 40.5937C15.6719 40.5937 15.4061 40.3279 15.4061 40H12.5936C12.5936 41.8812 14.1186 43.4062 15.9999 43.4062V40.5937ZM15.4061 40C15.4061 39.6721 15.6719 39.4062 15.9999 39.4062V36.5937C14.1186 36.5937 12.5936 38.1188 12.5936 40H15.4061ZM15.9999 39.4062C16.3278 39.4062 16.5936 39.6721 16.5936 40H19.4061C19.4061 38.1188 17.8811 36.5937 15.9999 36.5937V39.4062Z"
              fill="black"
            />
          </Svg>
          <View style={styles.containerNumber}>
            <Text style={styles.number}>{countCart}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.filed_input}>
        {/* <InputFiled placeholder={"Search"}></InputFiled> */}
        <InputFiled
          placeholder={"Search"}
          value={searchQuery}
          onChangeText={(text) => handleInputChange(text)}
        ></InputFiled>
        <TouchableOpacity style={styles.searchButton} onPress={handle_search}>
          <Image
            source={require("../assets/icon/Search_Icon.png")}
            style={styles.icon_search}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.containerCategory}>
        <Text style={styles.category}>Category:</Text>
        <ScrollView
          horizontal
          style={styles.containerhorizintal}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.category_Items} onPress={handle_pro}>
            <Text>Programming</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category_Items} onPress={handle_desi}>
            <Text>Design</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category_Items} onPress={handle_phot}>
            <Text>PhotoShop</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {courses.map((course) => (
          <View key={course._id} style={styles.ContainerImage}>
            <View style={styles.background_image}>
              <Image
                source={{ uri: course.image }} // Use the image URL from the course data
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
      <View style={styles.navigator}>
        <Navigator />
      </View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  container_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  searchButton: {
    position: "absolute",
    top: 0,
    right: 30,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  icon_search: {
    width: 20,
    height: 20,
  },
  containerCategory: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  category: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  containerhorizintal: {
    flexDirection: "row",
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
    fontSize: 20,
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
    flex: 1,
    backgroundColor: "#fff",
  },
  iconcart: {
    marginRight: 15,
    position: "relative",
  },
  containerNumber: {
    borderRadius: 180,
    backgroundColor: "#D2E6E4",
    color: "#000",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    marginLeft: 15,
  },
  number: {
    color: '#000',        
    fontSize: 12,        
    fontWeight: 'bold',
    paddingTop:4,
    paddingLeft:4,
    paddingRight:4
  },
});
