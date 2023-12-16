import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from 'react-native-svg';

const Navigator = () => {
  const navigation = useNavigation();
  const handle_setting = () => {
    navigation.navigate("Setting");
  };
  const handel_profile = () => {
    navigation.navigate("Profile");
  };
  const handel_course = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={styles.maincontainer}>
      <TouchableOpacity
        TouchableOpacitystyle={styles.containericon}
        onPress={handel_course}
      >
        <Image
          source={require("../assets/icon/Icon_corse.png")} 
          style={styles.courseImage}
          resizeMode="cover"
        />
   {/* <Svg width={21} height={20} viewBox="0 0 21 20" fill="none">
        <Path d="M3.35714 0C3.15714 0 2.98571 0.025 2.81429 0.075C1.7 0.275 0.814286 1.05 0.585714 2.025C0.5 2.175 0.5 2.325 0.5 2.5V16.25C0.5 18.325 2.41429 20 4.78571 20H20.5V17.5H4.78571C3.98571 17.5 3.35714 16.95 3.35714 16.25C3.35714 15.55 3.98571 15 4.78571 15H20.5V1.25C20.5 0.55 19.8714 0 19.0714 0H17.6429V7.5L14.7857 5L11.9286 7.5V0H3.35714Z" fill="#BEBAB3"/>
      </Svg> */}
        <Text style={styles.text}>Course</Text>
      </TouchableOpacity>
      <TouchableOpacity
        TouchableOpacitystyle={styles.containericon}
        onPress={handel_profile}
      >
        <Image
          source={require("../assets/icon/Profile_Icon.png")} 
          resizeMode="cover" 
        />
              {/* <Svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} viewBox="0 0 21 20">
      <Path d="M18.0044 14.2209C16.4247 13.4095 17.0334 14.0302 15.0941 13.2001C13.155 12.3713 12.6956 12.1003 12.6956 12.1003L12.6784 10.1991C12.6784 10.1991 13.4047 9.62995 13.6312 7.83198C14.0847 7.96748 14.2381 7.2832 14.2628 6.84604C14.2897 6.42373 14.5309 5.10743 13.9762 5.22487C14.0897 4.34604 14.1787 3.55143 14.1387 3.13073C14 1.65441 13.0112 0.112595 10.5153 0C8.39344 0.112595 7.01594 1.65537 6.87687 3.13169C6.83687 3.55239 6.91844 4.34637 7.03187 5.2268C6.4775 5.10776 6.71625 6.42664 6.74062 6.84863C6.7675 7.28578 6.9175 7.972 7.37187 7.83649C7.5975 9.63479 8.32375 10.2081 8.32375 10.2081L8.30562 12.1196C8.30562 12.1196 7.84625 12.409 5.90719 13.2378C3.96812 14.0683 4.57625 13.4098 2.99656 14.2209C0.5 15.5033 0.5 19.0299 0.5 19.0299C0.5 19.5667 0.919687 20 1.4375 20H19.5625C20.0803 20 20.5 19.5667 20.5 19.0321C20.5003 19.0299 20.5003 15.5026 18.0044 14.2209Z" fill="#BEBAB3" style={styles.courseImage}/>
      
    </Svg> */}
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        TouchableOpacitystyle={styles.containericon}
        onPress={handle_setting}
      >
        <Image
          source={require("../assets/icon/Icon_setting.png")} 
          style={styles.courseImage}
          resizeMode="cover" 
        />
        
        <Text style={styles.text}>Setting</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navigator;
const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: "gray",
    borderWidth: 0.4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 5,
  },
  containericon: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 10,
  },
});
