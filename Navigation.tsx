import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FIREBASE_AUTH } from './firebaseConfig';
import { AuthContext } from './contexts/AuthProvider';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';


export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  // EX:  Profile: { userId: string };
}

const Stack = createNativeStackNavigator<RootStackParamList>() 

const Navigation = () => {
  const { setUser, user } = useContext(AuthContext)
  const [navUser, setNavUser] = useState(null)

  useEffect(() => {
    console.log('setting nav user to', user);
    setNavUser(user)
    
  }, [user])



  return (
    <Stack.Navigator initialRouteName="Signup">
      {(navUser) ? (
          <>
            <Stack.Screen name="Home" component={Home}/>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Signup" component={Signup}/>
          </>
        )}
    </Stack.Navigator>
  )
}

export default Navigation