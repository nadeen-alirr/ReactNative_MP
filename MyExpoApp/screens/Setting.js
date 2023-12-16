import React, { useContext, useState } from "react";
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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Navigator from "../components/Navigator";
import { AuthContext } from "../context/Authcontext";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Setting = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { userInfo, userToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [editModeUsername, setEditModeUsername] = useState(false);
  const [editModeEmail, setEditModeEmail] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // console.log("the token in the setting edit  :" + userToken);
  const token = userToken.replace("Bearer ", "");
  const decodedToken = jwt_decode(token);

  // console.log("Decoded Token user name:", decodedToken.username);
  // console.log("Decoded Token id:", decodedToken.id);
  // console.log("Decoded Token email:", decodedToken.email);
  const userId = decodedToken.id;
  const uploadImage = async () => {
    // console.log("Starting image upload");
//     console.log("Upload Image Button Pressed");

//     const permissionResult =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert("Permission to access camera roll is required!");
//       return;
//     }

//     const pickerResult = await ImagePicker.launchImageLibraryAsync();
//     console.log("Picker Result:", pickerResult);
//     if (!pickerResult.cancelled) {
//       setSelectedImage({ uri: pickerResult.uri ,type:pickerResult.type  });
//       console.log("selectedImage " + selectedImage.uri + " "+selectedImage.type);

//       const formData = new FormData();
//       formData.append("profileImage", {
//         uri: selectedImage.uri,
//         type: selectedImage.type,
       
//       });
// // console.log("the form data"+formData)
//       try {
//         const response = await axios.post(
//           // `http://10.7.1.227:3010/api/upload/${id_user}`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         console.log("Response:", response); 
//         if (response.status === 200) {
//           const data = response.data;
//           console.log("Response from backend:", data);
//         } else {
//           throw new Error("Network response was not ok");
//         }
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       }
//     }
  };

  const handle_save_change = async () => {
    if (editModeUsername && username.trim() === "") {
      Alert.alert("Error", "Username cannot be empty");
      return;
    }

    if (editModeEmail && !emailRegex.test(email)) {
      Alert.alert("Error", "Invalid email format");
      return;
    }

    try {
      const response = await axios.post(
        `http://192.168.1.116:3010/api/editinfo/${userId}`,
        {
          username: editModeUsername ? username : undefined,
          email: editModeEmail ? email : undefined,
          // image_profile: formData, // Assuming `formData` is correctly populated
        }
      );

      // Handle success
      const data = response.data;
      console.log(data)
      // ...
    } catch (error) {
      // Handle error
      console.error("Error updating user information:", error);
    }
  };
  return (
    <SafeAreaView style={styles.Maincontainer}>
      <View style={styles.containerinfo}>
        {/* <TouchableOpacity style={styles.containerImage} onPress={uploadImage}>
          {selectedImage ? (
            <Image source={selectedImage} style={styles.image_profile} />
          ) : (
            <Image
              source={require("../assets/images/Cool_Kids_Bust.png")}
              style={styles.image_profile}
            />
          )}
          <Image
            source={require("../assets/images/Vector.png")}
            style={styles.plus_icon}
          />
        </TouchableOpacity> */}
        <View>
          <Text style={styles.titleSetting}>Account information</Text>
        </View>
        <View style={styles.mainContiner2}>
          <View style={styles.container_card}>
            <View style={styles.back_ground_card}>
              <View style={styles.container_icon_pls_details}>
                <View>
                  <Image
                    source={require("../assets/icon/Settings_Information_Icons_name.png")}
                  ></Image>
                </View>
                <View style={styles.container_details}>
                  <Text style={styles.text}>Username</Text>
                  {editModeUsername ? (
                    <TextInput
                      style={styles.input}
                      value={username}
                      onChangeText={(text) => setUsername(text)}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => setEditModeUsername(true)}>
                      <Text>{decodedToken.username}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container_card}>
            <View style={styles.back_ground_card}>
              <View style={styles.container_icon_pls_details}>
                <View>
                  <Image
                    source={require("../assets/icon/Settings_Information_name_Icons.png")}
                  ></Image>
                </View>
                <View style={styles.container_details}>
                  <Text style={styles.text}>E-mail</Text>
                  {editModeEmail ? (
                    <TextInput
                      style={styles.input}
                      value={email}
                      onChangeText={(text) => setEmail(text)}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => setEditModeEmail(true)}>
                      <Text>{decodedToken.email}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container_card}>
            <View style={styles.back_ground_card}>
              <View style={styles.container_icon_pls_details}>
                <View>
                  <Image
                    source={require("../assets/icon/Settings_Information_pasword_Icons.png")}
                  ></Image>
                </View>
                <View style={styles.container_details}>
                  <Text style={styles.text}>Password</Text>
                  <TouchableOpacity>
                    <Text>changed 2 week a go</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.container_button}>
            <TouchableOpacity
              style={styles.back_ground_button}
              onPress={handle_save_change}
            >
              <Text>Save Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.navigation}>
        <Navigator />
      </View>
    </SafeAreaView>
  );
};

export default Setting;
const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },
  containerinfo:{
    justifyContent:'center',
    marginTop:50
  },
  containerImage: {
    alignSelf: "center",
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  plus_icon: {
    position: "absolute",
    top: 130,
    left: 155,
    resizeMode: "contain",
  },
  image_profile: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 90,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#F8F2EE",
    resizeMode: "cover",
  },
  titleSetting: {
    fontWeight: "bold",
    left: 12,
    top: 20,
    fontSize: 20,
  },
  navigation: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container_icon_pls_details: {
    flexDirection: "row",
    gap: 10,
  },
  container_card: {
    marginLeft: 12,
    marginRight: 12,
  },
  back_ground_card: {
    backgroundColor: "#D2E6E4",
    padding: 15,
    borderRadius: 12,
  },
  mainContiner2: {
    marginTop: 40,
    flexDirection: "column",
    gap: 12,
  },
  back_ground_button: {
    backgroundColor: "#FFB606",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
  },
  container_button: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
  },
});
