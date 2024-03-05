import { StatusBar } from 'expo-status-bar';
import React from 'react'
import Route from './Route'
import "react-native-devsettings";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Route/>
    </>
  );
}