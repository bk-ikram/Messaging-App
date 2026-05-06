import styles from './ChatMain.module.css'
import { postMessage, getChatDetails } from '../../api/requests';
import { useState, useEffect, Fragment, useContext, useRef } from "react";
import { AuthContext } from '../App/App';


export default function ChatMain({selectedChat}){
    const [ chatDetails, setChatDetails ] = useState({messages:[]});
    const { apiFetch, user } = useContext(AuthContext);
    const [ formInput, setFormInput ] = useState('');
    const bottomRef = useRef(null);

    //get chat details
    useEffect(()=> {
        if(!selectedChat)
            return;
        (async()=>{
            const details = await getChatDetails(apiFetch, selectedChat);
            setChatDetails(details);
        })();
    },[selectedChat]);
    const messages = chatDetails?.messages;
    const userId = user.id;
    const unreadMessages = messages.filter(m => m.read)
    const firstUnreadMessageId = unreadMessages
                                    .sort((a,b) => new Date(a.date) - new Date(b.date))
                                        [0];
    const numUnread = unreadMessages.length;

    async function handleForm(e){
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = {...Object.fromEntries(formData.entries()), selectedChat};
        try{
            const response = await postMessage(apiFetch,formJson);
            if(response.id){
                setChatDetails(prev => ({...prev, messages: [...prev.messages,response]}))
                setFormInput('');
                //set message as sent if response is okay.
            }
        }
        catch(err){
            console.error(err.message);
        }
        
        return;
    }
    //ensure scroll to bottom when messages change.
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return(
            <>
            <div className={styles.messagesDisplay} >
                { messages.map( m => (
                    <Fragment key={m.id}>
                        {m.id === firstUnreadMessageId
                            ? <div className={styles.numUnreadNotification}>{numUnread} unread messages</div>
                            : null
                        }
                        <div
                            className={`${styles.messageBox} ${m.userId === userId ? styles.outgoing : styles.incoming}`}
                            id={`${m.id === firstUnreadMessageId ? styles.scrollMessagesto : ''}`}
                        >
                            <p className={styles.username}>{m.author.userName}</p>
                            <p className={styles.messageContent}>{m.message}</p>
                            <p className={styles.timestamp}>{m.timestamp}<span>{m.read ? '☑' : '☐'}</span></p>
                        </div>
                    </Fragment>
                )) }
                
                <div ref={bottomRef} />
            </div>
            <div className={styles.messageComposition}>
                <form onSubmit={handleForm}>
                    <input name="message" 
                            type="text" 
                            placeholder="Message..." 
                            value={formInput} 
                            onChange={(e)=>setFormInput(e.target.value)}
                    />
                    <button type="submit">⫸</button>
                </form>
            </div>
        </>
    )
}