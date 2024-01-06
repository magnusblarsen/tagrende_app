import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';

const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION';


// 0 ask for permission
export const requestPermissions = async () => {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === 'granted') {
    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === 'granted') {
      console.log('Permission granted');
      startTracking()
    }
  }

};


// 1 define the task passing its name and a callback that will be called whenever the location changes
TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data, error }:any) => {
  if (error) {
    console.error(error.message);
    return;
  }
  if (data) {
    const { locations } = data;
    const [location] = locations;
    try {
      // console.log(location)
      // const url = `https://<your-api-endpoint>`;
      //TODO: post to firebase 
      // await axios.post(url, { location }); // you should use post instead of get to persist data on the backend
    } catch (err) {
      console.error(err);
    }   
  }
});
// 2 start the task
const startTracking = async () => {
  Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
    accuracy: Location.Accuracy.Highest,
    distanceInterval: 1, // minimum change (in meters) betweens updates
    timeInterval: 1000*5, // 1000*60*30, //every 30 minutes
    // foregroundService is how you get the task to be updated as often as would be if the app was open
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: 'Using your location',
      notificationBody: 'To turn off, go back to the app and switch something off.',
    },
  });
}


// 3 when you're done, stop it
// Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);

// Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION).then((value) => {
//   if (value) {
//     Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
//   }
// });