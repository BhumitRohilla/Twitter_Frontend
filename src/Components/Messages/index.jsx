import Styles from './index.module.css'
import Button from '../Button/index'
import { useEffect, useState } from 'react'
import MessageInput from '../InputBoxForMessage'
import MessageUserInfo from '../MessageUserInfo';
import MessageBox from '../SingleMessage';

export default function Messages(props){
    
    const [showEmoji,changeShowEmoji] = useState(false);
    const [btnActive,changeBtnState] = useState(false);
    function addEmoji(e) {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        props.setMessage(props.message+emoji);
        changeBtnState(true);
    }

    function handleOnChange(value) {
        changeShowEmoji(false);
        props.setMessage(value);
        if(value.trim() === ''){
            changeBtnState(false);
        }else{
            changeBtnState(true);
        }
    }

    useEffect(()=>{
        //getAllMessages
    },[props.user?.u_id])
    if(props.user === null){
        return (
            <div className={Styles.main}>
                <div className={Styles.holder}>
                    <h1 className={Styles.title}>Send Message</h1>
                    <p className={Styles.para}>Choose from your exisition conversations, start a new one, or just keep swimming.</p>
                    <Button onClick={props.setFoucs} className={Styles.FocusBtn}>Send Message</Button>
                </div>
            </div>
        )
    }else{
        return (
            <div className={Styles.mainBody}>
                <MessageUserInfo user = {props.user}/>
                <div className={Styles.messageContainer}>
                    <MessageBox className={Styles.individualMessage} currentUser={'1'} message={'test'}/>
                </div>
                <MessageInput send={props.send} handleOnChange={handleOnChange} className={Styles.messageBox} addEmoji={addEmoji} btnActive={btnActive} message={props.message} changeShowEmoji={changeShowEmoji} showEmoji={showEmoji}/>
            </div>
        )
    }
}