import TweetPopUpModel from "../TweetPopUpModel/index";
import TweeterTextModel from "../TweeterTextModel/index";
import Styles from "./index.module.css";
import TweetInputField from "../TweetInputField/index";
import { useContext, useEffect, useRef, useState } from "react";
import ProfileModel from "../UserProfilePicture";
import getToken from "../../Adapters/Token";
import AuthContext from "../../Context/AuthContext";
import { commentSend } from "../../Adapters/Tweet";

export default function Comment(props) {
    const [comment, changeComment] = useState("");
    const [imgFile, changeImgFile] = useState([]);
    const [showEmoji, changeShowEmoji] = useState(false);
    const {user,setUser} = useContext(AuthContext);


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
        changeComment("");
        changeImgFile([]);
        changeShowEmoji(false)
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

    function onClick(){
        if(comment.trim() === ""){
            return;
        }
        const data = new FormData();
        data.append("comment",comment);
        data.append("t_id",props.tweet.t_id);

        imgFile.forEach((file)=>{
            data.append("tweetImg",file);
        });

        getToken(user.token)
        .then((token)=>{
            if(token.newToken !== undefined){
                let newUser = {...user};
                setUser({user},'OldUser');
                newUser.token = token.newToken;
                console.log(newUser);
                setUser({...newUser});
                token = token.newToken;
            }else{
                token = token.oldToken;
            }
            commentSend(data,token)
            .then((res)=>{
                if(props.handleCommentData !== undefined){
                    props.handleCommentData(res);
                }
            })
        })
        handleClose();
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
                onClick={onClick}
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
