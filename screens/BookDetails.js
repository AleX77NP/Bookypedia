import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View,Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings'
import {AsyncStorage} from 'react-native'
import axios from 'axios';
import {AuthContext} from '../context'

export default function BookDetails({ route, navigation }) {
  const {item} = route.params;
  const bmpic = require('../assets/images/bookmarkPic2.png');
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(false);

  getUser = async () => {
    try {
    let uri = `https://bookypedia77.herokuapp.com/users/me`;
    const token = await AsyncStorage.getItem('userToken');
    let config = {
      headers: {
        'token' : token,
        'Content-Type' : 'application/json'
      }
    };
    const userInfo = await axios.get(uri,config);
    const person = await userInfo.data;
    setUser(person);
  }
  catch(e) {
    Alert.alert('Something went wrong.')
  }
  }



 _bookmark = async () => {
   try {
   let isbn = item.volumeInfo.industryIdentifiers[1].identifier;
    let data = {'isbn' : isbn}
    if(user.markedBooks.includes(isbn)) {
      Alert.alert("You already bookmarked it!")
    }
    else {
    axios.request({
      method: 'put',
      url: `https://bookypedia77.herokuapp.com/users/markedbook/${user.email}`, 
      data
    }).then(async(response)=> {
          Alert.alert('Bookmarked!');
          getUser();
          
    }).catch(err=> Alert.alert('Something went wrong'));
 }
}
catch(e) {
  Alert.alert('This book is locked, cannot be bookmarked.');
}
}

_rateBook = (rating) => {
  try {
     axios.request({
       method: 'put',
       url: `https://bookypedia77.herokuapp.com/users/rate/${user.email}`,
     }).then((response)=> {
           Alert.alert('Thank You for rating this book!');
           
     }).catch(err=> Alert.alert('Something went wrong'));
 }
 catch(e) {
   Alert.alert('This book is locked, cannot be rated.');
 }
}


 useEffect(()=> {
   try{
   getUser();
   setLoading(false);
   }
   catch(e) {
     setLoading(true);
   }
 },[])

  return (
    <ScrollView contentContainerStyle={{justifyContent: 'space-between',flexGrow:1}}>{ loading? <ActivityIndicator/> : (
    <View style={styles.container}> 
       <Image source={{uri: item.volumeInfo.imageLinks.thumbnail}} style={styles.image} />
       <Text style={styles.title} numberOfLines={1}>{item.volumeInfo.title}</Text>
       <View style={styles.boomark}>
        <Text style={styles.author}>Author: {item.volumeInfo.authors[0]}</Text>
        <TouchableOpacity onPress={_bookmark}>
        <Image source={bmpic} style={styles.bmark} />
        </TouchableOpacity>
        </View>
        <View style={styles.seperator}></View>
        <View style={styles.moreDetails}>
        <Text style={styles.pages}>Page count: {item.volumeInfo.pageCount}</Text>
        <Text style={styles.date}> Release date: {item.volumeInfo.publishedDate} </Text>
        </View>
        <View style={styles.wraper}>
        <Text style={styles.text}>{item.volumeInfo.description}</Text>
        </View>
        <View style={styles.rating}>
               <Rating
                startingValue={item.volumeInfo.averageRating}
                    ratingCount={5}
                    imageSize={40}
                    onFinishRating={() => _rateBook(5)}
                    showRating
                    type='star'
                />
               </View>
        </View>)}
        </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 5
  },
  seperator: {
      borderWidth: 0.7,
      borderColor: '#41444B',
      width: '75%',
      marginVertical: 5
  },
  boomark:{
      flexDirection: 'row',
      alignContent: 'center',
  },
  bmark: {
      height: 48,
      width: 48,
      marginLeft: 10
  },
  rating : {
    marginTop:10,
    marginBottom:10
},
  moreDetails: {
    flexDirection: 'row'
  },
  pages: {
     marginVertical: 5,
     fontFamily: 'lobster',
     fontSize: 16,
     color: '#595858'
  },
  date: {
     marginVertical: 5,
     marginLeft: 14,
     fontFamily: 'lobster',
     marginBottom: 12,
     color: '#595858',
     fontSize: 16
  },
  image: {
    height: 250,
    width: 180,
    marginTop: 0,
    borderWidth: 3,
    borderColor: '#9a0505',
    resizeMode: 'stretch'
  },
  text: {
    flex:1,
    flexWrap: 'wrap',
    fontSize: 14.5,
    marginLeft: 5,
    fontWeight: '100',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'lobster',
    color: '#807E7E'
  },
  wraper: {
    width: 330
  },
  title: {
    alignSelf: 'center',
    fontSize: 22,
    fontFamily: 'lobster',
    marginTop: 5,
    color: '#9a0505',
    maxWidth: '85%'
  },
  author: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#074177',
    fontFamily: 'lobster',
    marginLeft: '11%'
}
});