import React, {useState, useEffect} from 'react';
import { Button, Text, View, Image, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import { Route, Switch, Link } from "react-router-native";
import Navbar from '../../components/navBar';
import Issues from '../../components/issues';

export default ({history}) => {

  const [issues, setIssues] = useState([{id:'This is the first Repo', body: 'this is test 1'},{id:'This is the second Repo', body: 'this is test 2'},{id:'This is the third Repo', body: 'this is test 3'}]);

  useEffect(() => {
    //api call for individual issues
  });

  const renderItem = ({ item }) => (
    <Issues id ={item.id} item = {item}/>
  );

  const SeparatorComponent = () => {
    return <View style={styles.separatorLine} />
  }

  return (
    <View style = {styles.container} >
      <Image></Image>
      <Text style = {styles.textIntro}>Your Repositories</Text>
      <SafeAreaView style = {styles.linkList}>
        <Switch>
          <FlatList
            data={issues}
            renderItem={renderItem}
            keyExtractor={repo => repo.id}
            // ItemSeparatorComponent={SeparatorComponent}
          />
        </Switch>
      </SafeAreaView>
      <Button title="Login Page" onPress={() => history.push("/")} />
      <Text>Home!</Text>
      <Navbar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
    width: 'auto',
  },
  linkList: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
    // marginTop: StatusBar.currentHeight || 0,
  },
  linkItems : {
    fontSize: 25,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 'auto'
  },
  textIntro: {
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 25,
  },
  separatorLine: {
    height: 1,
    backgroundColor: 'black',
    paddingTop: 2,
    width: 'auto',
  }
});