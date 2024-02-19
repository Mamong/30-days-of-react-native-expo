/**
 * Day 18
 * Sortable List
 * has some performance issue or potential bug
 * little lag when drag
 * To be made to plugin
 */
'use strict';

import React, { useState, useRef } from 'react';
import { Image, StyleSheet, LayoutAnimation, Text, TouchableHighlight, PanResponder, View } from 'react-native';
import Util from './utils';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Sortable = () => {
    const [selected, setSelected] = useState(14)
    const _width = Util.size.width / 3;
    const topIndex = useRef(0);
    const leftIndex = useRef(0);
    const index = useRef(0);
    const finalTopIndex = useRef(0);
    const finalLeftIndex = useRef(0);
    const finalIndex = useRef(0);
    const prev_left = useRef(0);
    const prev_top = useRef(0);
    const left = useRef(0);
    const top = useRef(0);

    const animations = {
        duration: 200,
        create: {
            type: LayoutAnimation.Types.linear,
            property: LayoutAnimation.Properties.opacity
        },
        update: {
            type: LayoutAnimation.Types.linear,
            springDamping: 0.7,
        },
    };
    // last item to be selected as default
    const [days, setDays] = useState([{
        key: 0,
        title: "A stopwatch",
        isFA: false,
        icon: "ios-stopwatch",
        size: 48,
        color: "#ff856c",
        hideNav: false,
    }, {
        key: 1,
        title: "A weather app",
        isFA: false,
        icon: "ios-partly-sunny",
        size: 60,
        color: "#90bdc1",
        hideNav: true,
    }, {
        key: 2,
        title: "twitter",
        isFA: false,
        icon: "logo-twitter",
        size: 50,
        color: "#2aa2ef",
        hideNav: true,
    }, {
        key: 3,
        title: "cocoapods",
        isFA: true,
        icon: "contao",
        size: 50,
        color: "#FF9A05",
        hideNav: false,
    }, {
        key: 4,
        title: "find my location",
        isFA: false,
        icon: "md-pin",
        size: 50,
        color: "#00D204",
        hideNav: false,
    }, {
        key: 5,
        title: "Spotify",
        isFA: true,
        icon: "spotify",
        size: 50,
        color: "#777",
        hideNav: true,
    }, {
        key: 6,
        title: "Moveable Circle",
        isFA: false,
        icon: "ios-baseball",
        size: 50,
        color: "#5e2a06",
        hideNav: true,
    }, {
        key: 7,
        title: "Swipe Left Menu",
        isFA: true,
        icon: "google",
        size: 50,
        color: "#4285f4",
        hideNav: true,
    }, {
        key: 8,
        title: "Twitter Parallax View",
        isFA: true,
        icon: "twitter-square",
        size: 50,
        color: "#2aa2ef",
        hideNav: true,
    }, {
        key: 9,
        title: "Tumblr Menu",
        isFA: false,
        icon: "logo-tumblr",
        size: 50,
        color: "#37465c",
        hideNav: true,
    }, {
        key: 10,
        title: "OpenGL",
        isFA: false,
        icon: "md-contrast",
        size: 50,
        color: "#2F3600",
        hideNav: false,
    }, {
        key: 11,
        title: "charts",
        isFA: false,
        icon: "ios-stats-chart",
        size: 50,
        color: "#fd8f9d",
        hideNav: false,
    }, {
        key: 12,
        title: "tweet",
        isFA: false,
        icon: "md-chatbox",
        size: 50,
        color: "#83709d",
        hideNav: true,
    }, {
        key: 13,
        title: "tinder",
        isFA: true,
        icon: "fire",
        size: 50,
        color: "#ff6b6b",
        hideNav: true,
    }, {
        key: 14,
        title: "Time picker",
        isFA: false,
        icon: "ios-calendar-outline",
        size: 50,
        color: "#ec240e",
        hideNav: false,
    }])

    const boxRefs = useRef(Array(days.length))


    const _panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => {
            return gestureState.dx !== 0 || gestureState.dx !== 0;
        },
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {
            const { pageX, pageY } = evt.nativeEvent;
            //30 to be offset
            topIndex.current = Math.floor((pageY - 30) / _width);
            leftIndex.current = Math.floor((pageX) / _width);
            index.current = topIndex.current * 3 + leftIndex.current;
            prev_left.current = _width * leftIndex.current;
            prev_top.current = _width * topIndex.current;

            setSelected(index.current)
            let box = boxRefs.current[index.current];
            box.setNativeProps({
                style: {
                    opacity: 0.7,
                    shadowColor: "#000",
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    shadowOffset: {
                        height: 0,
                        width: 2
                    }
                },
            });
        },
        onPanResponderMove: (evt, gestureState) => {
            left.current = prev_left.current + gestureState.dx;
            top.current = prev_top.current + gestureState.dy;
            let box = boxRefs.current[index.current];
            box.setNativeProps({
                style: { top: top.current, left: left.current },
            });
            _endMove(evt, gestureState)
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => _release(evt, gestureState),
        onPanResponderTerminate: (evt, gestureState) => _release(evt, gestureState),
        onShouldBlockNativeResponder: (event, gestureState) => true,
    })).current;


    const _endMove = (evt, gestureState) => {
        finalTopIndex.current = Math.floor(top.current / _width + 0.5);
        finalLeftIndex.current = Math.floor(left.current / _width + 0.5);
        if ((-1 < finalTopIndex.current) && (finalTopIndex.current < 5) && (-1 < finalLeftIndex.current) && finalLeftIndex.current < 3) {
            finalIndex.current = finalTopIndex.current * 3 + finalLeftIndex.current;
            let movedBox = days[index.current];
            days.splice(index.current, 1);
            days.splice(finalIndex.current, 0, movedBox);
            setDays(days)

            if (finalIndex.current != index.current) {
                index.current = finalIndex.current;
                setSelected(index.current)
            }
            LayoutAnimation.configureNext(animations);
        } else {
            LayoutAnimation.configureNext(animations);
        }
    }

    const _release = (evt, gestureState) => {
        const shadowStyle = {
            opacity: 1,
            shadowColor: "#000",
            shadowOpacity: 0,
            shadowRadius: 0,
            shadowOffset: {
                height: 0,
                width: 0,
            }
        };
        if ((-1 < finalTopIndex.current) && (finalTopIndex.current < 5) && (-1 < finalLeftIndex.current) && finalLeftIndex.current < 3) {
            let box = boxRefs.current[index.current];
            let top = finalTopIndex.current * _width;
            let left = finalLeftIndex.current * _width;
            box.setNativeProps({
                style: { top, left, ...shadowStyle },
            });
            LayoutAnimation.configureNext(animations);
        } else {
            console.log(topIndex.current, leftIndex.current)
            let box = boxRefs.current[index.current];
            let top = topIndex.current * _width;
            let left = leftIndex.current * _width;
            box.setNativeProps({
                style: { top, left, ...shadowStyle },
            });
            LayoutAnimation.configureNext(animations);
        }
    }

    const boxes = days.map((elem, index) => {
        let top = Math.floor(index / 3) * _width;
        let left = (index % 3) * _width;
        return (
            <View ref={(el) => { boxRefs.current[index] = el }} {..._panResponder.panHandlers} key={elem.key} style={[styles.touchBox, { top, left }]} underlayColor="#eee">
                <View style={styles.boxContainer}>
                    <Text style={styles.boxText}>Day{index + 1}</Text>
                    {elem.isFA ? <FontAwesome size={elem.size} name={elem.icon} style={[styles.boxIcon, { color: elem.color }]}></FontAwesome> :
                        <Ionicons size={elem.size} name={elem.icon} style={[styles.boxIcon, { color: elem.color }]}></Ionicons>}
                </View>
            </View>
        );
    })

    let selectedItem = boxes[selected];
    boxes.splice(selected, 1);
    boxes.push(selectedItem);

    return (
        <View style={styles.touchBoxContainer}>
            {boxes}
        </View>
    );
}


export default function Day18() {
    return (
        <SafeAreaView
            style={{ flex: 1 }}
            edges={['top', 'bottom', 'right', 'left']}
            mode="padding">
            <Sortable />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemWrapper: {
        backgroundColor: '#f3f3f3'
    },
    touchBox: {
        width: Util.size.width / 3,
        height: Util.size.width / 3,
        backgroundColor: "#fff",
        position: "absolute",
        left: 0,
        top: 0,
        borderWidth: Util.pixel,
        borderColor: "#ccc",
    },
    touchBoxContainer: {
        width: Util.size.width,
        marginTop: 0,
    },
    boxContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: Util.size.width / 3,
        height: Util.size.width / 3,
    },
    boxIcon: {
        position: "relative",
        top: -10
    },
    boxText: {
        position: "absolute",
        bottom: 15,
        width: Util.size.width / 3,
        textAlign: "center",
        left: 0,
        backgroundColor: "transparent"
    },
});
