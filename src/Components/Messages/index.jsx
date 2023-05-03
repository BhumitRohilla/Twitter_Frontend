import Styles from "./index.module.css";
import Button from "../Button/index";
import { useEffect, useState } from "react";
import MessageInput from "../InputBoxForMessage";
import MessageUserInfo from "../MessageUserInfo";
import MessageBox from "../SingleMessage";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";

export default function Messages(props) {
    const [showEmoji, changeShowEmoji] = useState(false);
    const [btnActive, changeBtnState] = useState(false);
    const {user} = useContext(AuthContext);
    function addEmoji(e) {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        props.setMessage(props.message + emoji);
        changeBtnState(true);
    }

    function handleOnChange(value) {
        changeShowEmoji(false);
        props.setMessage(value);
        if (value.trim() === "") {
            changeBtnState(false);
        } else {
            changeBtnState(true);
        }
    }

    useEffect(() => {
        //getAllMessages
    }, [props.user?.u_id]);
    if (props.user === null) {
        return (
            <div className={Styles.main}>
                <div className={Styles.holder}>
                    <h1 className={Styles.title}>Send Message</h1>
                    <p className={Styles.para}>
                        Choose from your exisition conversations, start a new
                        one, or just keep swimming.
                    </p>
                    <Button
                        onClick={props.setFoucs}
                        className={Styles.FocusBtn}
                    >
                        Send Message
                    </Button>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className={Styles.mainBody}>
                    <div>
                        <MessageUserInfo user={props.user} />
                    </div>
                    <div className={Styles.messageContainer}>
                        {props.messageToDis &&
                            props.messageToDis.map((element) => {
                                return (
                                    <MessageBox
                                        className={Styles.individualMessage}
                                        currentUser={user.u_id}
                                        message={element}
                                    />
                                );
                            })}
                    </div>
                </div>
                <MessageInput
                    send={props.send}
                    handleOnChange={handleOnChange}
                    className={Styles.messageBox}
                    addEmoji={addEmoji}
                    btnActive={btnActive}
                    message={props.message}
                    changeShowEmoji={changeShowEmoji}
                    showEmoji={showEmoji}
                />
            </>
        );
    }
}
