import React,{useState,useEffect,createContext,useReducer,useMemo} from 'react';
import Login from './screens/Login'
import Home from './screens/Home'
import Bookmarks from './screens/Bookmarks'
import Bookmark from './components/Bookmark'
import CategoryList from './screens/CategoryList'
import Categories from './screens/Categories'
import NewArrivals from './screens/NewArrivals'
import BestRated from './screens/BestRated'
import Search from './screens/Search'
import SignUp from './screens/SignUp'
import BookDetails from './screens/BookDetails'
import Profile from './screens/Profile'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import { Ionicons } from '@expo/vector-icons';
import {AsyncStorage, View} from 'react-native'
import {AuthContext} from './context'
import {useIsFocused} from '@react-navigation/native'

 

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Auth = createStackNavigator();

const Main = createStackNavigator();

const Mark = createStackNavigator();

const Profiler = createStackNavigator();

const SearchN  = createStackNavigator();

const MarkNav = () => {
  return (
    <NavigationContainer independent={true}>
      
      <Mark.Navigator>
        <Mark.Screen name="Bookmarks" component={Bookmarks}
        options={{
          title: 'My Bookmarks!',
          headerStyle: {
            backgroundColor: '#074177',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '200',
            fontFamily: 'lobster',
            fontSize: 24,
            marginBottom: 2
          },
          headerTitleAlign : 'center',
         headerShown: true
        }}
         />
        <Mark.Screen name="BookDetails" component={BookDetails}
        options={{
          title: 'Read more here!',
          headerStyle: {
            backgroundColor: '#074177',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '200',
            fontFamily: 'lobster',
            fontSize: 24,
            marginBottom: 2
          },
          headerTitleAlign : 'center',
         headerShown: true
        }}
        />
      </Mark.Navigator>
    </NavigationContainer>
  )
}

const ProfileNav = () => {

  const isFocused = useIsFocused();
  return isFocused? ( 
    <NavigationContainer independent={true}>
      <Profiler.Navigator>
        <Profiler.Screen name="Profile" component={Profile}
        options={{
          title: 'My Bookmarks!',
          headerStyle: {
            backgroundColor: '#074177',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '200',
            fontFamily: 'lobster',
            fontSize: 24,
            marginBottom: 2
          },
          headerTitleAlign : 'center',
         headerShown: false
        }}
         />
        <Profiler.Screen name="BookDetails" component={BookDetails}
        options={{
          title: 'Read more here!',
          headerStyle: {
            backgroundColor: '#074177',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '200',
            fontFamily: 'lobster',
            fontSize: 24,
            marginBottom: 2
          },
          headerTitleAlign : 'center',
         headerShown: true
        }}
        />
      </Profiler.Navigator>
    </NavigationContainer> 
  ) : (<View></View>)
}


const SearchNav = () => {
  return (
    <NavigationContainer independent={true}>
      <SearchN.Navigator>
        <SearchN.Screen name="Search" component={Search}
        options={{
          title: 'My Bookmarks!',
          headerStyle: {
            backgroundColor: '#074177',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '200',
            fontFamily: 'lobster',
            fontSize: 24,
            marginBottom: 2
          },
          headerTitleAlign : 'center',
         headerShown: false
        }}
         />
        <SearchN.Screen name="BookDetails" component={BookDetails}
        options={{
          title: 'Read more here!',
          headerStyle: {
            backgroundColor: '#074177',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '200',
            fontFamily: 'lobster',
            fontSize: 24,
            marginBottom: 2
          },
          headerTitleAlign : 'center',
         headerShown: true
        }}
        />
      </SearchN.Navigator>
    </NavigationContainer>
  )
}



const AuthNav = () => {
  return (
    <NavigationContainer independent={true}>
      <Auth.Navigator>
        <Auth.Screen name="Login" component={Login}
        options={{
          title: 'Login here!',
          headerStyle: {
            backgroundColor: '#074177',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '200',
            fontFamily: 'lobster',
            fontSize: 24,
            marginBottom: 2
          },
          headerTitleAlign : 'center',
         headerShown: false
        }}
         />
        <Auth.Screen name="Signup" component={SignUp}
        options={{
          title: 'Sign up here!',
          headerStyle: {
            backgroundColor: '#074177',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '200',
            fontFamily: 'lobster',
            fontSize: 24,
            marginBottom: 2
          },
          headerTitleAlign : 'center',
         headerShown: false
        }}
        />
      </Auth.Navigator>
    </NavigationContainer>
  )
}


const HomeStack = () => {
  return(
  <NavigationContainer independent={true}>
  <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home}
       options={{
        title: 'Home Page',
        headerStyle: {
          backgroundColor: '#074177',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '200',
          fontFamily: 'lobster',
          fontSize: 24,
          marginBottom: 2
        },
        headerTitleAlign : 'center',
        headerShown: true
      }}
      />
      <Stack.Screen name="Categories" component={Categories}
       options={{
        title: 'Explore categories now!',
        headerStyle: {
          backgroundColor: '#074177',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '200',
          fontFamily: 'lobster',
          fontSize: 24,
          marginBottom: 2
        },
        headerTitleAlign : 'center',
      }}
      />

<Stack.Screen name="NewArrivals" component={NewArrivals}
       options={{
        title: 'Fresh air!',
        headerStyle: {
          backgroundColor: '#074177',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '200',
          fontFamily: 'lobster',
          fontSize: 24,
          marginBottom: 2
        },
        headerTitleAlign : 'center',
      }}
      />

<Stack.Screen name="BestRated" component={BestRated}
       options={{
        title: 'Explore the best!',
        headerStyle: {
          backgroundColor: '#074177',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '200',
          fontFamily: 'lobster',
          fontSize: 24,
          marginBottom: 2
        },
        headerTitleAlign : 'center',
      }}
      />

      <Stack.Screen name="CategoryList" component={CategoryList}
       options={{
        title: 'Explore books here!',
        headerStyle: {
          backgroundColor: '#074177',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '200',
          fontFamily: 'lobster',
          fontSize: 24,
          marginBottom: 2
        },
        headerTitleAlign : 'center',
       headerShown: true
      }}
      />
      <Stack.Screen name="BookDetails" component={BookDetails}
       options={{
        title: 'Read more here!',
        headerStyle: {
          backgroundColor: '#074177',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '200',
          fontFamily: 'lobster',
          fontSize: 24,
          marginBottom: 2
        },
        headerTitleAlign : 'center',
        headerShown: true
      }}
      />
  </Stack.Navigator>
</NavigationContainer>
);
}

const TabNav = () => {

  return (
    <NavigationContainer independent={true}>
  <Tab.Navigator
  backBehavior='none'
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused
          ? 'md-home'
          : 'md-home';
      } else if (route.name === 'Search') {
        iconName = focused ? 'md-search' : 'md-search';
      }
      else if (route.name === 'Profile') {
        iconName = focused ? 'md-person' : 'md-person';
      }
      else if (route.name === 'Bookmarks') {
        iconName = focused ? 'md-bookmarks' : 'md-bookmarks'
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
  tabBarOptions={{
    activeTintColor: '#074177',
    inactiveTintColor: 'gray',
  }}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Search" component={SearchNav}/>
    <Tab.Screen name="Bookmarks" component={MarkNav} />
    <Tab.Screen name="Profile" component={ProfileNav} />
  </Tab.Navigator>
</NavigationContainer>

  );
}

const getFonts = () => 
     Font.loadAsync({
      'lobster' : require('./assets/fonts/Lobster-Regular.ttf'),
    })

export default function App() {
  const [fontsLoaded,setFontsLoaded] = useState(false);
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
          case 'REFRESH':
          return {
            ...prevState,
            refreshed: !refreshed
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async token => {
        dispatch({ type: 'SIGN_IN', token: token});
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async token => {

        dispatch({ type: 'SIGN_IN', token: token });
      },
    }),
    []
  );


  if(fontsLoaded) {

    if (state.isLoading) {
      // We haven't finished checking for the token yet
      return <AppLoading />;
    }

  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      <Main.Navigator>
      {state.userToken == null ? (
        <Main.Screen name="AuthNav" component={AuthNav}
        options={{
          title: 'Login/Register here!',
          headerStyle: {
            backgroundColor: '#074177',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '200',
            fontFamily: 'lobster',
            fontSize: 24,
            marginBottom: 2
          },
          headerTitleAlign : 'center',
         headerShown: false
        }}
         />) : (
        <Main.Screen name="TabNav" component={TabNav}
        options={{
          title: 'Enjoy app here!',
          headerStyle: {
            backgroundColor: '#074177',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '200',
            fontFamily: 'lobster',
            fontSize: 24,
            marginBottom: 2
          },
          headerTitleAlign : 'center',
         headerShown: false
        }}
        />)}
      </Main.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  ); 
  /*return (
    <TabNav />
  ) */
  
 } 
 else {
   return (
   <AppLoading 
      startAsync={getFonts}
      onFinish={() => setFontsLoaded(true)}
   />
   );
 }
}





