import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Appstack from "./Appstack";
import Authstack from "./Authstack";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/Authcontext";

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken !== null ? <Appstack /> : <Authstack />}
    </NavigationContainer>
  );
};

export default AppNav;
