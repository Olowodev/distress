import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {MaterialIcons} from '@expo/vector-icons'
import { distressButtons } from '../data';
import { StatusBar } from 'expo-status-bar';
import { signout } from '../redux/apiCalls';
import * as Location from 'expo-location';
import * as Battery from 'expo-battery'
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { publicRequest } from '../requestMethods';

function ButtonComponent({button, user, numbers, batteryLevel, text}) {
    const [distressLoading, setDistressLoading] = useState(false)


    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            visibilityTime: 6000,
        })
    }

    // const pressed = async (color) => {
    //     setDistressLoading(true)
    //     try{
    //         const res = await publicRequest.post('/distress/sms', {color: color, name: user.fullname, numbers: numbers, battery: batteryLevel, location: text})
    //         .then(showToast('success', 'DISTRESS SENT'),
    //             setDistressLoading(false))
    //     }catch(err){
    //         console.log(err)
    //         showToast('error', 'DISTRESS MESSAGE NOT SENT')
    //         setDistressLoading(false)
    //     }
    // }

    const message = async (closeContact) => {
        //setMessageLoading(true)
        try {
            const res = await publicRequest.post('distress/sms-single', {name: 'Nathaniel Solomon', number: '+447305144380', battery: batteryLevel, location: text})
            showToast('success', 'DISTRESS MESSAGE SENT')
            //setMessageLoading(false)
        } catch (err) {
            console.log(err)
            showToast('error', 'DISTRESS MESSAGE NOT SENT')
            //setMessageLoading(false)
        }
    }
    

    

    return (
        
        <View style={{position: 'relative', alignItems: 'center', justifyContent: 'center', marginBottom: 50}}>
            <TouchableOpacity onPress={()=>message(button.distressColor)} style={{backgroundColor: button.bgColor, borderRadius: 50, width: 100, height: 100, position: 'relative', zIndex: 10}}></TouchableOpacity>
            {distressLoading === true ? <ActivityIndicator style={{position: 'absolute', zIndex: 100}} color='black' />: null }
        </View>
    );
}


const HomeScreen = () => {
    const closeContacts = useSelector((state) => state.user === null ? null : state.user.closeContacts);
    const user = useSelector((state)=> state.user);
    const dispatch = useDispatch();
    const [numbers, setNumbers] = useState([]);
    //const [pingLoading, setPingLoading] = useState(false)
    //const [messageLoading, setMessageLoading] = useState(false)
    const [batteryLevel, setBatteryLevel] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    //const [pulse, setPulse] = useState([1]);

    useEffect(()=> {
        closeContacts.map((closeContact, index) => {
            setNumbers(current => [...current, closeContact.number])
        })
    }, [closeContacts]);

    useEffect(() => {
        (async () => {

            let batteryLevel = await Battery.getBatteryLevelAsync();
            const percentBattery = batteryLevel * 100;
            const roundedBatteryLevel = Math.round(percentBattery);
            setBatteryLevel(roundedBatteryLevel)
        })();
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let locationGeocode = await Location.getCurrentPositionAsync({});
            let convert = {
                "latitude": locationGeocode.coords.latitude,
                "longitude": locationGeocode.coords.longitude
            }
            try {
                let location = await Location.reverseGeocodeAsync(convert);
                setLocation(location);
            } catch (err) {
                console.log(err)
            } 
        })();
    }, []);

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            visibilityTime: 6000,
        })
    }

    /*const redPressed = async () => {
        const isAvailable = SMS.isAvailableAsync();
        if (isAvailable) {
            const {result} = await SMS.sendSMSAsync(
                ['07459773774'],
                'sample text',
            );
            console.log(result)
        } else {
            console.log('no sms')
        }
    }*/
    const removeValue = async () => {
        dispatch(signout())
      }

    let text = '';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = `${location[0].name}, ${location[0].city}`;
    }


    const ping = async (closeContact) => {
        //setPingLoading(true)
        try {
            const res = await publicRequest.post('distress/call-single', {name: user.fullname, number: closeContact.number, battery: batteryLevel, location: text})
            .then(showToast('success', 'DISTRESS CALL SENT'))
            //setPingLoading(false)
            //console.log(pingLoading)
        } catch (err) {
            console.log(err)
            showToast('error', 'DISTRESS CALL NOT SENT')
            //setPingLoading(false)
        }
    }   
    
    const message = async (closeContact) => {
        //setMessageLoading(true)
        try {
            const res = await publicRequest.post('distress/sms-single', {name: 'Nathaniel Solomon', number: '+447305144380', battery: batteryLevel, location: text})
            .then(showToast('success', 'DISTRESS MESSAGE SENT'))
            //setMessageLoading(false)
        } catch (err) {
            console.log(err)
            showToast('error', 'DISTRESS MESSAGE NOT SENT')
            //setMessageLoading(false)
        }
    }

  return (
    <SafeAreaView>
        <StatusBar />
        <View style={{marginHorizontal: 20, marginTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 28, fontWeight: '600', color: '#005687'}}>Welcome {user?.fullname.split(' ')[0]}</Text>
                <TouchableOpacity onPress={()=>removeValue()}>
                    <MaterialIcons size={28} color="#005687" name="logout" />
                </TouchableOpacity>
            </View>
            <View style={{marginVertical: 50}}>
                <View style={{justifyContent: 'space-between'}}>
                    {distressButtons.map((button, index) => (
                        <ButtonComponent user={user} batteryLevel={batteryLevel} text={text} numbers={numbers} button={button} key={index} />
                    ))}
                </View>
            </View>
            <ScrollView>
                {closeContacts.map((closeContact, index)=> (
                    <View key={`close-${index}`} style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', alignItems: 'center', padding: 18, backgroundColor: '#fff',  borderRadius: 20}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesomeIcon style={{marginRight: 17}} size={30} icon={faCircleUser} />
                            <Text style={{fontSize: 18,}}>{closeContact.name}</Text>
                        </View>
                        <ContactAction message={message} closeContact={closeContact} ping={ping} />
                    </View>
                ))}
                
                
            </ScrollView>
            {/*<View style={{marginTop: 50, position: 'absolute', width: '100%', bottom: 0}}>
                <TouchableOpacity onPress={()=>removeValue()} style={styles.button}>
                    <Text style={{textAlign: "center", color: "#fff", fontSize: 20, fontWeight: "600"}}>Log Out</Text>
                </TouchableOpacity>
                </View>*/}
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.1,
        shadowRadius: 10
    },
    button: {
        padding: 18,
        backgroundColor: '#0079BE',
        borderRadius: 40,
        marginVertical: 10,
        marginTop: 50
    },
    circle: {
        borderWidth: 4,
        width: 300,
        borderRadius: 150,
        height: 300,
        position:'absolute',
        borderColor: 'red',
        backgroundColor: 'red'
    }
})

export default HomeScreen;