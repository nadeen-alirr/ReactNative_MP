import React from 'react'
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
import { useNavigation } from "@react-navigation/native";
const StepsProgress = ({ currentStep }) => {
  const steps = [
    { isActive: currentStep === 1 },
    { isActive: currentStep === 2 },
    { isActive: currentStep === 3 },
  ];
  return (
    <View style={styles.container_progress_bar}>
      {steps.map((step, index) => (
        <View
          key={index}
          style={step.isActive ? styles.current_step : styles.last_previous_step}
        >
          <View
            style={
              step.isActive
                ? styles.backgroundColor_current_step
                : styles.backgroundColor_last_previous_step
            }
          ></View>
        </View>
      ))}
    </View>
  )
}

export default StepsProgress;

const styles = StyleSheet.create({
  current_step: {
    borderRadius: 180,
    backgroundColor: "#65AAEA",
    width: 20,
    height: 10,
  },
  last_previous_step: {
    borderRadius: 180,
    backgroundColor: "#D5D4D4",
    width: 10,
    height: 10,
  },
  backgroundColor_current_step: {
    backgroundColor: "#65AAEA",
    width: "100%",
    height: "100%",
    borderRadius: 180,
  },
  backgroundColor_last_previous_step: {
    backgroundColor: "#D5D4D4",
    width: "100%",
    height: "100%",
    borderRadius: 180,
  },
  container_progress_bar: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
})