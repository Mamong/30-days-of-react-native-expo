/**
 * Day 7
 * Basic pan gesture
 */
'use strict';

import React, { useEffect, useRef } from 'react';
import { Platform, Image, StyleSheet, StatusBar, Text, TouchableHighlight, PanResponder, View } from 'react-native';
import Util from './utils';
import { Ionicons } from '@expo/vector-icons';

const MoveableCircle = () => {

    let _previousLeft = Util.size.width / 2 - 40;
    let _previousTop = Util.size.height / 2 - 50;
    let _maxTop = Util.size.height - 110;
    let _maxLeft = Util.size.width - 98;
    let _circleStyles = {};
    let circle = useRef();
    let baseball = useRef();
    let _ballStyles = {};
    let _panResponder = {};

    _panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {
            _ballStyles.style.color = "white"
            _updateColor()
        },
        onPanResponderMove: (evt, gestureState) => {

            _circleStyles.style.left = _previousLeft + gestureState.dx;
            _circleStyles.style.top = _previousTop + gestureState.dy;
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
    });
    _circleStyles = {
        style: {
            left: _previousLeft,
            top: _previousTop,
        },
    };

    _ballStyles = {
        style: {
            color: "rgba(255,255,255,0.7)"
        }
    }


    const _updatePosition = () => {
        circle.current?.setNativeProps(_circleStyles);
    }

    const _updateColor = () => {
        baseball.current?.setNativeProps(_ballStyles);
    }

    const _endMove = (evt, gestureState) => {
        _previousLeft += gestureState.dx;
        _previousTop += gestureState.dy;
        _ballStyles.style.color = "rgba(255,255,255,0.7)"
        _updateColor()
    }

    useEffect(() => {
        _updatePosition();
    }, [circle.current])

    return (
        <View ref={circle} style={styles.MoveableCircle} {..._panResponder.panHandlers}>
            <Ionicons ref={baseball} name="ios-baseball" style={_ballStyles.style} size={120}></Ionicons>
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
        left: 0,
        right: 0

    },
});