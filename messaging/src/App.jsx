import { useState } from 'react'
import styles from './App.module.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id={styles.mainContainer}>
      <div id={styles.sidebar}>

      </div>
      <div id={styles.messagingContainer}>
        
      </div>
    </div>
  )
}

export default App
