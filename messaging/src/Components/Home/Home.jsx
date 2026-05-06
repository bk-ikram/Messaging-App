import Sidebar from '../Sidebar/Sidebar'
import ChatMain from '../ChatMain/ChatMain'
import styles from './Home.module.css'
import { useEffect, useState, useContext } from "react"
import { getChats } from '../../api/requests'
import { AuthContext } from '../App/App'

export default function Home(){

    const [userChats, setUserChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState();
    const { apiFetch, user } = useContext(AuthContext);

    //revisit dependencies once websocket added
    useEffect(()=> {
        (async()=>{
            const chats = await getChats(apiFetch, user.id);
            setUserChats(chats);
        })();
    },[])

    return (
    <div id={styles.mainContainer}>
        <div id={styles.sidebar}>
            <Sidebar userChats={userChats} setSelectedChat={setSelectedChat}/>
        </div>
        <div id={styles.messagingContainer}>
            <ChatMain selectedChat={selectedChat}/>
        </div>
    </div>
    )
}