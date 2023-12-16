import React, { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import jwt_decode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../context/Authcontext";

const ProductDetail = () => {
  const { userInfo, userToken } = useContext(AuthContext);
  const route = useRoute();
  const { itemData } = route.params;
  console.log("Item Data:", itemData);
  const navigation = useNavigation();
  const handle_back = () => {
    navigation.navigate("Home");
  };

  console.log("the token in the details :" + userToken);
  const token = userToken.replace("Bearer ", "");
  const decodedToken = jwt_decode(token);
  console.log("Decoded Token user name:", decodedToken.username);
  console.log("Decoded Token id:", decodedToken.id);
  console.log("Decoded Token email:", decodedToken.email);

  const handle_add = async () => {
    try {
      const userId = decodedToken.id;
      const courseId = itemData._id;

      const response = await fetch("http://192.168.1.116:3010/api/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ userId, courseId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        throw new Error("Error adding course to cart");
      }
      navigation.navigate("Cart course", { userId, courseId });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.Maincontainer}>
      <View style={styles.container_header}>
        <TouchableOpacity style={styles.container_back} onPress={handle_back}>
          <Image source={require("../assets/images/backsign.png")}></Image>
        </TouchableOpacity>
        <Text style={styles.title}>{itemData.title}</Text>
      </View>
      <View style={styles.containerImage}>
        <Image
          source={{ uri: itemData.image }}
          resizeMode="contain"
          style={styles.ImageCourse}
        ></Image>
      </View>
      <View style={styles.containerDetails}>
        <View style={styles.container_price}>
          <Text style={styles.price}>{itemData.price}</Text>
        </View>
        <Text style={styles.Title}>About the course</Text>
        <Text style={styles.description}>{itemData.Summary}</Text>
      </View>
      <View style={styles.containerDuration}>
        <Text style={styles.duration}>Duration</Text>
        <Text style={styles.duration_time}>{itemData.duration}</Text>
      </View>
      <TouchableOpacity style={styles.containerbutn} onPress={handle_add}>
        <View style={styles.background_color_btn}>
          <Text style={styles.text_btn}>Add to cart</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProductDetail;
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
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
  container_back: {
    marginLeft: 14,
  },
  containerImage: {
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
  },
  ImageCourse: {
    height: 200,
    width: "100%",
  },
  containerDetails: {
    flexDirection: "column",
    gap: 7,
    padding: 12,
    marginTop: 10,
  },
  container_price: {
    backgroundColor: "#0B7077",
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 18,
    position: "absolute",
    right: 30,
  },
  price: {
    fontWeight: "bold",
    backgroundColor: "#0B7077",
    color: "#fff",
  },
  Title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  duration: {
    fontWeight: "bold",
    fontSize: 18,
  },
  containerDuration: {
    padding: 12,
    gap: 3,
  },
  containerbutn: {},
  background_color_btn: {
    backgroundColor: "#FFB606",
    margin: 15,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.3,
    borderRadius: 15,
  },
  text_btn: {
    color: "#fff",
    fontWeight: "bold",
  },
  duration_time: {
    color: "#0B7077",
  },
});
