import { useState } from 'react'
import styles from './App.module.css'
import Home from '../Home/Home'
import LandingPage from '../LandingPage/LandingPage'

function App(user) {
  //add code to check if a user is currently logged in from their local storage.
  return (
    <>
      { user && <Home /> }
      { !user && <LandingPage/> }
    </>
  )
}

export default App
