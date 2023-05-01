import SideBar from '../../Components/SideBar'
import Twitter from '../GeneralPage/Twitter'
import Styles from './message.module.css'

import Messages from '../../Components/Messages/index'
import MessageDashboard from '../../Components/MessageDashboard/index'
import { useRef, useState } from 'react'

export default function Message(){
    const [userToOpen,setUserToOpen] = useState(null);
    const inputRef = useRef(null);
    console.log(userToOpen);

    function setFoucs(){
        inputRef.current.click();
    }

    return (
       <div className={Styles.mainSection}>
            <div className={Styles.sideBar}>
                <MessageDashboard setUser={setUserToOpen} inputRef={inputRef}/>
            </div>
            <div className={Styles.container}>
                <Messages user={userToOpen}
                setFoucs={setFoucs}/>
            </div>
       </div>
    )
}