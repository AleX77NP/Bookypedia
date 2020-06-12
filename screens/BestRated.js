import React ,{useContext, useState, useEffect} from 'react';
import {FlatList, TouchableOpacity, Alert, ActivityIndicator, View, StyleSheet} from 'react-native';
import Book from '../components/Book';
import axios from 'axios'


export default function BestRated({ navigation }) {

  const results = '&maxResults=40';
  const order = '&orderBy=relevance'
  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    getBooks = () => {
      axios.request({
          method: 'get',
          url: `https://www.googleapis.com/books/v1/volumes?q=a${results}${order}`
        }).then((response) => {
          if(isActive) {
          setData(response.data.items.filter(item => item.volumeInfo.imageLinks !== undefined && 
            item.volumeInfo.authors !== undefined && item.volumeInfo.description!== undefined &&
            item.volumeInfo.averageRating>3.5 ))
          setLoading(false)
          }
        }).catch((error) => {
          if(isActive) {
          setLoading(true)
          }
        });
  }
    getBooks();
    
    return () => {
      isActive = false;
    }
  }, []);


  return (
    <View style={styles.container}>
      { loading? <ActivityIndicator /> : (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate('BookDetails', {item})}>
      <Book item={item}/>
    </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      style={styles.list}
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
    },
    list: {
      marginTop: 10
    }
  });
  