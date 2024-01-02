import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AuthProvider from "./contexts/AuthProvider";
import Navigation from "./Navigation";
import { requestPermissions } from "./Location";
import { RootSiblingParent } from 'react-native-root-siblings';

//https://docs.expo.dev/build/setup/

export default function App() {
  useEffect(() => {
    requestPermissions()
  }, [])

  return (
    //for react-native-root-toast
    <RootSiblingParent>
      <AuthProvider>
        <PaperProvider>
          <NavigationContainer>
            <Navigation/>
          </NavigationContainer>
        </PaperProvider>
      </AuthProvider> 
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});