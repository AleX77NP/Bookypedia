import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';


export default function Logo() {
  return (
      <View style={styles.container}>
    <Image style={styles.imageS}
    source={require('../images/booky.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
       marginTop: '20%',
       marginBottom: '10%'
    },
    imageS: {
      width: 202,
      height: 244,
      resizeMode: 'contain'
    }
})