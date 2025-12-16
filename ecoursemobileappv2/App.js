import { Text, View } from "react-native"
import MyStyles from "./styles/MyStyles"
import Categories from "./components/Categories";
import Home from "./screens/Home/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const StackNavigator =()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{title:"Courses"}}/>
      <Stack.Screen name="Lesson" component={Lessons} options={{title:"Lesson List"}}/>
    </Stack.Navigator>
  )
}

const App =() =>{
  return (
    <NavigationContainer>
      <Stack.Navigator/>
    </NavigationContainer>
  );
}

export default App;