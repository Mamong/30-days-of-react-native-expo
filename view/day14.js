import { useCallback, useEffect, useState,memo } from "react";
import { StatusBar, StyleSheet, Text, View, Image } from 'react-native';

import Util from './utils';
import { Ionicons } from '@expo/vector-icons';

import SwipeCards from 'react-native-swipe-cards';
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

const Card = ({ top, left, width, img, name }) =>
    <View style={[styles.card, { top, width, left }]}>
        <Image style={{ width: width - 2, height: 350 }} source={{ uri: img }}></Image>
        <View style={styles.cardInfo}>
            <View>
                <Text style={styles.cardText}>{name}, very old  <Ionicons name="ios-checkmark-circle" size={18} color="#208bf6"></Ionicons></Text>
            </View>
            <View style={styles.cardIcon}>
                <View style={styles.cardIconContainer}>
                    <Ionicons name="ios-people" size={25} color="#fc6b6d"></Ionicons>
                    <Text style={[styles.cardIconText, { color: "#fc6b6d" }]}>0</Text>
                </View>
                <View style={styles.cardIconContainer}>
                    <Ionicons name="ios-book" size={25} color="#cecece"></Ionicons>
                    <Text style={[styles.cardIconText, { color: "#cecece" }]}>0</Text>
                </View>
            </View>
        </View>
    </View>


const SCard = ({ id, top, width, img, name }) =>
    <View key={id} style={[styles.scard, { top, width }]}>
        <Image style={{ width: width - 2, height: 350 }} source={{ uri: img }}></Image>
        <View style={styles.cardInfo}>
            <View>
                <Text style={styles.cardText}>{name}, very old  <Ionicons name="ios-checkmark-circle" size={18} color="#208bf6"></Ionicons></Text>
            </View>
            <View style={styles.cardIcon}>
                <View style={styles.cardIconContainer}>
                    <Ionicons name="ios-people" size={25} color="#fc6b6d"></Ionicons>
                    <Text style={[styles.cardIconText, { color: "#fc6b6d" }]}>0</Text>
                </View>
                <View style={styles.cardIconContainer}>
                    <Ionicons name="ios-book" size={25} color="#cecece"></Ionicons>
                    <Text style={[styles.cardIconText, { color: "#cecece" }]}>0</Text>
                </View>
            </View>
        </View>
    </View>

const SwipeCard = memo(({ next }) => {
    const simgs = ["minion1", "minion2", "minion3", "minion4", "minion5"];
    // const simgs = ["https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif","https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif","https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif","https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif","https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif"];
    const names = ["Stuart", "Bob", "Kevin", "Dave", "Jerry"];
    const cards = simgs.map(function (elem, index) {
        return { 
            id: "sc" + index, img: simgs[4 - index], 
            name: names[4 - index], 
            top: 13 + index * 4, 
            width: Util.size.width - 22 - index * 4, 
        }
    })

    return (

        <SwipeCards
            cards={cards}
            renderCard={(cardData) => <SCard key={cardData.id} {...cardData} />}
            handleYup={next}
            handleNope={next}
            showYup={false}
            showNope={false}
        />
    )
})

const Cards = () => {

    const [imgs, setImgs] = useState(["minion1", "minion2", "minion3", "minion4"])
    const names = ["Stuart", "Bob", "Kevin", "Dave", "Jerry"];

    useEffect(() => {
        StatusBar.setBarStyle("light-content");
    })

    const next = useCallback(() => {
        setImgs(arr => arr.slice(0, arr.length - 1))
    }, [])

    const cards = imgs.map(function (elem, index) {
        return <Card
            key={index}
            name={names[index]}
            img={elem} top={30 - index * 4}
            width={Util.size.width - 38 + index * 4}
            left={18 - index * 2}></Card>
    });

    return (
        <View>
            {cards}
            <SwipeCard next={next}></SwipeCard>
        </View>
    )
}

export default function Day14() {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>

            <View style={[styles.nav, { paddingTop: insets.top, height: 44 + insets.top }]}>
                <Ionicons name="ios-settings" size={35} color="#cecece"></Ionicons>
                <Image style={styles.logo} source={{ uri: 'tinder' }}></Image>
                <Ionicons name="ios-chatbubbles" size={35} color="#cecece"></Ionicons>
            </View>

            <View style="position:relative;">
                <View style={styles.actionContainer}>
                    <View style={[styles.smallAction, { left: 5 }]}>
                        <Ionicons name="ios-refresh" color="#fdcd6d" size={30}></Ionicons>
                    </View>
                    <View style={styles.largeAction}>
                        <Ionicons name="md-close" color="#fc6c6e" size={45}></Ionicons>
                    </View>
                    <View style={styles.largeAction}>
                        <Ionicons name="md-heart" color="#52cb93" size={45}></Ionicons>
                    </View>
                    <View style={[styles.smallAction, { right: 5 }]}>
                        <Ionicons name="ios-pin" color="#318ff6" size={30}></Ionicons>
                    </View>
                </View>
                <Cards />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: Util.size.height,
        width: Util.size.width
    },
    nav: {
        width: Util.size.width,
        flexDirection: "row",
        justifyContent: "space-between",
        // height: 60,
        // paddingTop: 20,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "#fff",
        borderBottomColor: "#ebebeb",
        borderBottomWidth: 1
    },
    card: {
        width: Util.size.width - 20,
        height: 410,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#e1e1e1",
        position: "absolute",
        left: 10,
        top: 70,
        backgroundColor: "#fff"
    },
    scard: {
        width: Util.size.width - 20,
        height: 410,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#e1e1e1",
        position: "relative",
        backgroundColor: "#fff",
        top: 13
    },
    logo: {
        width: 91,
        height: 39
    },
    cardInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 60,
        paddingLeft: 20,
        paddingRight: 5
    },
    cardText: {
        fontSize: 20,
        fontWeight: "500",
        color: "#423e39"
    },
    cardIcon: {
        flexDirection: "row"
    },
    cardIconContainer: {
        width: 50,
        flexDirection: "row",
        alignItems: "center",
    },
    cardIconText: {
        paddingLeft: 5,
        fontWeight: "500",
        fontSize: 16
    },
    actionContainer: {
        display: "flex",
        paddingLeft: 7.5,
        paddingRight: 7.5,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        top: 480,
        left: 0,
        right: 0,
        position: "absolute",
    },
    smallAction: {
        width: Util.size.width === 375 ? 70 : 60,
        height: Util.size.width === 375 ? 70 : 60,
        borderColor: "#f5f5f5",
        borderWidth: 10,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        paddingTop: 5
    },
    largeAction: {
        width: Util.size.width === 375 ? 110 : 100,
        height: Util.size.width === 375 ? 110 : 100,
        borderColor: "#f5f5f5",
        borderWidth: 10,
        borderRadius: 55,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 5
    },
});