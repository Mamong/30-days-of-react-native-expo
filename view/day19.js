/**
 * Day 19
 * 
 */
'use strict';

import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, StatusBar, Text, AlertIOS, TouchableHighlight, View } from 'react-native';
import Util from './utils';
import * as LocalAuthentication from 'expo-local-authentication';
import { EnterPassword } from './day16'

const Main = () => 
        <View style={styles.main}>
            <Text style={styles.text}>You are in Day19</Text>
        </View>


export default function Day19() {
    const [enterApp, setEnterApp] = useState(false)

    const _localAuth = async () => {

        // android only
        //LocalAuthentication.cancelAuthenticate()

        //Determine what kind of authentication is enrolled on the device.
        //0 none; 1 pin or password; 2 biometric 
        //LocalAuthentication.getEnrolledLevelAsync()

        //Determine whether a face or fingerprint scanner is available on the device.
        let hasHardware = await LocalAuthentication.hasHardwareAsync()
        if(!hasHardware){
            console.log("device has no biometric authentication hardware")
            return
        }

        //Determine whether the device has saved fingerprints or facial data to use for authentication.
        //LocalAuthentication.isEnrolledAsync()

        //Determine what kinds of authentications are available on the device.
        //1 finger; 2 face ; 3 anroid IRIS
        //LocalAuthentication.supportedAuthenticationTypesAsync()

        let {success,error,warning} = await  LocalAuthentication.authenticateAsync({
            cancelLabel:"Cancel authenticate",
            disableDeviceFallback:false,
            fallbackLabel:"Use password instead",
            promptMessage:"Unlock Day19",
            requireConfirmation: true
        })
        if(success){
            setEnterApp(true)
        }else{
            console.log(error)
        }
    }

    useEffect(()=>{
        _localAuth()
    },[])

    const _enterPassword = () => {
        setEnterApp(true)
    }

    return (
        <View style={styles.container}>
            { enterApp ?
                <Main /> :
                <EnterPassword onEnterPassword={_enterPassword} password="123" />
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        height: Util.size.height,
        width: Util.size.width,
    },
    main: {
        justifyContent: "center",
        alignItems: "center",
        height: Util.size.height,
        width: Util.size.width,
    },
    text: {
        fontSize: 30
    },
});