import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Alert,ActivityIndicator} from 'react-native';
import Category from '../components/Category';
import {list} from '../categories/list'


export default function Categories({ navigation }) {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories();
    setLoading(false);
  }, []);
 
 getCategories = () => {
   setCategories(list);
 }
 
  return (
    <View style={styles.container}>
     {loading? <ActivityIndicator /> : (
      <FlatList
       data={categories}
       numColumns={2}
       renderItem={({item}) => (
         <TouchableOpacity onPress={() => navigation.navigate('CategoryList', {title: item.title})}>
           <Category item={item} />
         </TouchableOpacity>       
         )}
      />
     )}
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
});
