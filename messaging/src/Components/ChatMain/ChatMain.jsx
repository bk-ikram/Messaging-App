import styles from './ChatMain.module.css'
import { postMessage, getChatDetails } from '../../api/requests';
import { useState, useEffect, Fragment, useContext, useRef } from "react";
import { AuthContext } from '../App/App';
import { io } from "socket.io-client";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime);



export default function ChatMain({selectedChat}){
    const [ chatDetails, setChatDetails ] = useState({messages:[]});
    const { apiFetch, user, token } = useContext(AuthContext);
    const [ formInput, setFormInput ] = useState('');
    const bottomRef = useRef(null);
    const socketRef = useRef(null);


    //connect to socket and detect incoming messages from socket server
    useEffect(() => {
        socketRef.current = io("http://localhost:3000", {
            auth: {
                token: token
            }
        });

        socketRef.current.on("new_message", (data) => {
            console.log("Message received through socket:")
            console.log(data);
            //add to messages state
            addMessageToState(data);
        })

        return () => {
            socketRef.current.disconnect();
        } 
    }, []);


    //get chat details
    useEffect(()=> {
        if(!selectedChat || !socketRef.current)
            return;
        (async()=>{
            const details = await getChatDetails(apiFetch, selectedChat);
            setChatDetails(details);
        })();

        //Next, join the room from socket.io
        socketRef.current.emit("join_room", selectedChat);

        return () => {
            socketRef.current.emit('leave_room', selectedChat);
        }
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
                //setChatDetails(prev => ({...prev, messages: [...prev.messages,response]}))
                addMessageToState(response);
                setFormInput('');
                //set message as sent if response is okay.
            }
        }
        catch(err){
            console.error(err.message);
        }
        
        return;
    }

    function addMessageToState(response){
        //deduplicate message, in case message is sent back to sender via socket emit.
        setChatDetails(prev => {
            if(prev.messages.some(m => m.id === response.id))
                return prev;
            return ({
                ...prev,
                 messages: [...prev.messages,response]
            })
    })
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
                            className={`${styles.messageBox} ${m.author.id === userId ? styles.outgoing : styles.incoming}`}
                            id={`${m.id === firstUnreadMessageId ? styles.scrollMessagesto : ''}`}
                        >
                            <p className={styles.username}>{m.author.userName}</p>
                            <p className={styles.messageContent}>{m.message}</p>
                            <p className={styles.timestamp}>{dayjs(m.timestamp).fromNow()}<span>{m.read ? '☑' : '☐'}</span></p>
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