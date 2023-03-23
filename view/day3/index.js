/**
 * Day 3
 * twitter entrance animation
 */
'use strict';

import React, { useEffect, useState } from 'react';
import { Platform, Animated, Easing, Image, RefreshControl, ScrollView, StatusBar, StyleSheet, View, TouchableOpacity } from 'react-native';
import Util from '../utils';
import { Ionicons } from '@expo/vector-icons';
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const Entrance = ({ hideThis }) => {

    const transformAnim = new Animated.Value(1)
    const opacityAnim = new Animated.Value(1)

    useEffect(() => {
        Animated.timing(
            transformAnim,
            {
                toValue: 50,
                duration: 1200,
                delay: 2000,
                easing: Easing.elastic(2),
                useNativeDriver: true
            },
        ).start();
        Animated.timing(
            opacityAnim,
            {
                toValue: 0,
                duration: 800,
                easing: Easing.elastic(1),
                delay: 2200,
                useNativeDriver: true
            },
        ).start();
        setTimeout(() => {
            hideThis();
        }, 3300);
    }, [])


    return (
        <Animated.View style={[styles.entrance, { opacity: opacityAnim }]}>
            <AnimatedIcon size={60} style={[styles.twitter, { transform: [{ scale: transformAnim }] }]} name="logo-twitter"></AnimatedIcon>
        </Animated.View>
    )
}

const TwitterPost = ({navigation}) => {
    const [isRefreshing, setIsRefreshing] = useState(false)

    const _onRefresh = () => {
        setIsRefreshing(true)
        setTimeout(() => {
            setIsRefreshing(false)
        }, 1000);
    }
    const insets = useSafeAreaInsets();
    return (
        <>
        <View style={[styles.nav, { paddingTop: insets.top }]}>
            <View style={styles.navLeft}>
                <Ionicons name="ios-person-add" size={23} style={{ color: "#1b95e0", paddingLeft: 10 }}></Ionicons>
            </View>
            <TouchableOpacity style={styles.navMid} onPress={() => { navigation.pop() }}>
                <Ionicons name="logo-twitter" size={27} style={{ color: "#1b95e0" }}></Ionicons>
            </TouchableOpacity>
            <View style={styles.navRight}>
                <Ionicons name="ios-search" size={23} style={{ color: "#1b95e0", width: 30 }}></Ionicons>
                <Ionicons name="ios-create-outline" size={23} style={{ color: "#1b95e0", width: 30, paddingRight: 10 }}></Ionicons>
            </View>
        </View>
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={_onRefresh}
                    tintColor="#ddd" />}>
            <Image source={require('../img/day3.png')}
                style={{ width: Util.size.width, height: Util.size.width * 1107 / 750 }}></Image>
        </ScrollView>
        </>
    )
}


const TwitterTab = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'ios-home-outline' : 'ios-home';
                    } else if (route.name === 'Notification') {
                        iconName = focused ? 'ios-notifications-outline' : 'ios-notifications';
                    } else if (route.name === 'Mail') {
                        iconName = focused ? 'ios-mail-outline' : 'ios-mail';
                    } else if (route.name === 'Person') {
                        iconName = focused ? 'ios-person-outline' : 'ios-person';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={TwitterPost} />
            <Tab.Screen name="Notification" component={TwitterPost} />
            <Tab.Screen name="Mail" component={TwitterPost} />
            <Tab.Screen name="Person" component={TwitterPost} />
        </Tab.Navigator>
    )
}

export default function Day3() {
    const [show, setShow] = useState(true)

    useEffect(() => {
        if (Platform.OS === "ios") {
            StatusBar.setBarStyle('default');
        }
    }, [])

    const _hideEntrance = () => {
        setShow(false)
    }

    return (
        <View style={styles.twitterContainer}>
            <TwitterTab />
             {show ? <Entrance hideThis={_hideEntrance} /> : <View></View>}
        </View>
    )
}

const styles = StyleSheet.create({
    itemWrapper: {
        backgroundColor: '#fff'
    },
    twitterContainer: {
        width: Util.size.width,
        height: Util.size.height
    },
    entrance: {
        position: "absolute",
        top: 0, left: 0,
        height: Util.size.height,
        width: Util.size.width,
        backgroundColor: "#1b95e0",
        alignItems: "center",
        justifyContent: "center"
    },
    twitter: {
        color: "#fff",
        position: "relative",
        top: -20,
        textAlign: "center"
    },
    nav: {
        flexDirection: "row",
        paddingTop: 30,
        borderBottomWidth: Util.pixel,
        borderBottomColor: "#ddd",
        paddingBottom: 5,
        backgroundColor: "#fff"
    },
    navLeft: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    navMid: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    navRight: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row"
    },
    twitterPostContainer: {
        width: Util.size.width,
        height: Util.size.height - 90,
        position: "relative",
        top: -20
    },
    navAndroid: {
        backgroundColor: "#3195d7",
        width: Util.size.width,
        height: 55,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    tabs: {
        height: 45,
        flexDirection: 'row',
        paddingTop: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        backgroundColor: "#111"
    },
    icon: {
        position: 'absolute',
        top: 0,
        left: 35,
    },
    img: {
        width: 375,
        height: 550,
    },
    title: {
        color: "#fff",
        fontSize: 20,
        paddingLeft: 10
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 60,
    },
    logoContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    tabView: {
        flex: 1,
        height: 500,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
});