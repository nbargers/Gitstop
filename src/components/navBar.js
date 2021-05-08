import React, {useState} from 'react';
import { View, StyleSheet, Button} from 'react-native';
import { Entypo, Octicons, FontAwesome } from '@expo/vector-icons'; 
import { useHistory} from "react-router-native";


export default () => {

    const history = useHistory();
    return (
      <View style = {styles.container} >
        <Entypo name = "menu" size = {24} color = "#f2f3f4" onPress={() => history.push("/home")}></Entypo>
        {/* <Octicons name = "report" size= {24} color = "#f2f3f4" onPress={() => history.push("/mentions")}></Octicons> */}
        <FontAwesome name = "user-circle" size= {24} color = "#f2f3f4" onPress={() => history.push("/user")}></FontAwesome>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderStyle: 'solid',
        backgroundColor: '#293241',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        height: 60,
        width: 475,
      },
   
  });
  