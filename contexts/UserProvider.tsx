import React, { useEffect, useState, useContext} from 'react'
import { AuthContext } from './AuthProvider'
import { collection, doc, getDoc, query, where } from 'firebase/firestore'
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig'
import Toast from 'react-native-root-toast'
import { User } from 'firebase/auth'

export const UserContext = React.createContext<any>({})

type Props = {
  children: any
}

const UserProvider: React.FC<Props> = ({children}) => {
  const [username, setUsername] = useState<String | null>(null)
  const [location, setLocation] = useState(null)

  const contextValues = {
    username,
    location,
    updateUser: async (user: User | null) => {
      if (user) {
        console.log('UserProvider: Auth state changed')
        const docRef = doc(FIREBASE_DB, "users", user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setUsername(docSnap.data().username)
        }

      } else {
        setUsername(null)
        setLocation(null)
      };

    },
  }

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider