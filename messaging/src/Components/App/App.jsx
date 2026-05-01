import { useState } from 'react'
import styles from './App.module.css'
import Home from '../Home/Home'
import LandingPage from '../LandingPage/LandingPage'

function App() {
  //test:'test'
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  //add code to check if a user is currently logged in from their local storage.
  const isLoggedIn = Object.entries(user).length > 0;

  return (
    <>
      { isLoggedIn && <Home /> }
      { !isLoggedIn && <LandingPage/> }
    </>
  )
}

export default App
