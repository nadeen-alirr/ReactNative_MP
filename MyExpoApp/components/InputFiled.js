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
  } from "react-native";
  const InputFiled = ({ placeholder, secureTextEntry, value, onChangeText }) => {
    return (
      <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value} 
        onChangeText={onChangeText} 
      />
    </View>
    )
  }
  export default InputFiled;
const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
        borderWidth: 0.3,
        borderColor: "#000",
        marginVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        padding: 4,
    },
    input: {
      height: 40,
    },
  });

