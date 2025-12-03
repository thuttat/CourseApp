import { use, useEffect, useState } from "react"
import { FlatList, Image, View } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import Apis, { endpoints } from "../utils/Apis";
import MyStyles from "../styles/MyStyles";
import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const Courses =() =>{
    const[courses,setCourses]=useState([]);
    const[loading,setLoading] = useState(true);
    const[q,setQ]=useState();
    const[page,setPage] = useState(1);

    const loadCourses = async () =>{
        try{
            setLoading(true);

            let url = `${endpoints['courses']}?page=${page}`;

            if (q){
                url = `${url}&q=${q}`;
            }
            console.info(url);

            let res = await Apis.get(url);
            if (page === 1)
                setCourses(res.data.results);
            else if(page >1)
                
            if (res.data.next ==  null)
                setPage=0;
        } catch(ex){
            console.error(ex);
        }finally{
            setLoading(false)
        }
        
    }
    useEffect(()=>{
        if (page >0){
            let timer = setTimeout(()=>{
                loadCourses();
            },500);
        }

        return () => clearTimeout(timer);
    },[q,page])

    const loadMore = () =>{
        if(page>0)
            setPage(page+1);
    }

    return (

        <View style={MyStyles.padding}>
            <Searchbar placeholder="Finding courses" value={q} onChangeText={setQ}/>
            <FlatList onEndReached={loadMore}
                ListFooterComponent={loading && <ActivityIndicator size={"large"}/>}
                data={courses}
                renderItem={({item})=><List.Item key={item.id}
                                                title={item.subject}
                                                description={item.created_date}
                                                left={()=><Image style={MyStyles.avatar} source={{uri:item.image}}/>}
                                                />}
            />
        </View>
    )
}
export default Courses;