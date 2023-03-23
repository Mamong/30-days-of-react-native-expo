import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "./Home";
import Day1 from './view/day1'; //bug when not stop then exit
import Day2 from './view/day2';
import Day3 from './view/day3';
import Day4 from './view/day4'; //to update to groupon
import Day5 from './view/day5';
import Day6 from './view/day6'; //to update; RN video bug
import Day7 from './view/day7';
import Day8 from './view/day8';  //update animation
import Day9 from './view/day9';
import Day10 from './view/day10';
import Day11 from './view/day11'; //to be fixed
import Day12 from './view/day12'; // update to google inbox
import Day13 from './view/day13';
import Day14 from './view/day14';
import Day15 from './view/day15'; //to update to snapchat
import Day16 from './view/day16';
import Day17 from './view/day17';
import Day18 from './view/day18';
import Day19 from './view/day19';
import Day20 from './view/day20';
import Day21 from './view/day21';
import Day22 from './view/day22';
import Day23 from './view/day23';
import Day24 from './view/day24';
import Day25 from './view/day25'; // to update imessage UI
import Day26 from './view/day26'; // to update imessage UI
import Day27 from './view/day27';
import Day28 from './view/day28';
import Day29 from './view/day29'; //to update
import Day30 from './view/day30';


const days = [
    {
        key:0,
        route:'Day1',
        title:"A stopwatch",
        component: Day1,
        isFA: false,
        icon: "ios-stopwatch",
        size: 48,
        color: "#ff856c",
        hideNav: false,
    },{
        key:1,
        route:'Day2',
        title:"A weather app",
        component: Day2,
        isFA: false,
        icon: "ios-partly-sunny",
        size:60,
        color:"#90bdc1",
        hideNav: true,
      },{
        key:2,
        route:'Day3',
        title:"twitter",
        component: Day3,
        isFA: false,
        icon: "logo-twitter",
        size:50,
        color:"#2aa2ef",
        hideNav: true,
      },{
        key:3,
        route:'Day4',
        title:"cocoapods",
        component: Day4,
        isFA: true,
        icon: "contao",
        size:50,
        color:"#FF9A05",
        hideNav: false,
      },{
        key:4,
        route:'Day5',
        title:"find my location",
        component: Day5,
        isFA: false,
        icon: "md-pin",
        size:50,
        color:"#00D204",
        hideNav: false,
      },{
        key:5,
        route:'Day6',
        title:"Spotify",
        component: Day6,
        isFA: true,
        icon: "spotify",
        size:50,
        color:"#777",
        hideNav: true,
      },{
        key:6,
        route:'Day7',
        title:"Moveable Circle",
        component: Day7,
        isFA: false,
        icon: "ios-baseball",
        size:50,
        color:"#5e2a06",
        hideNav: true,
      },{
        key:7,
        route:'Day8',
        title:"Swipe Left Menu",
        component: Day8,
        isFA: true,
        icon: "google",
        size:50,
        color:"#4285f4",
        hideNav: true,
      },{
        key:8,
        route:'Day9',
        title:"Twitter Parallax View",
        component: Day9,
        isFA: true,
        icon: "twitter-square",
        size:50,
        color:"#2aa2ef",
        hideNav: true,
      },{
        key:9,
        route:'Day10',
        title:"Tumblr Menu",
        component: Day10,
        isFA: false,
        icon: "logo-tumblr",
        size:50,
        color:"#37465c",
        hideNav: true,
      },{
        key:10,
        route:'Day11',
        title:"OpenGL",
        component: Day11,
        isFA: false,
        icon: "md-contrast",
        size:50,
        color:"#2F3600",
        hideNav: false,
      },{
        key:11,
        route:'Day12',
        title:"charts",
        component: Day12,
        isFA: false,
        icon: "ios-stats-chart",
        size:50,
        color:"#fd8f9d",
        hideNav: false,
      },{
        key:12,
        route:'Day13',
        title:"tweet",
        component: Day13,
        isFA: false,
        icon: "md-chatbox",
        size:50,
        color:"#83709d",
        hideNav: true,
      },{
        key:13,
        route:'Day14',
        title:"tinder",
        component: Day14,
        isFA: true,
        icon: "fire",
        size:50,
        color:"#ff6b6b",
        hideNav: true,
      },{
        key:14,
        route:'Day15',
        title:"Time picker",
        component: Day15,
        isFA: false,
        icon: "ios-calendar-outline",
        size:50,
        color:"#ec240e",
        hideNav: false,
      },{
        key:15,
        route:'Day16',
        title:"Gesture unlock",
        component: Day16,
        isFA: false,
        icon: "ios-lock-open",
        size:50,
        color:"#32A69B",
        hideNav: true,
      },{
        key:16,
        route:'Day17',
        title:"Fuzzy search",
        component: Day17,
        isFA: false,
        icon: "md-search",
        size:50,
        color:"#69B32A",
        hideNav: false,
      },{
        key:17,
        route:'Day18',
        title:"Sortable",
        component: Day18,
        isFA: false,
        icon: "md-move",
        size:50,
        color:"#68231A",
        hideNav: true,
      },{
        key:18,
        route:'Day19',
        title:"TouchID to unlock",
        component: Day19,
        isFA: false,
        icon: "ios-log-in",
        size:50,
        color:"#fdbded",
        hideNav: true,
      },{
        key:19,
        route:'Day20',
        title:"Single page Reminder",
        component: Day20,
        isFA: false,
        icon: "ios-list-outline",
        size:50,
        color:"#68d746",
        hideNav: true,
      },{
        key:20,
        route:'Day21',
        title:"Multi page Reminder",
        component: Day21,
        isFA: false,
        icon: "ios-newspaper-outline",
        size:50,
        color:"#fe952b",
        hideNav: true,
      },{
        key:21,
        route:'Day22',
        title:"Google Now",
        component: Day22,
        isFA: false,
        icon: "ios-mic-outline",
        size:50,
        color:"#4285f4",
        hideNav: true,
      },{
        key:22,
        route:'Day23',
        title:"Local WebView",
        component: Day23,
        isFA: true,
        icon: "safari",
        size:50,
        color:"#23bfe7",
        hideNav: false,
      },{
        key:23,
        route:'Day24',
        title:"Youtube scrollable tab",
        component: Day24,
        isFA: false,
        icon: "logo-youtube",
        size:50,
        color:"#e32524",
        hideNav: true,
      },{
        key:24,
        route:'Day25',
        title:"custome in-app browser",
        component: Day25,
        isFA: false,
        icon: "ios-globe",
        size:50,
        color:"#00ab6b",
        hideNav: true,
      },{
        key:25,
        route:'Day26',
        title:"swipe and switch",
        component: Day26,
        isFA: false,
        icon: "md-shuffle",
        size:50,
        color:"#893D54",
        hideNav: true,
      },{
        key:26,
        route:'Day27',
        title:"iMessage Gradient",
        component: Day27,
        isFA: false,
        icon: "ios-chatbubbles",
        size:50,
        color:"#248ef5",
        hideNav: false,
      },{
        key:27,
        route:'Day28',
        title:"iMessage image picker",
        component: Day28,
        isFA: false,
        icon: "md-images",
        size:50,
        color:"#f5248e",
        hideNav: true,
      },{
        key:28,
        route:'Day29',
        title:"3d touch",
        component: Day29,
        isFA: false,
        icon: "ios-navigate",
        size:50,
        color:"#48f52e",
        hideNav: false,
      },{
        key:29,
        route:'Day30',
        title:"Push Notifications",
        component: Day30,
        isFA: false,
        icon: "md-notifications",
        size:50,
        color:"#f27405",
        hideNav: false,
      }
]

const Stack = createStackNavigator();

export default function Route() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{title: "30 Days of RN"}}>
            {props => <Home {...props} days={days} />}
          </Stack.Screen>
          {days.map(item => (
            <Stack.Screen 
              key={item.key} 
              name={item.route} 
              component={item.component}
              options={{title: item.title, 
                headerShown: !item.hideNav,
                headerBackTitleVisible: false}}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }