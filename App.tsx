import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AuthProvider from "./contexts/AuthProvider";
import Navigation from "./Navigation";


export default function App() {
  return (
      <AuthProvider>
        <PaperProvider>
          <NavigationContainer>
            <Navigation/>
          </NavigationContainer>
        </PaperProvider>
      </AuthProvider> 
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