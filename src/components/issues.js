import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Modal, Alert, Pressable, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Button, Overlay, ListItem, Icon, Input} from 'react-native-elements';
import { Ionicons, Entypo, AntDesign, Foundation  } from '@expo/vector-icons'; 
import { Octokit } from "@octokit/rest";

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState([]) 
  const [text, setText] = useState("");
  const [commentText, setCommentText] =useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalID, setModalID] = useState('');

  useEffect(()=> {
    const {org, repoName, issue_number} = props
    console.log('org', org, 'repo', repoName, 'issue_number', issue_number)
    const octokit = new Octokit({
      auth: "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",
    })

    octokit.rest.issues.listComments({
      owner: org,
      repo: repoName,
      issue_number,
    })
    .then((comments)=>{
      setComments([comments]),
      console.log('comments', comments);
    })
  }, [])

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const updateText = (input) => {
    setText(input)
  };

  const updateCommentText = (input) => {
    setCommentText(input)
  };

  const replaceOldComment = () => {
    if(commentText === '') return
    const newComments = comments.map(item => {
      if(item.data[0].id === modalID){
        console.log('modalID', modalID)
        console.log('commentText', commentText)
        item.data[0].body = commentText;
        return item;
      }
      return item;
    });
    setCommentText('')
    setComments(newComments);
  };

  const deleteComment  = (id) => {
    console.log('id', id)
    setComments(comments.filter(comments => comments.data[0].id !== id))
  };

  const updateComments = (text) => {
    if(text === '') return
    setComments([...comments, {data: [{body: text, id: text}]}]);
    console.log('comments', comments)
  };
 
  return (
    <KeyboardAvoidingView behavior="padding" style = {styles.container}>
        <ListItem onPress={toggleOverlay} bottomDivider={true} style={styles.listItem}>
        <ListItem.Content style = {styles. listContent}>
            <ListItem.Title style = {styles.issueText}>{props.item.body}</ListItem.Title> 
        </ListItem.Content>
        </ListItem>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle= {styles.overlayContainer}>
          <ScrollView>
              {
                comments.map((l, i) => (
                    <ListItem key={i} bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title>{l.data[0]?.body}</ListItem.Title>
                      </ListItem.Content>
                      <View style = {styles.icons}>
                        <AntDesign id = {l.id} name="delete" size={24} color="black" style ={styles.updates} onPress = {() => deleteComment(l.data[0].id)}/>
                        <Foundation id = {l.id} name="clipboard-pencil" size={24} color="black" style ={styles.updates} onPress = {(event) => {
                          setModalID(l.data[0].id)
                          setModalVisible(true)
                          }}/>
                      </View>
                    </ListItem>
                ))
              }
            </ScrollView>
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(!modalVisible);
                    }}
                  > 
                    <View style = {styles.modalPadding}> 
                      <View style = {styles.modalBackground}>
                        <Text style = {styles.modalText}>Update Comment Below</Text>
                        <Input
                        onChangeText={updateCommentText}
                        multiline= {true}
                        />
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => {
                            replaceOldComment()
                            setModalVisible(!modalVisible) 
                          }}
                        >
                          <Text style={styles.textStyle}>Update</Text>
                        </Pressable>
                      </View>  
                    </View> 
                </Modal>
            <SafeAreaView >
              <View style = {styles.safeZone}>
                  <Input
                  placeholder="Comment"
                  onChangeText={updateText}
                  multiline= {true}
                  />
                  <Ionicons name="send" size={24} color="black" onPress = {() => {updateComments(text)}}/>
              </View>
            </SafeAreaView>
        </Overlay>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },

  listItem: {
    flex: 1,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center'
    },

  listContent: {
    alignItems: 'center',
    width: '95%',
  },

  overlayContainer: {
      height: 450,
      width: 325,
      justifyContent: 'center',
      alignItems: 'stretch',
  },

  safeZone : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 270,
  },

  separatorLine: {
    height: 1,
    backgroundColor: 'black',
    paddingTop: 2,
    width: 'auto',
  },

  items: {
    alignItems: 'stretch',
  },

  icons: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },

  updates: {
    margin: 5
  },

  issueText: {
    fontSize: 12
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },

  buttonClose: {
    backgroundColor: "#293241",
  },

  modalPadding: {
    paddingTop: 175,
    alignItems: 'center'
  },

  modalBackground: {
    backgroundColor: '#98c1d9',
    height: 'auto',
    width: 300,
    padding: 20,
    alignItems: 'center',
    borderRadius: 8,
    shadowOffset: { height: 3, width: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  modalText: {
    fontSize: 18,
    color: '#293241',
    paddingBottom: 10
  },

  textStyle: {
    color: '#e0fbfc'
  }
});


  // const updateComments = (text) => {
    //API post to comment database
    /*
    setComments([...comments, text])
    fetch(/route ){
      method: 'POST',
      headers: {
        accept: 'application/jason',
        'content-Type': application/json
      },
      body: JSON.stringify({
        id: ??
        comment: text
      })
      .then((res)=>res.json())
      .then((res) => {setComments([...comments, text])})
      .catch((error)=>{
        console.log(error)
      })
    }
    */
  // }

  // const deleteComment  = (id) =>{
  //   setComments(comments.filter(comments => comments.id !== id))
    //const ID = id
    // Alert.alert(
    //   "Alert Title",
    //   "Are you sure you want to delete the message?",
    //   [
    //     {
    //       text: "Cancel",
    //       onPress: () => Alert.alert("Cancel Pressed"),
    //       style: "cancel",
    //     },
    //     {
    //       text: "Delete",
    //       onPress: () => {
    //         setComments(comments.filter(comments => comments.id !== ID ))
    //       }
    //     }

    //   ],
    //   {
    //     cancelable: true,
    //     onDismiss: () =>
    //       Alert.alert(
    //         "This alert was dismissed by tapping outside of the alert dialog."
    //       ),
    //   }
    // );
  // }

  /*
  const editComment(id){
    fetch('route',{
      method: "put",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({
						??????
					})
				}).then(() => {
						.then(response => response.json())
						.then(result => {
							console.log("result", result),
						})
						.catch(e => console.error(e));
				});
  }
  */