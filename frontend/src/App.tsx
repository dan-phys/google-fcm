import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { initializeApp, getApp } from "firebase/app";
import { getMessaging , getToken, onMessage} from "firebase/messaging";
import {getAnalytics} from "firebase/analytics"

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBrSpSq0nhvIbV_N1UfnfAXdPSaX8V7W9U",
  authDomain: "trying-cloud-messaging.firebaseapp.com",
  projectId: "trying-cloud-messaging",
  storageBucket: "trying-cloud-messaging.firebasestorage.app",
  messagingSenderId: "214363828693",
  appId: "1:214363828693:web:1c8c2361de371926994d5c",
  measurementId: "G-2CBLGKFNS5"
};

initializeApp(firebaseConfig);
const messaging = getMessaging();
const analytics = getAnalytics();

function App() {
  const [count, setCount] = useState(0)

  function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    })}

  useEffect(() => {
    requestPermission()
  }, [])
  
  getToken(messaging, {vapidKey: "BPV9tSYS87kqnn6P2ojUHgFG_jIZ4pmG7167JnrcJSWsKiKMLsY0abzq-WMMRnRkgxWl02SUzzzQ6j13DJTN6rs"}).then((currentToken) => {
    if (currentToken) {
      const url = `https://friendly-computing-machine-67v5w4wvvjghr6vr-5000.app.github.dev/?token=${currentToken}`
      fetch(url).then(response => {
        return response.json()
      }).then(parsedResponse => console.log("RESPOSTA", parsedResponse))
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });


  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    alert(`Notification received: ${payload?.notification?.title}`);
    // ...
  })
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
