import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, Title } from 'react-native-paper';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import {apiUrl} from '../utils'




const Profile = ({route, navigation})=>{

    const {_id, name, picture, phone, salary, position, email} = route.params.item

    const deleteEmployee = ()=>{
        fetch(`${apiUrl}/api/delete`,{
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({_id})
        }).then(res=>res.json())
        .then(data=>{Alert.alert(`${data.name} deleted from the list`)
        navigation.navigate("Home")}

        ).catch(err=>Alert.alert("error occured try again"))
    }


    const openDial = () =>{
        if(Platform.OS ==="android"){
            Linking.openURL("tel:"+phone)
        }else{
            Linking.openURL("telprompt:"+phone)
        }
    }


    return (
            <View style={Styles.root}>

                        <LinearGradient
                            colors={["#0033ff","#6bc1ff"]}
                            style={{
                                height:"20%",
                            }}
                            />

                        <View style={{alignItems:"center"}}>
                            <Image
                                    style={{width:140, height:140, borderRadius:140/2, marginTop:-70}}
                                    source={{uri:picture}}
                                />
                        </View>


                        <View style ={{alignItems:"center", margin:7}}>
                            <Title >{name}</Title>
                            <Text style={{fontSize:18}}>{position}</Text>
                        </View>

                        <Card style={Styles.myCard} onPress={()=>{
                            Linking.openURL("mailto:"+email)
                            }}>
                            <View style={Styles.cardContent}>
                            <MaterialIcons name="email" size={24} color="#006aff" />
                            <Text style={Styles.myTextObject}>{email}</Text>
                            </View>
                        </Card>
                
                        <Card style={Styles.myCard} onPress={()=>openDial()}>
                            <View style={Styles.cardContent}>
                            <AntDesign name="phone" size={24} color="#006aff" />
                            <Text style={Styles.myTextObject}>{phone} </Text>

                            </View>
                        </Card>

                        <Card style={Styles.myCard}>
                            <View style={Styles.cardContent}>
                            <MaterialIcons name="attach-money" size={24} color="#006aff" />
                            <Text style={Styles.myTextObject}>{salary} </Text>

                            </View>
                        </Card>

                        <View style={{flexDirection:"row", justifyContent:"space-evenly", padding:10}}>

                            <Button
                            icon="account-edit" 
                            mode="contained" 
                            theme={theme}
                            onPress={() => navigation.navigate('Create',{_id, name, picture, phone, salary, position, email})}>
                            Edit
                            </Button>

                            <Button
                            icon="delete" 
                            mode="contained" 
                            theme={{colors:{primary:"red"}}}
                            onPress={() => deleteEmployee()}>
                                Fire Employee
                            </Button>
                        
                        </View>
            </View>
            
    )


}


const theme = {
    colors:{
        primary:"#006aff"
    }
}

const Styles = StyleSheet.create({
    root:{
        flex:1
    },
    myCard:{
        margin:3
    },
    cardContent:{
        flexDirection:"row",
        padding:8
    },
    myTextObject:{
        marginTop:3,
        marginLeft:5
    }
})

export default Profile;