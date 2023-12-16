import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { RadioButton } from "react-native-paper";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { AuthContext } from "../context/Authcontext";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';



const CartCourse = () => {
    const navigation = useNavigation();
  const { userInfo ,userToken } = useContext(AuthContext);
  const [itemCount, setItemCount] = useState(0);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  console.log("the user info and user token in card screen : " + userInfo + userToken);
  const token = userToken.replace("Bearer ", "");
  const decodedToken = jwt_decode(token);
  console.log("Decoded Token user name:", decodedToken.username);
  console.log("Decoded Token id:", decodedToken.id);
  console.log("Decoded Token email:", decodedToken.email);

  const id_user=decodedToken.id
  const [courses, setCourses] = useState([]);
  const [checked, setChecked] = useState("first");
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log(id_user)
        const response = await axios.get(`http://192.168.1.116:3010/api/getCourseuser/${id_user}`);
        console.log('Courses:', response.data);
        setCourses(response.data.courses);
        console.log(courses)
      } catch (error) {
        console.error('Error fetching courses:', error.message);
      }
    };

    fetchCourses();
  }, []);
  const handleCheckboxChange = (courseId) => {
    const newSelectedCourses = [...selectedCourses];

    const index = newSelectedCourses.indexOf(courseId);

    if (index === -1) {
      newSelectedCourses.push(courseId);
    } else {
      newSelectedCourses.splice(index, 1);
    }

    setSelectedCourses(newSelectedCourses);
  };

  useEffect(() => {
    const selectedCoursePrices = courses
    .filter((course) => selectedCourses.includes(course._id))
    .map((course) => course.price);

  const newTotalPrice = selectedCoursePrices.reduce(
    (acc, currentPrice) => acc + currentPrice,
    0
  );

  setTotalPrice(newTotalPrice);

  
  setItemCount(selectedCourses.length -1);
  }, [selectedCourses, courses]);
  const handleDelete=async (idcourse)=>{
    try {
        console.log('Deleting course with ID:', idcourse);
        console.log('Selected Courses:', selectedCourses);
    
        await axios.delete(`http://192.168.1.131:3010/api/deleteitemcart/${id_user}/${idcourse}`);
    
        setCourses((prevCourses) => prevCourses.filter((course) => course._id !== idcourse));
    
        const newSelectedCourses = selectedCourses.filter(courseId => courseId !== idcourse);
        setSelectedCourses(newSelectedCourses);
    
       
        setItemCount(newSelectedCourses.length);
      } catch (error) {
        console.error('Error deleting item from cart:', error.message);
      }
  }
  const handle_checkout= async()=>{
    const checkoutData = {
        userId: decodedToken.id,
        selectedCourses,
        totalPrice,
     
      };
    // alert('Thank you for your purchase!');
    navigation.navigate('Payment Method', { checkoutData });
  }

  return (
    <SafeAreaView style={styles.Maincontainer}>
     <ScrollView>
        {courses.map(course => (
          <View key={course._id} style={styles.container_course}>
            <RadioButton
            RadioButton
            value={course._id}
            status={
              selectedCourses.includes(course._id)
                ? "checked"
                : "unchecked"
            }
            onPress={() => handleCheckboxChange(course._id)}
            />
            <View style={styles.container_image}>
              <Image
                source={{ uri: course.image }} // Assuming course.image is a valid URI
                style={styles.image}
              />
            </View>
            <View style={styles.container_price_details}>
              <View style={styles.details}>
                <Text style={styles.title}>{course.title}</Text>
                <Text style={styles.desc}>{course.description}</Text>
              </View>
              <View style={styles.container_price}>
                <Text style={styles.price}>{course.price}$</Text>
              </View>
          <TouchableOpacity onPress={() => handleDelete(course._id)}>
            {console.log("the course id"+course._id)}
          <Svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 17 17" fill="none">
        <Path d="M4.18433 4.31689L4.80946 14.3191C4.83916 14.897 5.25956 15.3193 5.80968 15.3193H11.5609C12.1132 15.3193 12.5258 14.897 12.5611 14.3191L13.1863 4.31689" stroke="black" strokeWidth="1.00189" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M3.18433 4.31714H14.1867" stroke="black" strokeWidth="1.00189" strokeMiterlimit="10" strokeLinecap="round" />
        <Path d="M6.68482 4.31566V3.06521C6.68453 2.96661 6.70374 2.86891 6.74134 2.77776C6.77894 2.6866 6.8342 2.60378 6.90392 2.53405C6.97365 2.46432 7.05647 2.40907 7.14763 2.37147C7.23879 2.33386 7.33648 2.31466 7.43509 2.31494H9.93599C10.0346 2.31466 10.1323 2.33386 10.2234 2.37147C10.3146 2.40907 10.3974 2.46432 10.4672 2.53405C10.5369 2.60378 10.5921 2.6866 10.6297 2.77776C10.6673 2.86891 10.6865 2.96661 10.6863 3.06521V4.31566" stroke="black" strokeWidth="1.00189" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M8.68555 6.31567V13.3172" stroke="black" strokeWidth="1.00189" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M6.43457 6.31567L6.68463 13.3172" stroke="black" strokeWidth="1.00189" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M10.9356 6.31567L10.6855 13.3172" stroke="black" strokeWidth="1.00189" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
          </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.container_Total_Price}>
        <View style={styles.container_price_details2}>
          <View>
            <Text style={styles.text_items}> Items ({selectedCourses.length})</Text>
            <Text style={styles.text_items}>Total Price</Text>
          </View>
          <View>
            <Text style={styles.text_items_price}>  ${totalPrice}</Text>
            <Text style={styles.text_items_price}>  ${totalPrice}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.container_checkout} onPress={handle_checkout}>
          <Text style={styles.checkouttext}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

};
const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    paddingTop: Platform.OS === "OS" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
    marginTop: 0,
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  container_course: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#f9f9f9",
    padding: 5,
    borderRadius: 20,
    marginBottom: 13,
  },
  image: {
    resizeMode: "contain",
    width: 80,
    height: 70,
    borderRadius:12
  },
  container_price_details: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  container_price: {
    backgroundColor: "#0B7077",
    paddingLeft: 9,
    paddingRight: 9,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 15,
  },
  price: {
    color: "#fff",
    fontSize:10
  },
  title: {
    fontWeight: "bold",
    fontSize: 13,
    width:150,
    marginLeft:6
  },
  desc: {
    color: "gray",
    fontSize: 10,
    width:150,
    marginLeft:6

  },
  container_Total_Price: {
    //    flex:1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  container_price_details2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#f9f9f9",
    margin: 10,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 15,
  },
  container_checkout: {
    backgroundColor: "#FFB606",
    margin: 10,
    padding: 15,
    borderRadius: 15,
  },
  checkouttext: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  text_items: {
    fontWeight: "bold",
    color: "gray",
  },
  text_items_price: {
    fontWeight: "bold",
    fontSize: 15,
  },
  first: {
    color: "#0B7077",
  },
});

export default CartCourse;
