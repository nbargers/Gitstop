import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link, Switch } from "react-router-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './Client/Containers/Home';
import Login from './Client/Containers/Login';
import Mention from './Client/Containers/Mention';
import User from './Client/Containers/User';
import Repos from './Client/Containers/Repos';
// require('dotenv').config()

const App = () => {
  return (
    <NativeRouter>
        <View style={styles.container}>
            <Route exact path="/" component={Login}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/mentions" component={Mention}></Route>
            <Route path="/user" component={User}></Route>
            <Route path="/repos/:id" component={Repos}></Route>
        </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default App;
