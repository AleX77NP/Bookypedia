import React from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';

export default function Category({ item }) {
  return (
         <View style={styles.container}>
          <Image source={item.img} style={styles.image}/>
          <Text style={styles.title}>{item.title}</Text>
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
        marginVertical: 10,
        borderBottomColor: '#074177',
        borderBottomWidth: 4,
        borderLeftColor: '#074177',
        borderLeftWidth: 2,
      },
      image: {
         height: 165,
         width: 150,
         marginLeft: 5
      },
      title: {
          fontFamily: 'lobster',
          fontSize: 18,
          textAlign: 'center',
          color: '#9a0505',
          marginBottom: 2
      }
    });