import React, {useState, useEffect} from 'react';
import { Button, Text, View, Image, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import { Route, Switch, Link } from "react-router-native";
import Navbar from '../../components/navBar';
import Name from '../../components/name';
import { Octokit } from "@octokit/rest";

export default ({history}) => {

  const [repos, setRepos] = useState([]);
  
  useEffect(() => {
  const octokit = new Octokit({
    auth: "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",
  })
  
  octokit.rest.repos
    .listForOrg({
      org: "open-source-labs",
      type: "public",
    })
    .then(({ data }) => {
      setRepos(data);
      console.log('data', data)
    });
  }, []);

  const renderItem = ({ item }) => (
      <Link child = {item.name} to={{ pathname: `/repos/:${item.id}`, state: {repoName: item.name, org: item.owner.login}}} underlayColor="#f0f4f7" style = {styles.linkItems}>
        <Text style = {styles.linkText}>{item.name}</Text>
      </Link>
  );

  const SeparatorComponent = () => {
    return <View style={styles.separatorLine} />
  }

  return (
    <SafeAreaView style = {styles.container}>
      <Name/>
      <View style = {styles.info}>
        <Text style = {styles.textIntro}>Your Repositories</Text>
        <SafeAreaView>
          <Switch>
            <FlatList
              data={repos}
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

  linkItems : {
    width: 250,
    padding: 20,
    borderWidth: 1,
    backgroundColor: 'white',
    shadowOffset: { height: 3, width: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
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

  linkText: {
    fontSize: 20
  }
});


