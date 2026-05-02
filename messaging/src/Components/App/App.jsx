import { useState, createContext, useCallback, useMemo } from 'react'
import styles from './App.module.css'
import Home from '../Home/Home'
import LandingPage from '../LandingPage/LandingPage'
import createApiFetch from "../../utils/apiFetch";


function getPreviousToken() {
  return localStorage.getItem("messagingToken");
}

function getPreviousUser() {
    const storedData= localStorage.getItem("messagingUser");
    if(!storedData)
        return {};
    return JSON.parse(storedData);
}

const AuthContext = createContext();

function App() {
  //test:'test'
  const [user, setUser] = useState(getPreviousUser);
  const [token, setToken] = useState(getPreviousToken);
  //add code to check if a user is currently logged in from their local storage.
  const isLoggedIn = Object.entries(user).length > 0;

  /*
  const clearLoggedInUser = () => {
      setUser({});
      setToken('');
      localStorage.removeItem("messagingToken");
      localStorage.removeItem("messagingUser");
  }
      */

  const clearLoggedInUser = useCallback(() => {
    setUser({});
    setToken('');
    localStorage.removeItem("messagingToken");
    localStorage.removeItem("messagingUser");
}, []);

  function handleLogOut(e){
      e.preventDefault(); //prevent page refresh
      clearLoggedInUser();
      return;
  }

  const apiFetch = useMemo(
    () => createApiFetch({ token, onExpired: clearLoggedInUser }),
    [token, clearLoggedInUser]
);

  //const apiFetch = createApiFetch({ token, onExpired: clearLoggedInUser });
  return (
    <>
    <AuthContext.Provider value={{apiFetch, user, setUser, setToken, clearLoggedInUser}}>
      { 
        isLoggedIn 
        && <Home /> 
      }
      { 
        !isLoggedIn 
        && <LandingPage/> 
      }
      </AuthContext.Provider>
    </>
  )
}

export default App
export{
    AuthContext
}