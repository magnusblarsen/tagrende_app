import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useEffect, useState, useRef, useContext} from 'react'
import { FIREBASE_AUTH } from '../firebaseConfig';
import Toast from 'react-native-root-toast';
import { UserContext } from './UserProvider';

export const AuthContext = React.createContext<any>({})

type Props = {
  children: any
}

const AuthProvider: React.FC<Props> = ({children}) => {
  const [user, setUser] = useState<User | null>(null)
  const { updateUser } = useContext(UserContext)

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      console.log('Auth state changed')
      updateUser(user)
      
      if (user) {
        setUser(user) 
      } else {
        setUser(null)
      };
    })

    return unsubscribe

  }, []);


  const contextValues = {
    user,
    setUser,
    login: async (email: string, password: string) => {
      try {
        return await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      } catch (e) {
        Toast.show('Request failed to send: ' + e, {
          duration: Toast.durations.LONG,
        });
        console.log(e);
      }
    },
    signup: async (email: string, password: string) => {
      return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    },
    logout: async () => {
      try {
        await signOut(FIREBASE_AUTH)
      } catch (e) {
        Toast.show('Request failed to send: ' + e, {
          duration: Toast.durations.LONG,
        });
        console.log(e);
      }
    },
    
  }

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider
