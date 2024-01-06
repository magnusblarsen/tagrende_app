import React, { useEffect, useState, useContext} from 'react'
import { AuthContext } from './AuthProvider'
import { collection, getDocs, query, where } from 'firebase/firestore'
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
    updateUser: (user: User | null) => {
      if (user) {
        console.log('UserProvider: Auth state changed')
        const q = query(collection(FIREBASE_DB, "users"), where("uid", "==", user.uid))
        const querySnapshot = getDocs(q).then((querySnapshot) => {
          if(querySnapshot.docs.length === 0) {
            Toast.show('No user info found', {
              duration: Toast.durations.LONG,
            });
          } else {
            const doc = querySnapshot.docs[0]
            console.log(doc.data())
            setUsername(doc.data().username)
          }
        })
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