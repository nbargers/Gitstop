import React, {useState} from 'react';
import { Button, Text, View, StyleSheet, Image ,TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import {Card} from 'react-native-elements';
import Navbar from '../../components/navBar';
import Name from '../../components/name';


export default ({history}) => {

const [user, setUser] = useState('JBargers');
const [repos, setRepos] = useState(3);
const [issues, setIssues] = useState(12);

return (
  <SafeAreaView style = {styles.container} >
    <Name/>
    <View style = {styles.info}>
      <Text style = {styles.textIntro}>Welcome {user}</Text>
      <View style = {styles.border}>
        <Card containerSytle = {styles.cards}>
          <View style = {styles.cards}>
            <Card.Title style = {styles.cardTitles}>Repositoires Tracked</Card.Title>
              <View>
                <Text style = {styles.cardText}>Gitstop is currently tracking {repos} repositories</Text>
              </View>
              <Card.Divider/>
              <Card.Title style = {styles.cardTitles}>Outstanding Issues</Card.Title>
              <View>
                <Text style = {styles.cardText}>Gitstop is monitoring {issues} issues</Text>
              </View>
            </View>
        </Card>
      </View>
      <View style = {styles.logoutPadding}>
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.5} onPress={() => history.push("/")}>
          <Text style={styles.TextStyle}> Logout of Gitstop </Text>
        </TouchableOpacity>
      </View>
    </View>
    <Navbar/>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#3d5a80'
},

info : {
  alignItems: 'center',
  paddingTop: 75,
},

textIntro: {
  fontSize: 40,
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: 25,
  color: '#e0fbfc'
},

cards: {
  alignItems: 'center',
},

cardTitles: {
  fontSize: 20,
},

cardText: {
  fontSize: 15
},

border: {
  shadowOffset: { height: 3, width: 3 },
  shadowColor: 'black',
  shadowOpacity: 0.5,
  shadowRadius: 5,
},

TextStyle: {
  fontSize: 20,
  padding: 5
},

logoutButton: {
  backgroundColor: '#98c1d9',
  borderRadius: 10,
  borderColor: 'black',
  shadowOffset: { height: 3, width: 3 },
  shadowColor: 'black',
  shadowOpacity: 0.5,
  shadowRadius: 5,
},

logoutPadding: {
  paddingTop: 50,
}
});