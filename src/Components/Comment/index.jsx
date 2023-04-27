import TweetPopUpModel from "../TweetPopUpModel/index";
import TweeterTextModel from "../TweeterTextModel/index";
import Styles from "./index.module.css";
import TweetInputField from "../TweetInputField/index";
import { useRef, useState } from "react";
import ProfileModel from "../ProfileModel";

export default function Comment(props) {
    const [comment, changeComment] = useState("");
    const [imgFile, changeImgFile] = useState([]);
    const [showEmoji, changeShowEmoji] = useState(false);


    function handleFile(ev) {
        if (ev.target.files.length + imgFile.length > 4) {
            alert("Only four images are allowed");
        } else {
            let filesToPush = [];
            for (let i = 0; i < ev.target.files.length; ++i) {
                filesToPush.push(ev.target.files[i]);
            }
            changeImgFile([...imgFile, ...filesToPush]);
        }
    }

    function removeImage(i) {
        console.log(i);
        let newImageArray = imgFile.filter((element, index) => {
            if (index === i) {
                return false;
            }
            return true;
        });
        changeImgFile(newImageArray);
    }

    function addEmoji(e) {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        changeComment(comment+emoji);
    }

    function handleInput(ev) {
        changeComment(ev.target.value);
        changeShowEmoji(false);
    }

    function handleClose(){
        props.handleClose();
    }

    function handleFile(ev) {
        if (ev.target.files.length + imgFile.length > 4) {
            alert("Only four images are allowed");
        } else {
            let filesToPush = [];
            for (let i = 0; i < ev.target.files.length; ++i) {
                filesToPush.push(ev.target.files[i]);
            }
            changeImgFile([...imgFile, ...filesToPush]);
        }
    }

    return (
        <>
            <TweetPopUpModel
                isOpen={props.isOpen}
                handleClose={handleClose}
                handleFile={handleFile}
                className={Styles.tweet}
                changeImgFile={changeImgFile}
                showEmoji = {showEmoji}
                changeShowEmoji = {changeShowEmoji}
                addEmoji = {addEmoji}
                text={'Replay'}
            >
                <TweeterTextModel 
                    tweet={props.tweet}
                    className={Styles.noBorder}
                />
                <div className={Styles.InputHolder}>
                    <div>
                        <ProfileModel className={Styles.profile}/>
                    </div>
                    <div className={Styles.InputField}>
                        <TweetInputField
                            handleInput={handleInput}
                            imgFile={imgFile}
                            placeholder={"Enter Your Reply"}
                            removeImage={removeImage}
                            text={comment}
                        />
                    </div>
                </div>
            </TweetPopUpModel>
        </>
    );
}
