// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'albertus-1cde3',
    appId: '1:345907086056:web:811fe54beb1a37cc38bf5d',
    storageBucket: 'albertus-1cde3.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyBqMsaQcOrAwUUhPwNqDV_wtQ7RKfyq7Wo',
    authDomain: 'albertus-1cde3.firebaseapp.com',
    messagingSenderId: '345907086056',
  },
  production: false,
  urlBase:'http://localhost:9091/',
  urlBaseView:'http://localhost:9092/',
  urlWebSocket: 'ws://localhost:8081/retrieve'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
