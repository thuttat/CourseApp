import { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';

const { View, Text, TouchableOpacity, Alert, Image } = require("react-native")
const { default: MyStyles } = require("../../styles/MyStyles")


const Register =()=>{
    const info =[{
        "label":"Last name",
        "field":"last_name",
        "icon":"text"
    },{
        "label":"Username",
        "field":"username",
        "icon":"text"
    },{
        "label":"Password",
        "field":"password",
        "icon":"eye",
        "secureTextEntry":true
    },{
        "label":"Confirm",
        "field":"confirm",
        "icon":"eye",
        "secureTextEntry":true
    }];

    const [user,setUser]=useState({});
    const picker =async()=>{
        const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (granted){
            const res =await ImagePicker.launchImageLibraryAsync();
            if(!res.canceled)
                setUser({...user,"avatar":res.assets[0]});
        }else
            Alert.alert("Permission denied!");
    }

    return(
        <View style={MyStyles.padding}>
            <Text style={MyStyles.title}>Register</Text>

            {info.map(i => <TextInput key ={i.field} style={MyStyles.margin}
                            label={i.label}
                            secureTextEntry={i.secureTextEntry}
                            right={<TextInput.Icon icon={i.icon} />} 
                            value ={user[i.field]}
                            onChangeText={t=>setUser({...user,[i.field]:t})}
                    />)}

        <TouchableOpacity style={MyStyles.margin} onPress={picker}>
            <Text>Choose avatar</Text>
        </TouchableOpacity>

        {user.avatar && <Image source={{uri: user.avatar.uri}} width={250} style={MyStyles.avatar}/>}
        <Button loading={false} mode="contained" icon="account">Register</Button>

        </View>
    )

}

export default Register;