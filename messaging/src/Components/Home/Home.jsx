import sidebar from '../Sidebar/Sidebar'
import ChatMain from '../ChatMain/ChatMain'

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