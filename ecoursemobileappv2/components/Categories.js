import { useEffect, useState } from "react";
import Apis, { endpoints } from "../utils/Apis";
import { Chip } from "react-native-paper";
import { Text, View } from "react-native";
import MyStyles from "../styles/MyStyles";

const Categories =() =>{
    const [categories,setCategories]= useState([]);
    const loadCates = async () =>{
        let res = await Apis.get(endpoints['categories']);
        console.info(res.data);
        setCategories(res.data);
    }
    useEffect(()=>{
        loadCates();
    },[])
    return (
        <View style={MyStyles.row}>
            {categories.map(c => <Chip key={c.id} icon='label'>{c.name}</Chip>)}  
        </View>
    );
}

export default Categories;