import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FIREBASE_AUTH } from '../firebaseConfig'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Navigation'
import { AuthContext } from '../contexts/AuthProvider'
import { Button } from 'react-native-paper'
import { UserContext } from '../contexts/UserProvider'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home: React.FC<Props> = ({route, navigation}) => {
  const { logout } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const { username } = useContext(UserContext)

  const handleSignOut = () => {
    setLoading(true)
    logout()

      .then(() => {
        console.log('Signed out')
      })
      .finally(() => setLoading(false))
  }

  return (
    <View style={styles.container}>
      <Text>Email: {FIREBASE_AUTH.currentUser?.email}</Text>
      <Text>Username: {username}</Text>
      <Button
        onPress={handleSignOut}
      >
        Sign out
      </Button>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})