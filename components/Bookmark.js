import React from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Bookmark({ item }) {
  return (
         <View style={styles.container}>
          <Image source={{uri: item.volumeInfo.imageLinks.thumbnail}} style={styles.image}/>
          <View style={{flexDirection: 'column'}}>
            <View>
            <Text style={styles.title} numberOfLines={1}>{item.volumeInfo.title}</Text></View>
          </View>
          </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '3%',
        marginVertical: 0,
        marginBottom: 1,
        marginTop: 7
      },
      image: {
         height: 230,
         width: 150,
         marginLeft: 5,
         borderWidth: 3,
         borderColor: '#9a0505',
         resizeMode: 'stretch'
      },
      delete: {
        left: '36%'
      },
      title: {
          fontFamily: 'lobster',
          fontSize: 18,
          textAlign: 'center',
          color: '#9a0505',
          marginBottom: 1,
          width: 150
      },
      author: {
        fontFamily: 'lobster',
        fontSize: 18,
        textAlign: 'center',
        color: '#074177',
        marginBottom: 2,
        width: 150
    }
    });