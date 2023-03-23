import React from 'react';
import { StatusBar, View } from 'react-native';

import Weather from './Weather'


function Day2({ navigation }) {
    const back = () => {
        navigation.pop();
        StatusBar.setBarStyle('default');
    }
    
    return(
        <View style={{flex:1}}>
            <Weather back={back}></Weather>
        </View>
    )
}

export default Day2