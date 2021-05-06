import React from 'react';
import { Button, Text, View, StyleSheet, Image ,TouchableOpacity, Alert} from 'react-native';
import dotenv from 'dotenv';


export default ({history}) => {

  
  const clientID = '72e3b30caf0e91e8a764';
  const url = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=repo`

  const onSubmit = async (event) => {
    // dotenv.config();
    // console.log('clientID', clientID)
    // console.log('url', url)
    // fetch(url, {
    //   mode: 'no-cors',
    //   method: 'GET',
    //   headers: {'Content-Type': 'text/html'},
    //   // body: JSON.stringify(),
    // })
    // .then((res)=> (console.log('res', res)))
    // .catch((err)=>(err))

    const res = await fetch(url, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  };

 



  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
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
    <View style= {styles.container}>
      
      <Text>Welcome to GitStop! 
       <Text>{'\n'}</Text>
        This is your teams shop to work with fixing those flats and bumps in your code. Work collaboratively and keep track of all present issues in your repositories to stay ahead of the curve. 
      </Text>
      <TouchableOpacity style={styles.loginButton} activeOpacity={0.5} onPress={onSubmit}>
        <Image 
          source={require('../github-icon.png')} 
          style={styles.ImageIconStyle} 
          />
        <Text style={styles.TextStyle}> Login Using Github </Text>

      </TouchableOpacity>
      <Button title="Home Page" onPress={() => history.push("/home")}/>
    </View> 
  );
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 100,
      marginLeft: 25,
      marginRight: 25
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
  introText: {
    height: 50,
    width: 50,
  },

  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
  
 },
  
 TextStyle :{
  
   color: "#fff",
   marginBottom : 4,
   marginRight :20,
   
 },
  
 SeparatorLine :{
  
 backgroundColor : '#fff',
 width: 1,
 height: 40
  
 }
});
