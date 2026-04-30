import Sidebar from '../Sidebar/Sidebar'
import ChatMain from '../ChatMain/ChatMain'
import styles from './Home.module.css'

export default function Home(){
    return (
    <div id={styles.mainContainer}>
        <div id={styles.sidebar}>
            <Sidebar/>
        </div>
        <div id={styles.messagingContainer}>
            <ChatMain/>
        </div>
    </div>
    )
}