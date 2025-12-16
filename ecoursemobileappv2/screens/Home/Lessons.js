import { useEffect, useState } from "react"

import { ActivityIndicator, List } from "react-native-paper";

import MyStyles from "../styles/MyStyles";
import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { useRoute } from "@react-navigation/native";
import Apis, { endpoints } from "../../utils/Apis";
import { FlatList, View } from "react-native";

const Lessons =() =>{
    const[lessons,setLessons]=useState([]);
    const[loading,setLoading] = useState(true);
    const route = useRoute();
    const coursesId =route?.params?.coursesId;

    const loadLessons = async () =>{
        try{
            setLoading(true);

            let res = await Apis.get(endpoints[`lessons`](coursesId));
            setLessons(res.data)
        } catch(ex){
            console.error(ex);
        }finally{
            setLoading(false)
        }
        
    }
    useEffect(()=>{
        loadLessons()
    },[coursesId])

 

    return (

        <View style={MyStyles.padding}>
            <FlatList 
                ListFooterComponent={loading && <ActivityIndicator size={"large"}/>}
                data={lessons}
                renderItem={({item})=><List.Item key={item.id}
                                                title={item.subject}
                                                description={item.created_date}
                                                left={()=><Image style={MyStyles.avatar} source={{uri:item.image}}/>}
                                                />}
            />
        </View>
    )
}
export default Lessons;