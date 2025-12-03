import { Text, View } from "react-native"
import MyStyles from "./styles/MyStyles"
import Categories from "./components/Categories";
import Home from "./screens/Home/Home";


const App =() =>{
  return (
    <View style={MyStyles.container}>
      <Home/>
    </View>
  );
}

export default App;