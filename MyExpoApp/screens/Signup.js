import React, { useEffect, useState } from "react";
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
import InputFiled from "../components/InputFiled";
import axios from "axios";

const Signup = () => {
  const navigation = useNavigation();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!username) {
      newErrors.username = 'Username is required.';
    }

  
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Email is invalid.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 8 characters long, including lowercase, uppercase, and a digit.';
    }

    
    setErrors(newErrors);
  };

  const handleSignup = async () => {
    validateForm();
    console.log("passowrd signup"+password)
    console.log("email signup"+email)
  
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("http://192.168.1.116:3010/api/signup", {
          username: username,
          email: email,
          password: password,
        });
        console.log("User registered successfully:", response.data);
        setUsername("");
        setEmail("");
        setPassword("");
  
        navigation.navigate("Profile");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <SafeAreaView style={styles.Maincontainer}>
      <View style={styles.containerlogo}>
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.Containertitle}>
        <Text style={styles.title}>Signup</Text>
      </View>
      <View style={styles.containernote}>
        <Text style={styles.note}>Create your account</Text>
      </View>
      <View style={styles.containerINPUTEmail}>
        <InputFiled
          placeholder={"username"}
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setErrors({ ...errors, username: '' }); // Clear the error when the user types
          }}
        ></InputFiled>
         {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
      </View>
      <View style={styles.containerINPUTEmail}>
        <InputFiled
          placeholder={"Email"}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors({ ...errors, email: '' }); // Clear the error when the user types
          }}
        ></InputFiled>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>
      <View style={styles.containerINPUTEmail}>
        <InputFiled
          placeholder={"password"}
          secureTextEntry={true}
          value={password}
           onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: '' }); // Clear the error when the user types
          }}
        ></InputFiled>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={[styles.backgroundButton, Object.keys(errors).length !== 0 && styles.disabledButton]}
          onPress={handleSignup}
        >
          <Text style={styles.SignUp}>SignUp</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containernote}>
        <Text style={styles.note}>Already have an Account? </Text>
        <TouchableOpacity>
          <Text
            style={styles.Login}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

};
export default Signup;

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },

  backicon: {
    marginTop: 20,
    marginLeft: 10,
  },
  containerlogo: {
    alignSelf: "center",
    marginTop: 70,
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 100,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  Containertitle: {
    justifyContent: "center",
    alignItems: "center",
  },
  note: {
    color: "gray",
    fontSize: 10,
  },
  containernote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  containerINPUTEmail: {},
  Input: {
    height: 40,
  },
  backgroundButton: {
    backgroundColor: "#FFB606",
    alignItems: "center",
    padding: 10,
    borderWidth: 0.3,
    borderColor: "#FFB606",
    marginVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  containerButton: {
    marginTop: 7,
    marginLeft: 10,
    marginRight: 10,
  },
  SignUp: {
    color: "#fff",
    fontWeight: "bold",
  },
  Login: {
    textDecorationLine: "underline",
    color: "blue",
    fontSize: 10,
  },
  errorText: {
    color: "red",
    fontSize: 10,
    marginLeft:20
  },
});