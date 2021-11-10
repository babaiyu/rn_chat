// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAiAYJ5EBCvwWsTVSOx8Qyu5Q2D7hIZvns',
  authDomain: 'learn-socket-fdfaf.firebaseapp.com',
  databaseURL:
    'https://learn-socket-fdfaf-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'learn-socket-fdfaf',
  storageBucket: 'learn-socket-fdfaf.appspot.com',
  messagingSenderId: '131011713101',
  appId: '1:131011713101:web:ebe10ad3f562cdb8242404',
  measurementId: 'G-K8K7M2TL9F',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
