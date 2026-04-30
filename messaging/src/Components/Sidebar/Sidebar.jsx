import styles from './Sidebar.module.css'

export default function Sidebar({username="username", numUsersOnline="0"}){
    return(
        <>
            <div className={styles.userStatus}>
                <h2>{username}</h2>
                <h3>online</h3>
            </div>
           <button>
                <h3 id={styles.sidebarOnlinecount}>{numUsersOnline} online now</h3>
            </button>
        </>
        
    )
}