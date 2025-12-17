import { Text, View } from "react-native"
import MyStyles from "./styles/MyStyles"
import Categories from "./components/Categories";
import Home from "./screens/Home/Home";
import Lessons from"./screens/Home/Lessons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Register from "./screens/User/Register";
import Login from "./screens/User/Login";
import { Icon } from "react-native-paper";

const Stack = createNativeStackNavigator();

const StackNavigator =()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} options={{title:"Courses"}}/>
      <Stack.Screen name="Lesson" component={Lessons} options={{title:"Lesson List"}}/>
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();
const TabNavigator =()=>{
  return(
    <Tab.Navigator>
      <Tab.Screen name="Home" component={StackNavigator} options={{title:"Course",tabBarIcon:() =><Icon source="home" size={30} color="blue"/>}}/>
      <Tab.Screen name="Register" component={Register} options={{title:"Register",tabBarIcon:() =><Icon source="account" size={30} color="blue"/>}} />
      <Tab.Screen name="Login" component={Login} options={{title:"Login",tabBarIcon:() =><Icon source="login" size={30} color="blue"/>}}/>
    </Tab.Navigator>
  )
}

const App =() =>{
  return (
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>
  );
}

export default App;