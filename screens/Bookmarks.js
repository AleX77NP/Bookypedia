import React, { useState, useEffect,useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Alert, ActivityIndicator,Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Bookmark from '../components/Bookmark'
import axios from 'axios'
import {AsyncStorage} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'

export default function Bookmarks({navigation}) {

  const [dataB,setDataB] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user,setUser] = useState(null);

  
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      getUserBooks = async() => {
        try {
        let uri = `https://bookypedia77.herokuapp.com/users/me`;
        const token = await AsyncStorage.getItem('userToken');
        let niz =  new Array();
        let config = {
          headers: {
            'token' : token,
            'Content-Type' : 'application/json'
          }
        };
        const userInfo = await axios.get(uri,config);
        const person = await userInfo.data;
        
        if(person.markedBooks.length>0) {
           for(const isbn of person.markedBooks) {
             const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
             try {
             const book = await response.data.items[0];
             niz.push(book);
           }
           catch (e) {
           }
          }
          if(isActive) {
           setDataB(niz);
           setUser(person);
           setLoading(false);
           console.log("updated");
          }
        }
        else {
          setData([]);
          setLoading(false);
        }
      }
      catch(e) {
        console.log('You have no bookmarks yet!');
      }
      }
      getUserBooks();

      return () => {
        isActive = false;
      }
    },[]),
)


  /*useEffect(
    () => {
      const unsubscribe = navigation.addListener('focus',() => {
        getUserBooks();
      });
      return unsubscribe;
    },[navigation]
  )

  useEffect(
    () => {
      try {
        getUserBooks();
      }
      catch(e) {
        setLoading(true);
      }
    },[]
  )
*/


  

  removeMark = async (item) => {
    try {
    let isbn = item.volumeInfo.industryIdentifiers[1].identifier;
    let data = {'isbn' : isbn}
    var lista = [...dataB];
    var indeks = lista.indexOf(item);
    lista.splice(indeks,1);
     setDataB(lista);

    axios.request({
      method: 'put',
      url: `https://bookypedia77.herokuapp.com/users/removemark/${user.email}`, 
      data
    }).then(async(response)=> {
        console.log(response);
    }).catch(err => console.log('Something went wrong' + err));
  }
  catch(e) {
    Alert.alert('Something went wrong. Please try again later.');
  }
}

  
  return (
    
    <View style={styles.container}>
      { loading? <ActivityIndicator /> : (
        <FlatList 
        showsVerticalScrollIndicator={false}
         data={dataB}
         keyExtractor={(item, index) => index.toString()}
         numColumns={2}
         ListEmptyComponent={<View style={styles.container}><Text style={{fontFamily: 'lobster',fontSize: 22,color: '#9a0505', marginTop: 10}}>List is empty for now!</Text></View>}
         renderItem={
          ({item}) => (
            <View>
            <TouchableOpacity onPress={() => navigation.navigate('BookDetails', {item})}>
          <Bookmark item={item}/>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => removeMark(item)}>
        <Image source={require('../images/delete.png')} style={styles.delete}/>
        </TouchableOpacity>
        </View>
          )
         }
         /> )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow:1
  },
  delete: {
    left: '38%',
   
  }
});