import React, { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../Navigation'
import { UserCredential } from 'firebase/auth'
import { TextInput, Button } from 'react-native-paper'
import { AuthContext } from '../../contexts/AuthProvider'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'
import Toast from 'react-native-root-toast'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

const Login: React.FC<Props> = ({ route, navigation }) => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)

  const handleLogin = () => {
    console.log('logging in...');
    setLoading(true)
    login(email, password)
    .then((userCredentials: UserCredential) => {
      const user = userCredentials.user
      console.log('Logged in with:', user.email)
    })
    .finally(() => setLoading(false))
  }
  
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
          onPress={handleLogin}
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