import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const Intro = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('../assets/logo.png')} />
      <StatusBar style="auto" />
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.logIn} onPress={()=> navigation.navigate("Login")}>
          <Text style={{color: '#000', textAlign: 'center', fontSize: 24, fontWeight: '600'}}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUp} onPress={()=> navigation.navigate("Signup")}>
          <Text style={{color: '#fff', textAlign: 'center', fontSize: 24, fontWeight: '600'}}>Sign Up</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  )
}

export default Intro

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        paddingHorizontal: 35,
        paddingBottom: 40 
      },
    
      image: {
        position: 'absolute',
        top: '35%',
        alignSelf: 'center'
      },

      buttons: {
        marginHorizontal: 35
      },
    
      signUp: {
        padding: 18,
        backgroundColor: '#0079BE',
        borderRadius: 40
      },
    
      logIn: {
        padding: 18,
        backgroundColor: '#F0F0F0',
        borderRadius: 40,
        marginTop: 15,
        marginBottom: 20
      },
})