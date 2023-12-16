import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();
import { Login_URL } from "../config";
import jwt_decode from "jwt-decode";
import axios from "axios"

export const Authprovider = ({ children }) => {
  // const [test, settest]=useState('test value')
  const [isLoading, setisLoading] = useState(false);
  const [userToken, setuserToken] = useState(null);
  const [userInfo, setuserInfo] =useState(null)

  const login = async (email, password) => {
    setisLoading(true);
    console.log("Login URL:", Login_URL);

    try {
      const response = await axios.post(`${Login_URL}`, {
        email,
        password,
      });
      
      console.log("Response from server:", response);
  
      const data = response.data;
      console.log("Response from server:", data);
      if (data && data.status === "success" && data.token) {
        let userInfo = {
          userID: data.userID,
          name: data.name,
        };
        setuserInfo(userInfo);
        setuserToken(data.token);
  
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        AsyncStorage.setItem("userToken", data.token);
        console.log(userInfo);
        console.log("the token from backend generated :" + data.token);
      } else {
        console.error("Invalid response from the server", data);
      }
    } catch (error) {
      console.error("login error ", error);
    } finally {
      setisLoading(false);
    }  
  };

  const logout = () => {
    setisLoading(true);
    setuserToken(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    setisLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setisLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);
  
      console.log("Retrieved userInfo:", userInfo); // Add this line
  
      if (userInfo) {
        setuserToken(userToken);
        setuserInfo(userInfo);
      }
  
      setisLoading(false);
    } catch (error) {
      console.log(`isLogged in error ${error}`);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
 
  
  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken ,userInfo}}>
      {children}
    </AuthContext.Provider>
  );
};
