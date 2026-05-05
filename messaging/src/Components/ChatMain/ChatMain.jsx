import styles from './ChatMain.module.css'
import { postMessage } from '../../api/requests';
import { Fragment } from "react";

async function handleForm(e){
    e.preventDefault();
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    try{
        const response = await postMessage(formJson);
        if(response?.id){
            
        }
    }
    catch(err){
        console.error(err.message);
    }
    
    return;
}

export default function ChatMain({userid,messages=[],firstUnreadMessageId,numUnread}){
    //get chat details
    return(
            <>
            <div className={styles.messagesDisplay}>
                { messages.map( m => (
                    <Fragment key={m.id}>
                        {m.id === firstUnreadMessageId
                            ? <div className={styles.numUnreadNotification}>{numUnread} unread messages</div>
                            : null
                        }
                        <div
                            className={`${styles.messageBox} ${m.userId === userid ? styles.outgoing : styles.incoming}`}
                            id={`${m.id === firstUnreadMessageId ? styles.scrollMessagesto : ''}`}
                        >
                            <p className={styles.usename}>{m.userName}</p>
                            <p className={styles.messageContent}>{m.message}</p>
                            <p className={styles.timestamp}>{m.timestamp}<span>{m.read ? '☑' : '☐'}</span></p>
                        </div>
                    </Fragment>
                )) }
            </div>
            <div className={styles.messageComposition}>
                <form onSubmit={handleForm}>
                    <input name="message" type="text" placeholder="Message..."/>
                    <button type="submit">⫸</button>
                </form>
            </div>
        </>
    )
}