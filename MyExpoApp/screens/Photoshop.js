import { View, Text ,StyleSheet} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { useCourseContext } from '../Navigation/Appstack'
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Photoshop = () => {
    const navigation = useNavigation();
    const { Allcourse } = useCourseContext();
    const designCourses = Allcourse.filter(course => course.labels.includes('Photoshop'));
    const handle_Items =  (itemData) => {
        navigation.navigate("Details", { itemData });
      };
  return (
    <SafeAreaView style={styles.Maincontainer}>
       <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {designCourses.map((course) => (
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
    </SafeAreaView>
  );
};

export default Photoshop;
const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
    marginTop: 0,
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
    color:'#0B7077',
  },
  Title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  description: {},
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
});
