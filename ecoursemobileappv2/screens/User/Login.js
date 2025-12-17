const { View, Text } = require("react-native")
const { default: MyStyles } = require("../../styles/MyStyles")

const Login =()=>{
    return(
        <View>
            <Text style={MyStyles.title}>Login</Text>
        </View>
    )
}

export default Login;