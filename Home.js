import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import Util from './view/utils';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function Home({ navigation, days }) {

    const _jumpToDay = index => {
        navigation.push(days[index].route)
    }

    const boxs = days.map(function (elem, index) {
        return (
            <TouchableHighlight key={elem.key} style={[styles.touchBox, index % 3 == 2 ? styles.touchBox2 : styles.touchBox1]} underlayColor="#eee" onPress={() => _jumpToDay(index)}>
                <View style={styles.boxContainer}>
                    <Text style={styles.boxText}>Day{index + 1}</Text>
                    {elem.isFA ? <FontAwesome size={elem.size} name={elem.icon} style={[styles.boxIcon, { color: elem.color }]}></FontAwesome> :
                        <Ionicons size={elem.size} name={elem.icon} style={[styles.boxIcon, { color: elem.color }]}></Ionicons>}
                </View>
            </TouchableHighlight>
        );
    })
    const insets = useSafeAreaInsets();

    return (
        <ScrollView style={styles.mainView} title={navigation.title} contentContainerStyle={{paddingBottom:insets.bottom}}>
            <Swiper height={150} showsButtons={false} autoplay={true}
                activeDot={<View style={{ backgroundColor: 'rgba(255,255,255,0.8)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}>
                <TouchableHighlight onPress={() => _jumpToDay(0)}>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={require('./view/img/day1.png')}></Image>
                        <Text style={styles.slideText}>Day1: Timer</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => _jumpToDay(1)}>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={require('./view/img/day2.png')}></Image>
                        <Text style={styles.slideText}>Day2: Weather</Text>
                    </View>
                </TouchableHighlight>
            </Swiper>
            <View style={styles.touchBoxContainer}>
                {boxs}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
      flexGrow:1,
    },
    mainView: {
      marginTop: 0
    },
    // navBar: {
    //   borderBottomWidth: 1,
    //   borderBottomColor: "#ddd",
    // },
    // navTitle: {
    //   paddingTop: 10,
    //   fontSize: 18,
    //   fontWeight: "500",
    // },
    // navBackBtn: {
    //   paddingTop: 10,
    //   paddingLeft: 10,
    //   fontSize: 18,
    //   color: "#555",
    // },
    itemWrapper:{
      backgroundColor: '#f3f3f3'
    },
    touchBox:{
      width: Util.size.width/3-0.33334,
      height:Util.size.width/3,
      backgroundColor:"#fff",
    },
    touchBoxContainer:{
      flexDirection: "row", 
      flexWrap:"wrap",
      width: Util.size.width,
      borderTopWidth: Util.pixel,
      borderTopColor:"#ccc",
      borderLeftWidth: Util.pixel,
      borderLeftColor:"#ccc",
      borderRightWidth: Util.pixel,
      borderRightColor:"#ccc",
    },
    touchBox1:{
      borderBottomWidth: Util.pixel,
      borderBottomColor:"#ccc",
      borderRightWidth: Util.pixel,
      borderRightColor:"#ccc",
    },
    touchBox2:{
      borderBottomWidth: Util.pixel,
      borderBottomColor:"#ccc",
      borderLeftWidth: Util.pixel,
      borderLeftColor:"#ccc",
    },
    boxContainer:{
      alignItems:"center",
      justifyContent:"center",
      width: Util.size.width/3,
      height:Util.size.width/3,
    },
    boxIcon:{
      position:"relative",
      top:-10
    },
    boxText:{
      position:"absolute",
      bottom:15,
      width:Util.size.width/3,
      textAlign:"center",
      left: 0,
      backgroundColor:"transparent"
    },
    slide: {
      flexGrow: 1,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slideText:{
      position:"absolute",
      bottom: 0,
      paddingTop:5,
      paddingBottom:5,
      backgroundColor:"rgba(255,255,255,0.5)",
      width: Util.size.width,
      textAlign:"center",
      fontSize: 12
    },
    image:{
      width: Util.size.width,
      flexGrow: 1,
      alignSelf: 'stretch',
      resizeMode: 'contain',
    }
  });

export default Home