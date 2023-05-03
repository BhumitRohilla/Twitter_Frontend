import Styles from "./message.module.css";
import Messages from "../../Components/Messages/index";
import MessageDashboard from "../../Components/MessageDashboard/index";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import AuthContext from "../../Context/AuthContext";
import { useLoaderData } from "react-router-dom";

//API
import getToken from "../../Adapters/Token";
import { getAllMessages, sendMessage } from "../../Adapters/messageApi";
import LoadingDiv from "../../Components/Loading";
export default function Message() {
    const { user, setUser } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [socket, changeSocket] = useState();
    const [messageToDis, setMessagesToDisp] = useState([]);
    const [userToOpen, setUserToOpen] = useState(null);
    const [userToShow, setUserToShow] = useState(useLoaderData());
    const [loading, setLoading] = useState(false);
    const lastRef = useCallback((node) => {
        if (node) {
            node.scrollIntoView({ smolth: true });
        }
    }, []);
    const [userSet, setUserSet] = useState(
        new Set(
            useLoaderData().map((element) => {
                return element.u_id;
            })
        )
    );

    console.log(userSet);
    const inputRef = useRef(null);
    console.log(userToShow);
    if (socket) {
        socket.on("recieve-message", (data) => {
            console.log(data.sender);
            if (userSet.has(data.sender)) {
                let elementToPushUp = userToShow.filter((element) => {
                    if (element.u_id === data.sender) {
                        return true;
                    } else {
                        return false;
                    }
                });
                console.log(elementToPushUp, "elementToPush");
                let newArray = userToShow.filter((element) => {
                    if (element.u_id === data.sender) {
                        return false;
                    } else {
                        return true;
                    }
                });
                console.log(newArray);
                setUserToShow([...elementToPushUp, ...newArray]);
            } else {
                console.log(data);
                userSet.add(data.sender);
                setUserToShow([{ ...data.senderDetails }, ...userToShow]);
            }
            setMessagesToDisp([...messageToDis, data]);
        });
    }
    async function send() {
        if (socket == null) {
            alert("Some error occure reload page");
        } else {
            console.log(userToOpen, user.u_id);
            setMessage("");
            getToken(user.token)
                .then((token) => {
                    if (token.newToken !== undefined) {
                        let newUser = { ...user };
                        setUser({ user }, "OldUser");
                        newUser.token = token.newToken;
                        setUser({ ...newUser });
                        token = token.newToken;
                    } else {
                        token = token.oldToken;
                    }
                    sendMessage(userToOpen.u_id, message, token)
                        .then((res) => {
                            if (res) {
                                let obj = {
                                    message,
                                    receiver: userToOpen.u_id,
                                    sender: user.u_id,
                                    convo_id: res.conv,
                                    date: Date().toString(),
                                    senderDetails: {
                                        username: user.username,
                                        profilepicture: user.profilepicture,
                                        name: user.name,
                                    },
                                };
                                setMessagesToDisp([...messageToDis, obj]);
                                socket.emit("send-message", obj);
                                if (userSet.has(userToOpen.u_id)) {
                                    let elementToPushUp = userToShow.filter(
                                        (element) => {
                                            if (
                                                element.u_id === userToOpen.u_id
                                            ) {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        }
                                    );
                                    console.log(
                                        elementToPushUp,
                                        "elementToPush"
                                    );
                                    let newArray = userToShow.filter(
                                        (element) => {
                                            if (
                                                element.u_id === userToOpen.u_id
                                            ) {
                                                return false;
                                            } else {
                                                return true;
                                            }
                                        }
                                    );
                                    console.log(newArray);
                                    setUserToShow([
                                        ...elementToPushUp,
                                        ...newArray,
                                    ]);
                                } else {
                                    userSet.add(userToOpen.u_id);
                                    setUserToShow([
                                        { ...userToOpen },
                                        ...userToShow,
                                    ]);
                                }
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    if (err.message == 401) {
                        setUser({});
                    }
                });
        }
    }

    useEffect(() => {});

    useEffect(() => {
        const socket = io("http://localhost:4000");
        socket.emit("add-user", user.u_id);

        // socket.emit('send-message',{message:'test',receiver:1,sender:user.u_id})
        changeSocket(socket);
        return () => {
            socket.emit("disconnet", user.u_id);
            socket.close();
        };
    }, []);

    useEffect(() => {
        setLoading(true);
        getToken(user.token)
            .then((token) => {
                if (token.newToken !== undefined) {
                    let newUser = { ...user };
                    setUser({ user }, "OldUser");
                    newUser.token = token.newToken;
                    setUser({ ...newUser });
                    token = token.newToken;
                } else {
                    token = token.oldToken;
                }

                getAllMessages(userToOpen.u_id, token).then((data) => {
                    setMessagesToDisp(data);
                    setLoading(false);
                });
            })
            .catch((err) => {
                if (err.message == 401) {
                    setUser({});
                }
                setLoading(false);
            });
    }, [userToOpen]);

    function setFoucs() {
        inputRef.current.click();
    }

    return (
        <div className={Styles.mainSection}>
            <div className={Styles.sideBar}>
                <MessageDashboard
                    setUser={setUserToOpen}
                    inputRef={inputRef}
                    userToShow={userToShow}
                    user={userToOpen}
                />
            </div>
            <div className={Styles.container}>
                {!loading?(
                    <Messages
                        message={message}
                        setMessage={setMessage}
                        user={userToOpen}
                        setFoucs={setFoucs}
                        send={send}
                        messageToDis={messageToDis}
                        lastRef={lastRef}
                    />
                ): <LoadingDiv/>}
            </div>
        </div>
    );
}
