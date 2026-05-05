import styles from './Sidebar.module.css'
import { useContext } from 'react';
import { AuthContext } from '../App/App'



export default function Sidebar({userChats, setSelectedChat}){
    const { user, clearLoggedInUser } = useContext(AuthContext);
    return(
        <>
            <div className={styles.userStatus}>
                <h2>{user.username}</h2>
                <h3>online</h3>
            </div>
            <div className={styles.actions}>
                {userChats.map( c => (
                    <button className={styles.chatSelection} onClick={()=>setSelectedChat(c.id)}>
                        {c.name 
                            ? c.name 
                            : `${c.users[0]}, ${c.users[1]}, and ${c.users.length - 2} others`}
                    </button>
                ))}
                <button className={styles.signout} onClick={clearLoggedInUser}>
                    <h3>Sign Out</h3>
                </button>
            </div>
        </>
        
    )
}