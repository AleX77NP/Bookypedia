import React, { useState, useEffect, useContext, useCallback} from 'react';
import Visited from '../components/Visited';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, FlatList} from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from 'axios'
import { AuthContext } from '../context';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from "expo-image-manipulator";
import {AsyncStorage} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'


export default function Profile({navigation}) {

  const {signOut} = useContext(AuthContext)
  const avatar = require('../images/avatar.png');
  let isActive = true;


  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadata,setLoadata] = useState(true);
  const [user,setUser] = useState(null);


  /*useEffect(() => {
    getUserBooks();
    getPermissionAsync();
    setTimeout(() => getBooks(),3500);
    
    
  }, []);  */

  useFocusEffect(
      useCallback(() => {
        isActive = true;
       /* getUserBooks();
        getPermissionAsync();
        setTimeout(() => {
          getBooks()
        }, 3500); */
        getAll();
        
        return () => {
          isActive = false
        }
      }
      ,[])
  )

  getAll = async() => {
    await getUserBooks();
    getBooks();
    getPermissionAsync();
  }


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _logingOut = async () => {
    Alert.alert("Logout", "Are You sure that You want to logout?", [
      {
        text: "No",
        onPress: () => null,
        style: "cancel"
      },
      { text: "Yes", onPress: () => _logout() }
    ])
    return true;
  }

  _logout = async () => {
    try {
     await AsyncStorage.removeItem('userToken');

     signOut();
    }
    catch(e) {
      Alert.alert('Something went wrong.');
    }
  }


  getUserBooks = async() => {
    try {
    let uri = `https://bookypedia77.herokuapp.com/users/me`;
    const token = await AsyncStorage.getItem('userToken');
    //let niz =  new Array();
    let config = {
      headers: {
        'token' : token,
        'Content-Type' : 'application/json'
      }
    };
    const userInfo = await axios.get(uri,config);
    const person = await userInfo.data;
    if(isActive) {
    setUser(person);
    setLoading(false);
    console.log("focused");
    }

    /*if(person.markedBooks.length>0) {
       for(const isbn of person.markedBooks) {
         const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
         try {
         const book = await response.data.items[0];
         niz.push(book);
         
       }
       catch (e) {
         console.log('error');
       }
      }
       setData(niz.reverse().slice(0,6));
       setLoading(false);
    }
    else {
      setData([]);
      setLoadata(false);
    } */
  }
  catch(e) {
    Alert.alert('Something went wrong.');
  }
}

  getBooks = async() => {
    const niz = new Array();
    let counter = 0;
    let novo = new Array();
  try {
     novo = user.markedBooks.reverse();
  }
  catch(e) {
    novo = [];
  }
  
    if(novo.length>0) {
      for(const isbn of novo) {
        try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        try {
        const book = await response.data.items[0];
        niz.push(book);
        counter++;
      }
      catch (e) {
        console.log('error');
      }
      if(counter===5) break;
    }
    catch(e) {
      console.log(e);
    }
     }
     if(isActive) {
      setData(niz);
      setLoadata(false);
     }
   }
   else {
     if(isActive) {
     setData([]);
     setLoadata(false);
     }
   }
  }

  _pickImage = async () => {

    // isActive = true; sutra proveri
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      console.log('got here');
      return;
    }
    const newUri = await ImageManipulator.manipulateAsync(
      result.uri,
      [{resize :{width:220, height:240}}],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    let data = {'img': newUri.uri}

    axios.request({
      method: 'put',
      url: `https://bookypedia77.herokuapp.com/users/image/${user.email}`, 
      data
    }).then(async(response)=> {
          getUserBooks(); 
    }).catch(err=> Alert.alert('Something went wrong, please try again later.'));

  };

  return (
    <View style={{flex:1, backgroundColor: '#ffffff'}}> 
    {loading? (<View style={styles.container}><ActivityIndicator /></View>) : (
      <ScrollView>
        <View style={{alignItems: 'center',marginTop: '8%'}}>
        <View style={styles.profileImage}>
          <Image source={user.img?{uri: user.img}: avatar} style={styles.image} resizeMode="cover"></Image>
          </View>
          <View style={styles.add}>
            <TouchableOpacity onPress={_pickImage}>
            <Ionicons name="md-add-circle" size={48} color="grey" style={{ marginTop: 0, marginLeft: 0 }}></Ionicons>
            </TouchableOpacity>
             </View>
             </View>
        <View style={styles.infoContainer}>
  <Text style={[styles.text, { fontWeight: "200", fontSize: 32, fontFamily: 'lobster',color:'#9a0505' }]}>{user.name} {user.surname}</Text>
        <Text style={[styles.text, { color: "#AEB5BC", fontSize: 15 }]}>{user.email}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
  <Text style={[styles.text, { fontSize: 24}]}>{JSON.stringify(user.markedBooks.length)}</Text>
                        <Text style={[styles.text, styles.subText]}>Bookmarks</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                      
                   <Text style={[styles.text, { fontSize: 24}]}>Recently</Text>
                        <Text style={[styles.text, styles.subText]}>bookmarked</Text>
                       
                        </View>
                       
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24}]}>{user.rated}</Text>
                        <Text style={[styles.text, styles.subText]}>Rated</Text>
                    </View>
                </View>
                <View style={{borderWidth:1,marginBottom: 10}}></View>
                { loadata? (<ActivityIndicator />) : (
        <FlatList 
        showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={data}
          ListEmptyComponent={<View style={{backgroundColor: 'transparent',alignItems: 'center',height: 50}}></View>}
          renderItem={
            ({item}) => (
              <TouchableOpacity onPress={() => navigation.navigate('BookDetails', {item})}>
            <Visited item={item}/>
          </TouchableOpacity>
            )
          }
        />)}
        <View style={{borderWidth:1,marginBottom: 0,marginTop:15,width: '70%',marginLeft:'15%'}}></View>
        <View style={styles.logout}>
        <TouchableOpacity style={styles.button} onPress={_logingOut}>
        <Text style={styles.buttonText}>Log Out</Text>
    </TouchableOpacity>
    </View>
      </ScrollView> )}
      </View>
  );
        }

const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor: "#FFF",
   justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
},
  profileImage: {
    width: '45%',
    height: 195,
    overflow: "hidden",
    borderRadius: 0,
    borderWidth: 5,
    marginTop: '7%',
    borderColor: '#074177'
},
lastV: {
textAlign: 'center',
fontFamily: 'lobster',
fontSize: 28,
color: '#074177',
marginTop: 33
},
image: {
  flex: 1,
  height: '100%',
  width: '100%',
  resizeMode: 'contain'
},
add: {
  backgroundColor: "#41444B",
  width: 50,
  height: 50,
  left: 90,
  bottom: 30,
  borderRadius: 30,
  alignItems: "center",
  justifyContent: "center"
},
text: {
  fontFamily: "lobster",
  color: "#52575D",
},
subText: {
  fontSize: 14,
  color: "#074177",
  textTransform: "uppercase",
  fontWeight: "500"
},
statsContainer: {
  flexDirection: "row",
  alignSelf: "center",
  marginTop: 20,
  marginBottom: 10
},
statsBox: {
  alignItems: "center",
  flex: 1
},
button: {
  width: '30%',
  backgroundColor: '#074177',
  borderRadius: 25,
  marginVertical: 15,
  paddingVertical: 8,
},
buttonText: {
  fontSize: 18,
  fontWeight: '500',
  color: '#ffffff',
  textAlign: 'center'
},
logout :{
  alignItems: 'center',
  flex: 1,
}

});