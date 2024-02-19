/**
 * Day 7
 * Basic pan gesture
 */
'use strict';

import React, { useEffect, useState, useRef } from 'react';
import { Platform, Image, StyleSheet, StatusBar, Text, TouchableHighlight, PanResponder, View } from 'react-native';
import Util from './utils';
import { Ionicons } from '@expo/vector-icons';

const MoveableCircle = () => {
    const [color, setColor] = useState("rgba(255,255,255,0.7)")
    const _previousLeft = useRef(Util.size.width / 2 - 40);
    const _previousTop = useRef(Util.size.height / 2 - 50);
    let _maxTop = Util.size.height - 110;
    let _maxLeft = Util.size.width - 98;
    let circle = useRef();

    const _panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {
            setColor("white")
        },
        onPanResponderMove: (evt, gestureState) => {

            _circleStyles.style.left = _previousLeft.current + gestureState.dx;
            _circleStyles.style.top = _previousTop.current + gestureState.dy;
            if (_circleStyles.style.left < 0) {
                _circleStyles.style.left = 0;
            };
            if (_circleStyles.style.top < 5) {
                _circleStyles.style.top = 5;
            };
            if (_circleStyles.style.left > _maxLeft) {
                _circleStyles.style.left = _maxLeft;
            };
            if (_circleStyles.style.top > _maxTop) {
                _circleStyles.style.top = _maxTop;
            };
            _updatePosition();
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => _endMove(evt, gestureState),
        onPanResponderTerminate: (evt, gestureState) => _endMove(evt, gestureState),
    })).current;

    const _circleStyles = useRef({
        style: {
            left: _previousLeft.current,
            top: _previousTop.current,
        },
    }).current;


    const _updatePosition = () => {
        circle.current?.setNativeProps(_circleStyles);
    }

    const _endMove = (evt, gestureState) => {
        _previousLeft.current += gestureState.dx;
        _previousTop.current += gestureState.dy;
        setColor("rgba(255,255,255,0.7)")
    }

    return (
        <View ref={circle} style={styles.MoveableCircle} {..._panResponder.panHandlers}>
            <Ionicons name="ios-baseball" color={color} size={120}></Ionicons>
        </View>
    )
}

export default function Day7() {

    useEffect(() => {
        if (Platform.OS === "ios") {
            StatusBar.setBarStyle('light-content');
        }
    }, [])

    return (
        <View style={styles.container}>
            <Image source={require('./img/agrass.png')} style={styles.bg}></Image>
            <View style={styles.circleContainer}>
                <MoveableCircle></MoveableCircle>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Util.size.height,
        width: Util.size.width
    },
    bg: {
        width: Util.size.width,
        resizeMode: "stretch",
        position: "absolute"
    },
    circleContainer: {
        height: Util.size.height,
        width: Util.size.width,
    },
    MoveableCircle: {
        backgroundColor: "transparent",
        position: "absolute",
        left: Util.size.width / 2 - 40,
        top: Util.size.height / 2 - 50
    },
});