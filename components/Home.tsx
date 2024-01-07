import React, { useContext, useEffect, useRef, useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Navigation'
import { AuthContext } from '../contexts/AuthProvider'
import { Button } from 'react-native-paper'
import { UserContext } from '../contexts/UserProvider'

import * as Location from 'expo-location';
import Toast from 'react-native-root-toast'
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

// TODO: https://docs.expo.dev/versions/latest/sdk/location/ (see background location methods for requeriments)

const Home: React.FC<Props> = ({route, navigation}) => {
  const { logout, user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const { username } = useContext(UserContext)

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<String | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Tilladelse til lokation ikke givet... gå til indstillinger og fix det!');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [])

  const handleSignOut = () => {
    setLoading(true)
    logout()
      .then(() => {
        console.log('Signed out')
      })
      .finally(() => setLoading(false))
  }
  const handleLocationSharing = async () => { 
    let location = await Location.getCurrentPositionAsync()
    setLocation(location)
    if (location) {

      const userRef = doc(FIREBASE_DB, "users", user.uid)
      try {
        await updateDoc(userRef, {
          location: {
            timestamp: location.timestamp,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }
        })
        Toast.show("Så er din lokation delt!")
      } catch (error) {
        Toast.show("Kunne ikke dele lokation: " + error)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text>Email: {FIREBASE_AUTH.currentUser?.email}</Text>
      <Text>Username: {username}</Text>
      <Button
        mode='contained'
        onPress={handleSignOut}
        loading={loading}
        style={{marginTop: 20}}
      >
        Sign out
      </Button>
      <Button
        mode='contained'
        onPress={handleLocationSharing}
        style={{marginTop: 20}}
      >
        Test location
      </Button>
      <Text
        style={{marginTop: 20}}
      >{errorMsg? errorMsg: JSON.stringify(location)}</Text>
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