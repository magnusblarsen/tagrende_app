import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '../firebaseConfig';

export const AuthContext = React.createContext<any>({})

type Props = {
  children: any
}

const AuthProvider: React.FC<Props> = ({children}) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
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
        console.log(e);
      }
    },
    signup: async (email: string, password: string) => {
      try {
        return await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      } catch (e) {
        console.log(e);
      }
    },
    logout: async () => {
      try {
        await signOut(FIREBASE_AUTH)
      } catch (e) {
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
