/**
 * Day 16
 * Gesture unlock
 * https://github.com/spikef/react-native-gesture-password
 */
'use strict';

import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, Image, StyleSheet, Text, View } from 'react-native';
import Util from './utils';
import PasswordGesture from 'react-native-gesture-password';

const EnterPassword = ( {password, onEnterPassword}) => {
    const [message, setMessage] = useState('Unlock with your password.')
    const [status, setStatus] = useState('normal')

    const onEnd = (pwd) => {
        if (password == pwd) {
            setStatus('right')
            setMessage('Password is right, success.')
            onEnterPassword();
        } else {
            setStatus('wrong')
            setMessage('Password is wrong, try again.')
        }
    }

    const onStart = () => {
        setStatus('normal')
        setMessage('Unlock your password.')
    }

    return (
        <PasswordGesture
            style={styles.setPg}
            status={status}
            message={message}
            allowCross={true}
            onStart={onStart}
            onEnd={onEnd}
        />
    );
}

const SetPassword = ( {onSetPassword }) => {
    const password = useRef('')
    const [message, setMessage] = useState('Please set your password.')
    const [status, setStatus] = useState('normal')

    const onEnd = (pwd) => {
        if(pwd === ''){ return }
        if (password.current === '') {
            password.current = pwd;
            setStatus('normal')
            setMessage('Please input your password secondly.')
        } else {
            if (password.current === pwd) {
                setStatus('right')
                setMessage('Your password is set.')
                onSetPassword(pwd);
                password.current = '';
            } else {
                setStatus('wrong')
                setMessage('Not the same, try again.')
            }
        }
    }

    const onStart = () => {
        if (password === '') {
            setMessage('Please set your password.')
        } else {
            setMessage('Please input your password secondly.')
        }
    }

    return (
        <PasswordGesture
            style={styles.setPg}
            status={status}
            message={message}
            allowCross={true}
            onStart={onStart}
            onEnd={(pwd) => onEnd(pwd)}
        />
    )
}

export default function Day16() {
    const [password, setPassword] = useState('')
    const [hasSet, setHasSet] = useState(false)
    const [enterApp, setEnterApp] = useState(false)

    const _setPassword = (password) => {
        setPassword(password)
        setHasSet(true)
    }

    const _enterPassword = () => {
        setEnterApp(true)
    }

    useEffect(() => {
        StatusBar.setBarStyle("light-content");
    }, [])

    return (
        <View style={styles.container}>
            {hasSet ? <View></View> : <SetPassword onSetPassword={_setPassword}/>}
            {hasSet && !enterApp ? <EnterPassword onEnterPassword={_enterPassword} password={password} /> : <View></View>}
            {enterApp ? <View style={styles.app}><Text style={styles.appText}>You are in the app!</Text></View> : <View></View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        height: Util.size.height,
        width: Util.size.width,
    },
    setPg: {
        backgroundColor: "#012642",
    },
    app: {
        backgroundColor: "#012642",
        height: Util.size.height,
        width: Util.size.width,
        alignItems: "center",
        justifyContent: "center",
    },
    appText: {
        color: "#fff",
        fontSize: 25,
    }
});
