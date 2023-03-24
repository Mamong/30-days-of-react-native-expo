/**
 * Day 8
 * Swipe left
 */
'use strict';

import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, StatusBar, Text, TouchableHighlight, PanResponder, LayoutAnimation, ScrollView, View } from 'react-native';
// import { Map } from './day5';
import Util from './utils';
import { FontAwesome } from '@expo/vector-icons';

const Menu = () => {
    return (
        <View style={styles.sideMenuContainer}>
            <Image source={require('./img/map.png')} style={styles.img}></Image>
            <View style={styles.btnContainer}>
                <TouchableHighlight underlayColor="#888" onPress={() => { true }}>
                    <View style={styles.btn}>
                        <FontAwesome style={styles.btnIcon} name="map-marker" size={15}></FontAwesome>
                        <Text style={styles.btnText}>你的地点</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#888" onPress={() => { true }}>
                    <View style={styles.btn}>
                        <FontAwesome style={styles.btnIcon} name="pencil-square" size={15}></FontAwesome>
                        <Text style={styles.btnText}>你的贡献</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#888" onPress={() => { true }}>
                    <View style={styles.btn}>
                        <FontAwesome style={styles.btnIcon} name="product-hunt" size={15}></FontAwesome>
                        <Text style={styles.btnText}>离线区域</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <View style={styles.btnContainer}>
                <TouchableHighlight underlayColor="#888" onPress={() => { true }}>
                    <View style={styles.btn}>
                        <FontAwesome style={styles.btnIcon} name="road" size={15}></FontAwesome>
                        <Text style={styles.btnText}>实时路况</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#888" onPress={() => { true }}>
                    <View style={styles.btn}>
                        <FontAwesome style={styles.btnIcon} name="bus" size={15}></FontAwesome>
                        <Text style={styles.btnText}>公交线路</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#888" onPress={() => { true }}>
                    <View style={styles.btn}>
                        <FontAwesome style={styles.btnIcon} name="bicycle" size={15}></FontAwesome>
                        <Text style={styles.btnText}>骑车线路</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#888" onPress={() => { true }}>
                    <View style={styles.btn}>
                        <FontAwesome style={styles.btnIcon} name="photo" size={15}></FontAwesome>
                        <Text style={styles.btnText}>卫星图像</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#888" onPress={() => { true }}>
                    <View style={styles.btn}>
                        <FontAwesome style={styles.btnIcon} name="tree" size={15}></FontAwesome>
                        <Text style={styles.btnText}>地形</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default function Day8() {
    const _minLeft = -0.7 * Util.size.width - 10;
    const [showDrop, setShowDrop] = useState(false)
    const drop = useRef(null)
    const menu = useRef(null)
    const _panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return gestureState.dy / gestureState.dx != 0;
            },
            onPanResponderGrant: (evt, gestureState) => {
                setShowDrop(true)
            },
            onPanResponderMove: (evt, gestureState) => {
                const sign = gestureState.dx*(-_minLeft)>=0?1:-1
                _menuStyles.style.left = _previousLeft.current + gestureState.dx;
                _dropStyles.style.opacity = _previousOpacity.current + sign *Math.pow(Math.abs(gestureState.dx) / (-_minLeft), 0.5);
                if (_menuStyles.style.left > 0) {
                    _menuStyles.style.left = 0;
                    _dropStyles.style.opacity = 1;
                };
                if (_menuStyles.style.left < _minLeft) {
                    _menuStyles.style.left = _minLeft;
                    _dropStyles.style.opacity = 0;
                };
                _updatePosition();
                LayoutAnimation.configureNext(_CustomLayoutLinear);
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => _endMove(evt, gestureState),
            onPanResponderTerminate: (evt, gestureState) => _endMove(evt, gestureState),
            onShouldBlockNativeResponder: (event, gestureState) => true,
        })).current;

    const _previousLeft = useRef(-0.7 * Util.size.width - 10);
    const _previousOpacity = useRef(0);

    const _menuStyles = useRef({
        style: {
            left: _previousLeft.current,
        },
    }).current;
    const _dropStyles = useRef({
        style: {
            opacity: _previousOpacity.current,
        },
    }).current;
   

    // _CustomLayoutLinear = {
    //   duration: 200,
    //   create: {
    //     type: LayoutAnimation.Types.linear,
    //     property: LayoutAnimation.Properties.left,
    //   },
    //   update: {
    //     type: LayoutAnimation.Types.curveEaseInEaseOut,
    //   },
    // };
    let _CustomLayoutLinear = LayoutAnimation.Presets.linear;



    const _updatePosition = () => {
        menu.current?.setNativeProps(_menuStyles);
        drop.current?.setNativeProps(_dropStyles);
    }

    const _endMove = (evt, gestureState) => {
        if (gestureState.vx < 0 || gestureState.dx < 0) {
            _menuStyles.style.left = _minLeft;
            _dropStyles.style.opacity = 0;
            _previousLeft.current = _minLeft;
            _previousOpacity.current = 0;
            setShowDrop(false)
        }
        if (gestureState.vx > 0 || gestureState.dx > 0) {
            _menuStyles.style.left = 0;
            _dropStyles.style.opacity = 1;
            _previousLeft.current = 0;
            _previousOpacity.current = 1;
        }
        _updatePosition();
        LayoutAnimation.configureNext(_CustomLayoutLinear);
    }

    useEffect(() => {
        _updatePosition();

    }, [])

    return (
        <View style={styles.container}>
            {/* <Map mapType="standard" mapStyle={styles.map} showsUserLocation={false} followUserLocation={false}></Map> */}
            {showDrop ? <View style={styles.drop} ref={drop}></View> : <View></View>}
            <View {..._panResponder.panHandlers} style={styles.sideMenu} ref={menu}>
                <Menu />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Util.size.height,
        width: Util.size.width,
    },
    map: {
        width: Util.size.width,
        height: Util.size.height
    },
    sideMenu: {
        height: Util.size.height,
        width: 0.7 * Util.size.width + 20,
        position: "absolute",
        top: 0,
        backgroundColor: "transparent",
        left: -0.7 * Util.size.width - 10,
    },
    sideMenuContainer: {
        height: Util.size.height,
        width: 0.7 * Util.size.width,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
            height: 0,
            width: 2
        }
    },
    drop: {
        height: Util.size.height,
        width: Util.size.width,
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0,
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    img: {
        width: 0.7 * Util.size.width,
        resizeMode: "contain",
        height: 0.7 * Util.size.width / 1.754,
    },
    btn: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: "#fff"
    },
    btnIcon: {
        flex: 1,
        textAlign: "center",
        color: "#555"
    },
    btnText: {
        flex: 3,
        fontSize: 14,
        fontWeight: "500",
        paddingLeft: 20,
        color: "#454545"
    },
    btnContainer: {
        paddingTop: 10,
        borderBottomWidth: Util.pixel,
        borderBottomColor: "#bbb"
    },
});
