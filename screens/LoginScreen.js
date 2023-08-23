import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Keyboard, Image, Text, ActivityIndicator } from 'react-native';
import { login } from '../redux/apiCalls';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AntDesign, FontAwesome5} from '@expo/vector-icons'
import { LogInInputs } from '../data';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const LoginScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const {control, handleSubmit, formState: {errors } } = useForm()
    const isLoading = useSelector((state) => state.isLoading);
  
    const [shown, setShown] = useState(false);
  
  
      useEffect(() => {
          const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setShown(true);
          });
          const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setShown(false);
          });
      
          return () => {
            showSubscription.remove();
            hideSubscription.remove();
          };
        }, []);

        const showToast = (type, text1, text2) => {
            Toast.show({
                type: type,
                text1: text1,
                text2: text2,
                visibilityTime: 6000
            })
        }
  
  
      
  
      
    //   const handleSubmit = (e) => {
    //       login(dispatch,{...values})
    //   };

    const onError = (errors) => {
        console.log(errors)
        const firstErr = Object.keys(errors)[0]
        // console.log(firstErr)
        const message = errors[firstErr].message
        console.log(errors[firstErr].message)
        showToast('error',  message ? message : 'Please fill in the empty field(s)')
    // console.log(errors)
    }

    const onSignIn = async (data) => {
        try {
            // console.log(errors)
            console.log(data)
            dispatch(login(data))
            // navigation.replace('TempHome')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.logIn}>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign style={{ color: "#9dd0ff" }} size={32} name="arrowleft" />
                    </TouchableOpacity>
                    {!shown ? <Image style={{ alignSelf: "center" }} source={require("../assets/pana.png")} /> : null}
                </View>
                <View style={styles.inputCont}>
                    <Text style={{ color: "#005687", fontWeight: "600", fontSize: 32, lineHeight: 39 }}>Log In</Text>
                    <View style={styles.inputs}>
                        {LogInInputs.map((input, index) => (
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 50 }} key={index}>
                                <FontAwesome5 style={{ marginRight: 10, color: "#0083ff" }} size={20} name={input.icon} />
                                <Controller
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({field: {onChange, onBlur, value } }) => (
                                <TextInput {...input} onChangeText={onChange} style={{ borderBottomWidth: 1, flex: 1, borderColor: "#9dd0ff", paddingBottom: 10 }} placeholder={input.placeHolder} />
                                )}
                                name={input.name}
                                />
                            </View>
                        ))}
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={handleSubmit(onSignIn, onError)} style={styles.button}>
                        {isLoading === true ? <ActivityIndicator color="white" /> : <Text style={{ textAlign: "center", color: "#fff", fontSize: 20, fontWeight: "600" }}>Log In</Text>}
                    </TouchableOpacity>
                    <Text style={{ textAlign: "center", color: "#727272", fontSize: 14 }}>New to DISTRESS? <Text onPress={() => navigation.navigate("Signup")} style={{ color: "#0079be", fontSize: 14 }}>Sign Up</Text></Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
    },
    button: {
        padding: 18,
        backgroundColor: '#0079BE',
        borderRadius: 40,
        marginVertical: 10,
        marginTop: 50
    },

    inputCont: {
        marginTop: 50,
    },

    logIn: {
        marginHorizontal: 20
    },
});

export default LoginScreen;
