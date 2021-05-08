import React, {useState, useEffect} from 'react';
import { Button, Text, View, Image, StyleSheet, FlatList, SafeAreaView, StatusBar} from 'react-native';
import { Route, Switch, Link } from "react-router-native";
import Navbar from '../../components/navBar';
import Issues from '../../components/issues';
import Name from '../../components/name';
import { Octokit } from "@octokit/rest";

export default ({history, location}) => {

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    console.log('props', location.state)
    const octokit = new Octokit({
      auth: "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",
    })
  
    octokit
      .paginate("GET /repos/{owner}/{repo}/issues", {
        owner: location.state.org,
        repo: location.state.repoName,
      })
      .then((issues) => {
        setIssues(issues)
        console.log('issues', issues)
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style = {styles.linkItems}>
      <Issues org = {location.state.org} repoName = {location.state.repoName} issue_number = {item.number} item = {item}/>
    </View>
  );

  const SeparatorComponent = () => {
    return <View style={styles.separatorLine} />
  }

  return (
    <SafeAreaView style = {styles.container} >
      <Name/>
      <View style = {styles.info}>
      <Text style = {styles.textIntro}>Present Issues</Text>
      <SafeAreaView>
        <Switch>
          <FlatList
            data={issues}
            renderItem={renderItem}
            keyExtractor={repo => repo.id.toString()}
            ItemSeparatorComponent={SeparatorComponent}
          />
        </Switch>
      </SafeAreaView>
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
    paddingBottom: 225
  },

  textIntro: {
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 25,
    color: '#e0fbfc'
  },

  separatorLine: {
    paddingTop: 10,
  },

  issue: { 
    alignItems: 'stretch',
    width: '95%'
  },

  linkItems : {
    width: '95%',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    shadowOffset: { height: 3, width: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});