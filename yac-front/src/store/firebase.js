import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyC12_RX8SCxYk5hq2nBafLP2oCjrFu3yks',
  authDomain: 'yac-meltstudio.firebaseapp.com',
  databaseURL: 'https://yac-meltstudio.firebaseio.com',
  projectId: 'yac-meltstudio',
  storageBucket: 'yac-meltstudio.appspot.com',
  messagingSenderId: '1038097325860',
  appId: '1:1038097325860:web:74d65aab35db2b684b1db1',
};
firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default firebase;
