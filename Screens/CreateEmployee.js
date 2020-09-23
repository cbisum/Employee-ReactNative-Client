import React, { useState } from 'react';
import  { StyleSheet, Text, View, Modal, CameraRoll , Alert, Image, KeyboardAvoidingView} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {apiUrl, Cloudinary_url} from '../utils'





const CreateEmployee = ({navigation, route})=>{
    const getDetails=(type)=>{
        if(route.params){
            switch(type){
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "picture":
                    return route.params.picture
                case "position":
                    return route.params.position
                case "salary":
                    return route.params.salary
                default:
                    return ''
        }   
    }
    return ''
    }
    
    const[name, setName]=useState(getDetails("name"))
    const[phone, setPhone]=useState(getDetails("phone"))
    const[email, setEmail]=useState(getDetails("email"))
    const[salary, setSalary]=useState(getDetails("salary"))
    const[picture, setPicture]=useState(getDetails("picture"))
    const[position, setPosition]=useState(getDetails("position"))
    const[modal, setModal]=useState(false)
    
    const submitData =()=>{
        fetch(`${apiUrl}/api/send-data`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name,
                phone,
                email,
                salary,
                picture,
                position
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is saved`)
            navigation.navigate("Home")
        }).catch(err=>Alert.alert("error occured"))
    }

    const updateData =()=>{
        fetch(`${apiUrl}/api/update`,{
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                _id:route.params._id,
                name,
                phone,
                email,
                salary,
                picture,
                position
            })
        }).then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} has been updated`)
            navigation.navigate("Home")
        }).catch(err=>{
            Alert.alert("something went wrong")
        })
    }

    
const pickFromGallery =async()=>{
    const {granted} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(granted){
    const data =   await ImagePicker.launchImageLibraryAsync({
          mediaTypes:ImagePicker.MediaTypeOptions.Images,
          allowsEditing:true,
          aspect:[1,1],
          quality:0.5
      })
      if(!data.cancelled){

        let newFile = {
            uri:data.uri,
            type:`test/${data.uri.split(".")[0]}`,
            name:`test.${data.uri.split(".")[0]}`
        }
          handleUpload(newFile) 
      }
    }else{
  
      Alert.alert("You need to provide permission to work")
    }
  }


  
const pickFromCamera =async()=>{
    const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
    if(granted){
    const data =   await ImagePicker.launchCameraAsync({
          mediaTypes:ImagePicker.MediaTypeOptions.Images,
          allowsEditing:true,
          aspect:[1,1],
          quality:0.5
      })
      if(!data.cancelled){

        let newFile = {
            uri:data.uri,
            type:`test/${data.uri.split(".")[0]}`,
            name:`test.${data.uri.split(".")[0]}`
        }
          handleUpload(newFile) 
      }
    }else{
  
      Alert.alert("You need to provide permission to work")
    }
  }

  const handleUpload = (image)=>{
  const data =   new FormData()
  data.append("file", image)
  data.append('upload_preset', 'firstNative');
  data.append("cloud_name","doxenz7xb");

  fetch(Cloudinary_url,{
      method:"post",
      body:data,

  })
  .then(res=>res.json())
  .then(data=>{
      setPicture(data.url)
      setModal(false)
  }).catch(err=>Alert.alert("error occured"))
  }
  

 

    return(
    
        <View style ={Styles.root}>

        <TextInput
            label="Name"
            style ={Styles.inputStyle}
            value={name}
            theme={theme}
            mode="outlined"
            onChangeText={text=>setName(text)}
         />
        
        <TextInput
            label="Email"
            style={Styles.inputStyle}
            theme={theme}
            value={email}
            mode="outlined"
            onChangeText={text=>setEmail(text)}
         />

        <TextInput
            label="Phone"
            style={Styles.inputStyle}
            theme={theme}
            value={phone}
            keyboardType="number-pad"
            mode="outlined"
            onChangeText={text=>setPhone(text)}
         />

        <TextInput
            label="Salary"
            style={Styles.inputStyle}
            theme={theme}
            value={salary}
            mode="outlined"
            onChangeText={text=>setSalary(text)}
         />
        <TextInput
            label="Position"
            style={Styles.inputStyle}
            theme={theme}
            value={position}
            mode="outlined"
            onChangeText={text=>setPosition(text)}
         />
       

        <Button  
        style={Styles.inputStyle} 
        icon={route.params?"upload":picture?"check":"upload"} 
        disabled={route.params?false:picture?true:false}
        mode="contained"
        theme={theme}
        onPress={() => setModal(true)}>
                 {route.params&& picture?"upload new Image":picture ?"Upload Successful":"Upload Image"}
        </Button>
        {route.params?
        <Button  
        style={Styles.inputStyle} 
        icon="content-save" 
        mode="contained"
        theme={theme}
        onPress={() => updateData()}>
                Update details
        </Button>:<Button  
        style={Styles.inputStyle} 
        icon="content-save" 
        mode="contained"
        theme={theme}
        onPress={() => submitData()}>
                Save 
        </Button>}

      



        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={()=>{
                setModal(false)
            }}
        >

        <View style={Styles.modalView}>

        <View style={Styles.modalButtonView}> 

        <Button
         icon="camera" 
         mode="contained" 
         theme={theme}
         onPress={() => pickFromCamera()}>
                 Camera
        </Button>
        <Button 
           theme={theme}
        icon="image" 
        mode="contained"

        onPress={() =>pickFromGallery()}>
                 Gallary
        </Button>

        </View>

        <Button 
        theme={theme}
        icon="close"  
        onPress={() => setModal(false)}>
                 close
        </Button>
        </View>
        

        </Modal>
       
      
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
        flex:1,
    },
    inputStyle:{
        margin:5
    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    },
    modalView:{
        position:"absolute",
        bottom:2,
        width:"100%",
        height:150,
        backgroundColor:"white"
    }
})

export default CreateEmployee