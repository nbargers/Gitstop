import React from 'react';
import { Button, Text, View, StyleSheet, Image ,TouchableOpacity, Alert, SafeAreaView} from 'react-native';

export default ({history}) => {

  const onSubmit = (event) => {
    fetch('/api/login', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(),
    })
    .then((res)=>showAlert())
    .catch((err)=>(err))
  };


  const showAlert = () =>
  Alert.alert(
    "Alert Title",
    "My Alert Msg",
    [
      {
        text: "Cancel",
        onPress: () => Alert.alert("Cancel Pressed"),
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          "This alert was dismissed by tapping outside of the alert dialog."
        ),
    }
  );


  return (
    <SafeAreaView style= {styles.container}>
      <View style = {styles.introBox}>
        <Text style = {styles.label}>Welcome to GitStop!</Text>
        <Text style = {styles.about}>This is your teams shop to work with fixing those flats and bumps in your code. Work collaboratively and keep track of all present issues in your repositories to stay ahead of the curve. </Text>
        <TouchableOpacity style={styles.loginButton} activeOpacity={0.5} onPress={() => history.push("/home")}>
          <Image 
            source={require('../github-icon.png')} 
            style={styles.ImageIconStyle} 
            />
          <Text style={styles.TextStyle}> Login Using Github </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView> 
  );
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#293241',
      width: '100%'
    },

  loginButton: {
    backgroundColor: '#555555',
    borderRadius: 8,
    borderColor: 'black',
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    },

  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
   },
  
 TextStyle: {
   color: "#fff",
   marginBottom : 4,
   marginRight :20,
  },

  introBox: {
    height: 275,
    width: "80%",
    backgroundColor: '#98c1d9',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    shadowOffset: { height: 3, width: 3 },
    shadowColor: '#e0fbfc',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  label: {
    color: '#e0fbfc',
    fontSize: 30,
    paddingBottom: 20,
    paddingTop: 20,
  },
  
  about: {
    color: '#e0fbfc',
    fontSize: 15,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
  }
});
