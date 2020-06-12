import React, {useState, useContext, useCallback} from 'react';
import { StyleSheet, Text, View, TextInput , TouchableOpacity, 
  TouchableWithoutFeedback , Keyboard, Alert} from 'react-native';
import Logo from '../components/Logo'
import { AuthContext } from '../context';
import { Ionicons} from "@expo/vector-icons";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import {AsyncStorage} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'

export default function SignUp({ navigation }) {

  useFocusEffect(

    useCallback(()=>{
      let active = true;
      if(active) {
      setHidePassword(true);
  
      return () => {
        active = false;
      }
      }
    },[])
  )

  const [name,setName] = useState('');
  const [surname,setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [icon, setIcon] = useState("md-eye-off");
  const [hidePassword, setHidePassword] = useState(true)
  const {signUp} = useContext(AuthContext);

  _changeIcon = () => {
    icon !== "md-eye-off"
      ? (setIcon("md-eye-off"), setHidePassword(true))
      : (setIcon("md-eye"), setHidePassword(false))
  }

  _register = async () => {
    let data = {
      'name' : name,
      'surname': surname,
      'email': email, 
      'password': password}
    axios.request({
      method: 'post',
      url: 'https://bookypedia77.herokuapp.com/users/signup', 
      data
    }).then(async(response) => {
    try {
      await AsyncStorage.setItem('userToken',response.data.token);
      await signUp(response.data.token);
    }
    catch(e) {
      Alert.alert('Something went wrong. Please try again.');
    }

    }).catch((error) => {
      console.log(error.response.data);
    if(error.response.data.errors) Alert.alert(JSON.stringify(error.response.data.errors[0].msg));
    else {
      Alert.alert(JSON.stringify(error.response.data.msg));
    }
    });
  }
  
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View color='#49BDFC' style={styles.container}><ScrollView>
      <View>
      <Logo /></View>
      <View style={styles.containerForm}>
          <Text style={styles.join}>Join Bookypedia today.</Text>
      <TextInput style={styles.input} 
      placeholder='Enter your first name here' placeholderTextColor='#9a0505'
      keyboardType="default"
      onChangeText={setName}  />
      <TextInput style={styles.input} 
      placeholder='Enter your last name here' placeholderTextColor='#9a0505' 
      keyboardType="default"
      onChangeText={setSurname}  />
      <TextInput style={styles.input} 
      placeholder='Enter your email address here' placeholderTextColor='#9a0505'
      keyboardType="email-address"
      onChangeText={setEmail}  />
      <View style={{flexDirection: 'row'}}>
      <TextInput style={[styles.input,{marginLeft: '5%'}]} 
      placeholder='Enter your password here' placeholderTextColor='#9a0505' 
      secureTextEntry={hidePassword}
      onChangeText={setPassword} />
      <Ionicons name={icon} size={24} onPress={() => _changeIcon()} style={{top: 21, right:36}} /></View>
    <TouchableOpacity style={styles.button} onPress={_register}>
        <Text style={styles.buttonText}>Sign up</Text>
    </TouchableOpacity>
    </View>
      <View style={styles.LogInView}>
      <Text style={styles.LogInText}>Already have an account yet?</Text>
					<TouchableOpacity onPress={() => navigation.navigate('Login') }>
            <Text style={styles.LoginButton}> Sign In</Text></TouchableOpacity>
      </View></ScrollView>
      </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#49BDFC',

    },
    LogInView: {
       flexGrow: 1,
       alignItems: 'flex-end',
       justifyContent: 'center',
       flexDirection: 'row',
       paddingVertical: 16
    },
    LogInText: {
      fontSize: 16,
      color: "#ffffff",
      marginBottom: 10
    },
    LoginButton: {
      color:'#9a0505',
      fontSize:16,
      fontWeight:'600',
      marginBottom: 10
    },
    input: {
      width: 320,
      backgroundColor: 'rgba(255,255,255,0.7)',
      borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: 16,
      marginVertical: 9,
      height: 45
  },
  buttonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center'
  },
  button: {
      width: 200,
      backgroundColor: '#074177',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 16,
  },
  containerForm: {
    flexGrow: 1,
    backgroundColor: '#49BDFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0
  },
  join: {
      fontSize: 18,
      color: '#ffffff',
      textAlign: 'center',
      fontWeight: '600',
      marginVertical: 8,
      fontFamily : 'lobster'
  }
  });