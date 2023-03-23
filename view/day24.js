/**
 * Day 24
 * 
 */
'use strict';

import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, StatusBar, Animated, ScrollView, View } from 'react-native';
import Util from './utils';
import { Ionicons, Feather } from '@expo/vector-icons';
// import { TabView, SceneMap } from 'react-native-tab-view';
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


const HomePage = () =>
    <ScrollView>
        <Image style={styles.img} source={require("./img/tumblr.png")} />
    </ScrollView>


const PopularPage = () =>
    <ScrollView>
        <Image style={styles.img} source={require("./img/tumblr.png")} />
    </ScrollView>

const SubscribePage = () =>
    <ScrollView>
        <Image style={styles.img} source={require("./img/tumblr.png")} />
    </ScrollView>


const MinePage = () =>
    <ScrollView>
        <Image style={styles.img} source={require("./img/tumblr.png")} />
    </ScrollView>

const pages = [
    { title: "首页", name: "Home", component: HomePage },
    { title: "时下流行", name: "Popular", component: PopularPage },
    { title: "订阅", name: "Subscribe", component: SubscribePage },
    { title: "帐户", name: "Mine", component: MinePage }
]

export default function Day24({ navigation }) {

    const [index, setIndex] = useState(0);

    const insets = useSafeAreaInsets();

    // use TabView or material-top-tabs

    // const [routes] = React.useState([
    //     { key: 'first', title: 'First' },
    //     { key: 'second', title: 'Second' },
    // ]);

    // const renderScene = SceneMap({
    //     first: HomePage,
    //     second: PopularPage,
    // });

    // return (
    //     <>
    //         <View style={[styles.navBg, { paddingTop: insets.top }]}></View>
    //         <View style={styles.nav}>
    //             <Text style={styles.title}>{pages[index].title}</Text>
    //             <View style={styles.iconContainer}>
    //                 <Ionicons name="ios-search-sharp" color="#fff" size={25} />
    //                 <Feather name="more-vertical" color="#fff" size={25} />
    //             </View>
    //         </View>
    //         <TabView
    //             navigationState={{ index, routes }}
    //             renderScene={renderScene}
    //             onIndexChange={setIndex}
    //             initialLayout={{ width: Util.size.width }}
    //         />
    //     </>
    // );

    return (
        <>
            <View style={[styles.navBg, { paddingTop: insets.top }]}></View>
            <View style={styles.nav}>
                <Text style={styles.title}>{pages[index].title}</Text>
                <View style={styles.iconContainer}>
                    <Ionicons name="ios-search-sharp" color="#fff" size={25} />
                    <Feather name="more-vertical" color="#fff" size={25} />
                </View>
            </View>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: '#e32524' },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#5b0e0d',
                tabBarIndicatorStyle: { backgroundColor: '#fff' },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = "";
                    if (route.name === 'Home') {
                        iconName = 'ios-home';
                    } else if (route.name === 'Popular') {
                        iconName = 'baseball';
                    } else if (route.name === 'Subscribe') {
                        iconName = 'ios-albums-outline';
                    } else if (route.name === 'Mine') {
                        iconName = 'person';
                    }
                    return <Ionicons name={iconName} color={color} size={30} />
                }
            })} screenListeners={{
                state: (e) => {
                    const { index } = e.data.state
                    setIndex(index)
                },
            }}
            >
                {pages.map(item =>
                    <Tab.Screen name={item.name} component={item.component} />
                )}
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    navBg: {
        backgroundColor: "#c11f1e",
        width: Util.size.width,
        height: 20,
    },
    nav: {
        backgroundColor: "#e32524",
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
        backgroundColor: "#e32524"
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
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 60,
    }
});