import React, { useEffect, useState } from 'react'
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { TextInput, Surface, Button } from 'react-native-paper'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

const Login: React.FC<Props> = ({ route, navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with:', user.email);
    })
    .catch(error => console.log(error.message))
  }

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Home')
      }
    }) 
    return unsubscribe
  }, [])


  
  return (
      <View style={styles.container}>
        <TextInput
          mode='outlined'          
          label='Email'
          value={email}
          onChangeText={setEmail}
          style={styles.inputContainer}
        />
        <TextInput
          mode='outlined'          
          label='Password' 
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputContainer}
        />
        <Button
          mode='contained'
          style={{width: '80%', marginTop: 10, marginBottom: 4}}
          loading={loading}
          onPress={() => handleLogin}
        >
          Login
        </Button>
        <Button
          onPress={() => navigation.navigate("Signup")}
        >
          Klik her hvis du ikke har en bruger!
        </Button>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
})

export default Login  