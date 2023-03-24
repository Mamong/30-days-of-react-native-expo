/**
 * Day 21
 * 
 */
'use strict';

import React, { useState } from 'react';
import { Image, StyleSheet, Text, StatusBar, TouchableHighlight, LayoutAnimation, View } from 'react-native';
import Util from './utils';
import { ReminderContainer } from './day20';
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function Day21() {

    const listData = [{
        title: "Scheduled",
        theme: "#979797",
        list: [],
    }, {
        title: "Movie",
        theme: "#cb7adf",
        list: [],
    }, {
        title: "Work",
        theme: "#f9005f",
        list: [],
    }, {
        title: "Home",
        theme: "#00a8f4",
        list: [],
    }, {
        title: "Reminder",
        theme: "#68d746",
        list: [],
    }, {
        title: "Development",
        theme: "#fe952b",
        list: [{
            selected: false,
            text: "day20",
        }, {
            selected: false,
            text: "day21",
        }, {
            selected: false,
            text: "day22",
        }, {
            selected: false,
            text: "day23",
        }, {
            selected: false,
            text: "day24",
        }, {
            selected: false,
            text: "day25",
        }],
    }];

    const animations = {
        duration: 200,
        create: {
            type: LayoutAnimation.Types.linear,
        },
        update: {
            type: LayoutAnimation.Types.linear,
            springDamping: 0.5,
        },
    };

    const [isOn, setIsOn] = useState(Array(listData.length).fill(false))
    const [init, setInit] = useState(true)

    const _switch = (index) => {
        const isOn = listData.map(() => {
            return false;
        });
        isOn[index] = true;
        setIsOn(isOn)
        setInit(false)
        LayoutAnimation.configureNext(animations);
    }

    const _reset = () => {
        const isOn = listData.map(() => {
            return false;
        });
        setIsOn(isOn)
        setInit(true)
        LayoutAnimation.configureNext(animations);
    }

    const insets = useSafeAreaInsets();
    const top = 20 + insets.top*0
    const len = listData.length;
    const lists = listData.map((elem, index) => {
        return <ReminderContainer
            onSwitch={() => _switch(index)}
            key={"list" + index}
            listData={elem}
            listStyle={init ? { top: top + index * 65 } : { top: isOn[index] ? top : Util.size.height + 5 * index - 5 * len }} />;
    })

    return (
        <View style={styles.container}>
            <Image source={require('./img/desktop.png')} style={styles.container}>
            </Image>
            {lists}
            <TouchableHighlight underlayColor="transparent" style={styles.reset} onPress={_reset}>
                <View></View>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Util.size.height,
        width: Util.size.width,
    },
    reset: {
        height: 30,
        width: Util.size.width,
        position: "absolute",
        bottom: 0,
        left: 0,
    }
});