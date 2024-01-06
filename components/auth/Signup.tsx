import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { UserCredential } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation";
import { TextInput, Button, Text } from 'react-native-paper' 
import { AuthContext } from "../../contexts/AuthProvider";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig";
import Toast from "react-native-root-toast";

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

const Signup: React.FC<Props> = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const { signup } = useContext(AuthContext)
  const [username, setUsername] = useState("")


  const handleSignUp = () => {
    console.log('trying to sign up')
    setLoading(true)
    if (email === "" || password === "" || username === "") {
      Toast.show('Please fill out all fields', {
        duration: Toast.durations.LONG,
      });
      setLoading(false)
      return;
    }
    signup(email, password)
      .then((userCredentials:UserCredential) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);

        const q = query(collection(FIREBASE_DB, "users"), where("uid", "==", user.uid))
        const querySnapshot = getDocs(q).then((querySnapshot) => {
          if(querySnapshot.docs.length === 0) {
            addDoc(collection(FIREBASE_DB, "users"), {
              uid: user.uid,
              username: username,
              email: user.email,
            })
          } else {
            console.log("User already exists")
          }

        }).catch((e) => {
          console.error("Error adding document: ", e)
          Toast.show('Error connection to database: ' + e, {
            duration: Toast.durations.LONG,
          });
        })


        const docRef = addDoc(collection(FIREBASE_DB, "users"), {
          uid: user.uid,
          username: username,
        })

      }).catch((error:any) => {
        Toast.show('Request failed to send: ' + error, {
          duration: Toast.durations.LONG,
        });
        console.log(error);
      })
      .finally(() => {
        setLoading(false)
      })

  };

  return (
      <View style={styles.container}>
        <Text variant="titleLarge">
          Hej med jer! 
        </Text> 
        <Text variant="bodyLarge" style={{marginBottom: 25}}>
          Her kan i lave en bruger. 
          Brugeren bliver lavet gennem Google, så i skal ikke være bange ift. sikkerheden,
          da det ikke er mig, der står for at gemme koderne i min egen server O_o.
        </Text>
        <TextInput
          mode='outlined'          
          label='Username'
          value={username}
          onChangeText={setUsername}
          style={styles.inputContainer}
        />
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
          onPress={handleSignUp}
        >
          Sign up
        </Button>
        <Button
          onPress={() => navigation.navigate("Login")}
        >
          Klik her for at logge ind!
        </Button>
      </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
});
