import React, { useEffect, useState } from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { signInWithEmailAndPassword } from 'firebase/auth'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

const Login: React.FC<Props> = ({ route, navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    <KeyboardAvoidingView 
      style={styles.container}
    >
      <View>
        <TextInput
          placeholder='Email' 
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder='Password' 
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

      </View>
    </KeyboardAvoidingView>
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
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})

export default Login  