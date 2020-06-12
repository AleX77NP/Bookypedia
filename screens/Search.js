import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View,Text,TouchableWithoutFeedback,Keyboard
  ,TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements';
import axios from 'axios'
import Book from '../components/Book'


export default function Search({ navigation }) {

  const [books,setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [empty,setEmpty] = useState(true);

onSearch = (title) => {
  setTitle(title);
  axios.request({
    method: 'get',
    url: 'https://www.googleapis.com/books/v1/volumes?q='+title
  }).then((response) => {
    setBooks(response.data.items.filter(item => item.volumeInfo.imageLinks !== undefined && 
      item.volumeInfo.authors !== undefined && item.volumeInfo.description!== undefined))
    setEmpty(false)
  }).catch((error) => {
    setEmpty(true);
    setError(error);
  });
}

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
    <SearchBar lightTheme placeholder="Search books..." 
    placeholderTextColor='#074177'
    onChangeText={onSearch}
    value = {title}
    />
    {empty? (<View></View>) : (
    <View> 
    <FlatList
      data={books}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate('BookDetails',{item})}>
      <Book item={item}/>
    </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      style={styles.list}
    /> 
    </View> )}
    </View> 
    </TouchableWithoutFeedback> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: '13%',
  },
});
