import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import  { useState } from 'react'
import styles from './LandingPage.module.css'



export default function LandingPage(){
    //mode 0 = default with welcome message
    //      1= Sign in
    //      2= Sign up
    const [mode, setMode] = useState(0);
    return (
        <div className={styles.landingPage}>
            <header>
                <span id={styles.logo}>
                    Heyyyyah
                </span>
                <div className={styles.authOptions}>
                    <button onClick={()=>setMode(1)}>
                        Sign In
                    </button>
                    <button onClick={()=>setMode(2)}>
                        Sign Up
                    </button>
                </div>
            </header>
            <div className={styles.content}>
                { mode === 1
                    ? <SignIn/> :
                    mode === 2
                    ? <SignUp/> :
                    <main>
                        <h1>Welcome to heyyyyah</h1>
                        <h2>The place where you get in touch with randos.</h2>
                        <button onClick={()=>setMode(1)}>
                            Get Connecting!
                        </button>
                    </main>
                }
            </div>
        </div>
    )
}