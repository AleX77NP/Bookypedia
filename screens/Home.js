import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';


export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={styles.select}>
        <TouchableOpacity onPress={() => navigation.navigate("Categories")}>
        <Image style = {styles.option}
        source = {require('../images/cats.png')}
        />
        </TouchableOpacity>
        </View>
        <View style={styles.select} >
            <TouchableOpacity onPress={() => navigation.navigate("NewArrivals")}> 
        <Image style = {styles.option}
        source = {require('../images/arrivals.png')}
        />
        </TouchableOpacity>
        </View> 
        <View style={styles.select}>
            <TouchableOpacity onPress={() => navigation.navigate("BestRated")}>
        <Image style = {styles.option}
        source = {require('../images/best.png')}
        /></TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  option : {
      width: '100%',
      height: '100%',
      borderWidth:5,
      borderColor: '#074177',
      marginTop: 1.5,
      resizeMode: 'stretch'
  },
  select: {
      height: '31.8%',
      width: '95%',
      marginVertical: 4,
      alignContent: 'center',
      marginLeft: '2.5%'
  }
});
