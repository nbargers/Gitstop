import React from 'react';
import { View, StyleSheet, Text} from 'react-native';

import { useHistory} from "react-router-native";


export default () => {

    const history = useHistory();
    return (
      <View style = {styles.container} >
       <Text style= {styles.name}>GitStop</Text>
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
        position: 'absolute',
        width: '100%',
        paddingBottom: 15,
        paddingTop: 15,
      },

      name: {
        fontSize: 40,
        color: '#e0fbfc',
      }
   
  });
  