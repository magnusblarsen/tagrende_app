import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { TextInput, Button, Tooltip, IconButton, Text } from 'react-native-paper' 

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

const Signup: React.FC<Props> = ({ route, navigation }) => {
  //TODO: also have username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => console.log(error.message));
  };

  return (
      <View style={styles.container}>
        <Text variant="titleLarge">
          Hej med jer! 
        </Text> 
        <Text variant="bodyLarge" style={{marginBottom: 25}}>
          Her kan i lave en bruger. 
          Brugeren bliver lavet igennem Google, så i skal ikke være bange ift. sikkerheden,
          da det ikke er mig der står for at gemme koderne i min egen server.
        </Text>
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
          onPress={() => handleSignUp}
        >
          Signup
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
