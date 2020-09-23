import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Image, FlatList , ActivityIndicator, Alert} from 'react-native';
import {Card, FAB} from 'react-native-paper'
import {apiUrl} from '../utils'
import {useSelector,useDispatch} from 'react-redux'

const  Home=({navigation})=>{
// const [data, setData] = useState([])
// const [loading, setLoading] = useState(true)

  const {data, loading} =   useSelector(state=>state)
  const dispatch = useDispatch()



    const fetchData = ()=>{
        fetch(`${apiUrl}/api/get-all`,{
            method:"get",
            headers:{
            'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json())
        .then(contents=>{
            // setData(contents)
            // setLoading(false)
            dispatch({
                type:"ADD_DATA",
                payload:contents
            })
            dispatch({
                type:"SET_LOADING",
                payload:false
            })
         
        }).catch(err=>Alert.alert("error occured"))
        
    }

    useEffect(()=>{
        fetchData()
      
    },[])

    

    const renderList = (item=>{
        return (
            <Card style={Styles.mycard} onPress={()=>navigation.navigate("Profile",{item})}>
            <View style={Styles.cardView} > 
            <Image
              style={{width:60, height:60, borderRadius:60/2}}
              source={{uri:item.picture}}
             />
             <View style={{marginLeft:10}}>
                  <Text style={Styles.text} > {item.name}</Text>
                   <Text style={Styles.text} >{item.position}</Text>
             </View>
                   
            </View>
           
          </Card>
        )
    })

    return (
        <View style={{flex:1}}>
        <FlatList
            data={data}
            renderItem={({item})=>renderList(item)}
            keyExtractor={item=>item._id}
            onRefresh={()=>fetchData()}
            refreshing={loading}
        />

         <FAB
            onPress={()=>navigation.navigate("Create")}
            icon="plus"
            style={Styles.fab}
            theme={{
             colors:{accent:"#006aff"}
            }}
          />

        </View>
    )
}
 
const Styles = StyleSheet.create({
    mycard:{
        margin:5,
        borderStartWidth:3,
        borderBottomWidth:3,
        borderBottomColor:"blue",
        borderStartColor:"blue"
    },
    cardView:{
        flexDirection:"row",
        padding:6
    },
    text:{
        fontSize:20,
    },
    fab:{
        position:'absolute',
        margin:16,
        right:0,
        bottom:0
    }
})


export default Home;








