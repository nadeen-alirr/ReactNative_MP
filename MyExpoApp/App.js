import * as React from "react";
import { Text, View } from "react-native";

import AppNav from "./Navigation/AppNav";
import { NavigationContainer } from "@react-navigation/native";

import { Authprovider } from "./context/Authcontext";

export default function App() {
  return (
    <Authprovider>
      <AppNav />
    </Authprovider>
  );
}
