import SideBar from "../../Components/SideBar";
import Twitter from "../GeneralPage/Twitter";
import Styles from "./message.module.css";

import Messages from "../../Components/Messages/index";
import MessageDashboard from "../../Components/MessageDashboard/index";
import { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import AuthContext from "../../Context/AuthContext";

export default function Message() {
    const { user, setUser } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [socket, changeSocket] = useState();
    
    const [userToOpen, setUserToOpen] = useState(null);
    const inputRef = useRef(null);

    function send(){
        if(socket==null){
            alert("Some error occure reload page");
        }else{
            console.log(userToOpen,user.u_id);
            setMessage("");
            socket.emit('send-message',{message,receiver:userToOpen.u_id,sender:user.u_id})
        }
    }

    useEffect(() => {
        const socket = io('http://localhost:4000'); 
        socket.emit("add-user", user.u_id);
        
        socket.on("recieve-message", (data) => {
            console.log(data);
        });
        // socket.emit('send-message',{message:'test',receiver:1,sender:user.u_id})
        changeSocket(socket);
        return () => {
            socket.emit("disconnet", user.u_id);
            socket.close();
        };
    },[]);


    function setFoucs() {
        inputRef.current.click();
    }

    return (
        <div className={Styles.mainSection}>
            <div className={Styles.sideBar}>
                <MessageDashboard setUser={setUserToOpen} inputRef={inputRef} />
            </div>
            <div className={Styles.container}>
                <Messages
                    message={message}
                    setMessage={setMessage}
                    user={userToOpen}
                    setFoucs={setFoucs}
                    send={send}
                />
            </div>
        </div>
    );
}
