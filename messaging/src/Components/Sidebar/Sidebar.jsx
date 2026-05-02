import styles from './Sidebar.module.css'
import { useContext } from 'react';
import { AuthContext } from '../App/App'



export default function Sidebar({numUsersOnline="0"}){
    const { user, clearLoggedInUser } = useContext(AuthContext);
    return(
        <>
            <div className={styles.userStatus}>
                <h2>{user.username}</h2>
                <h3>online</h3>
            </div>
           <button>
                <h3 id={styles.sidebarOnlinecount}>{numUsersOnline} online now</h3>
            </button>
            <button onClick={clearLoggedInUser}>
                <h3>Sign Out</h3>
            </button>
        </>
        
    )
}