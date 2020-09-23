import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'
import Home from './Screens/Home';
import CreateEmployee from './Screens/CreateEmployee';
import Profile from './Screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import {Provider} from 'react-redux'
import {store} from './redux/store'


const Stack = createStackNavigator()

const headerOptions = {
  title:"My Home",
  headerTintColor:"white",
  headerTitleAlign:"left",
  headerStyle:{
    backgroundColor:"#006aff"
  }
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container}>
            <Stack.Navigator>
              <Stack.Screen 
              name="Home" 
              component={Home} 
              options={headerOptions}

              />
              <Stack.Screen
               name="Create"
               component={CreateEmployee}
               options={{...headerOptions, title:"Create"}}
                 />
              <Stack.Screen
               name="Profile" 
               component={Profile}
               options={{...headerOptions, title:"profile"}}
               
                />
            </Stack.Navigator>
        </View>
  </NavigationContainer>
  </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    marginTop:Constants.statusBarHeight,
   
  },
});
