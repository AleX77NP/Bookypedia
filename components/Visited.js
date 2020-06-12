import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';


export default function Visited({ item }) {
  return (
      <View style={styles.container}>
          <Image style={styles.image} source={{uri: item.volumeInfo.imageLinks.thumbnail}} />
          <Text numberOfLines={1} style={styles.title}>{item.volumeInfo.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
        marginHorizontal: 5,
    },
    image: {
        height: 255,
        width: 170,
        borderWidth: 2.5,
        borderColor: '#9a0505',
        resizeMode: 'stretch'
    },
    title: {
        textAlign: 'center',
        fontFamily: 'lobster',
        width: 160,
        color: '#9a0505'
    }
})