
/**
 * Day 23
 * local webview
 * D3.js
 */
'use strict';

import React from 'react';
import { StyleSheet,TouchableHighlight,Image,Text,View } from 'react-native';
import Util from './utils';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

export const Poincare = () => 
      <WebView
      originWhitelist={['*']}
        automaticallyAdjustContentInsets={false}
        source={{uri:'http://mamong.github.io/public/demo1.html'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
      />


export const Sphere = () => 
      <WebView
      originWhitelist={['*']}
        automaticallyAdjustContentInsets={false}
        source={{uri:'http://mamong.github.io/public/demo2.html'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
      />

export default function Day23({ navigation}) {
  const _show = (index) => {
    if (index) {
        navigation.navigate('Sphere')
    }else{
        navigation.navigate('Poincare')
    }
  }

    return(
      <View style={styles.menu}>
        <TouchableHighlight style={styles.btn} onPress={() => _show(0)}>
          <View>
            <Image source={require('./img/poincare.png')} style={styles.img}/>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Poincaré Disk</Text>
              <Ionicons style={styles.itemNav} name="ios-arrow-forward-outline" size={35}/>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.btn} onPress={() => _show(1)}>
          <View>
            <Image source={require('./img/sphere.jpg')} style={styles.img}/>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Sphere</Text>
              <Ionicons style={styles.itemNav} name="ios-arrow-forward-outline" size={35}/>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#ffffff"
  },
  itemWrapper:{
    backgroundColor: '#f3f3f3'
  },
  menu:{
    paddingTop:0,
    backgroundColor: "#ffffff",
    width: Util.size.width,
    height: Util.size.height,
  },
  btn:{
    height: 100,
    marginBottom:20,
    width:Util.size.width,
  },
  img:{
    height:100,
    width:Util.size.width,
    resizeMode:"cover",
  },
  textContainer:{
    height:100,
    width:Util.size.width,
    position:"absolute",
    top:0,
    left:0,
    backgroundColor:"rgba(0,0,0,0.3)",
    justifyContent:"center",
  },
  text:{
    color:"#fff",
    fontSize:25,
    fontWeight:"500",
    paddingLeft:20,
  },
  itemNav:{
    color:"#fff",
    position:"absolute",
    right:20,
    top:32
  }
});