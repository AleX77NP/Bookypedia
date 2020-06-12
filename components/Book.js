import React from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';

export default function Book({ item }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.volumeInfo.imageLinks.thumbnail}} style={styles.image} />
      <View>
        <View style={{width: '95%'}}>
        <Text style={styles.title} numberOfLines={1}>{item.volumeInfo.title}</Text></View>
        <Text style={styles.author}>{item.volumeInfo.authors[0]}</Text>
        <View style={{width: '95%'}}>
        <Text numberOfLines={3} style={styles.text}>{item.volumeInfo.description}</Text></View>
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'left',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth:1.8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius:0,
    borderColor: '#074177',
    maxWidth: '96%'
  },
  image: {
    height: '100%',
    width: 70,
  },
  text: {
    flex:1,
    flexWrap: 'wrap',
    fontSize: 13.5,
    marginLeft: 8,
    textAlign: 'left',
    fontFamily: 'lobster',
    color: '#696868',
    maxWidth: '90.5%'
  },
  title: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'lobster',
    color: '#074177',
    marginTop: 1.5,
    maxWidth: '85%'
  },
  author: {
    alignSelf: 'center',
    fontSize: 15,
    color: '#9a0505',
    fontFamily: 'lobster'
}}
);