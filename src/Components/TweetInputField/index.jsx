import { useEffect, useState } from "react";
import Styles from "./index.module.css";
import { searchHash, searchUser } from "../../Adapters/check";
import SmallProfile from "../SmallProfile/index";
import CancelableImage from "../CancelableImage";
import { checkHash } from "../../Adapters/rejexFunciton";
import ShowHash from "../ShowHash";
export default function TweetInputField(props) {
    const [controller, setController] = useState(new AbortController());
    const [divStatus, changeDivStatus] = useState(false);
    const [APIDate, setApiDate] = useState([]);
    const [hashShow, setHashSow] = useState(false);

    useEffect(() => {
        console.log(divStatus);
    });
    useEffect(() => {
        let words = props.text.split(" ");
        let lastWord = words[words.length - 1];

        if (lastWord[0] === "@") {
            let wordToSearch = lastWord.substring(1);
            console.log(wordToSearch);
            if (wordToSearch != "") {
                changeDivStatus(true);
                searchUser(wordToSearch, controller).then((data) => {
                    setApiDate(data);
                    setHashSow(false);
                });
            } else {
                changeDivStatus(false);
            }
        } else if (lastWord[0] === "#") {
            let wordToSearch = lastWord.substring(1);
            if (wordToSearch != "") {
                changeDivStatus(true);
                if (checkHash(wordToSearch)) {
                    searchHash(wordToSearch).then((data) => {
                        setApiDate(data);
                        setHashSow(true);
                    });
                } else {
                    changeDivStatus(false);
                }
            }
        } else {
            changeDivStatus(false);
        }
    }, [props.text]);

    function handleInput(ev) {
        controller.abort();
        setController(new AbortController());
        props.handleInput(ev);
    }

    return (
        <>
            <div className={`${Styles.tweetInputHolder} ${props.inputClass}`}>
                <textarea
                    maxLength={300}
                    className={Styles.tweetInput}
                    onChange={handleInput}
                    value={props.text}
                    type="text"
                    placeholder={props.placeholder}
                />
                <div className={Styles.floatHolder}>
                    {divStatus && (
                        <div className={Styles.floattingWindow}>
                            {APIDate.map((element) => {
                                return (
                                    <div
                                        
                                        className={Styles.profiles}
                                    >
                                        {hashShow ? (
                                            <div onClick={()=>{
                                                props.addToInput(element.text,true);
                                            }}>
                                            <ShowHash {...element} />
                                            </div>
                                        ) : (
                                            <div onClick={() =>
                                                props.addToInput(element.username,false)
                                            }>
                                            <SmallProfile {...element} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                {/* <span className={Styles.tweetInput} onInput={handleInput} contentEditable={true}></span> */}
            </div>
            <div className={`${Styles.imageHolder} ${props.imgClass}`}>
                {props.imgFile.map((element, index) => {
                    let url = URL.createObjectURL(element);
                    return (
                        <CancelableImage
                            handleClose={() => props.removeImage(index)}
                            className={`${Styles.tweetImage} ${props.individualImg}`}
                            src={url}
                        />
                        // <div>

                        //     <Image className={`${Styles.tweetImage} ${props.individualImg}`} src={url}  />
                        //     <button
                        //         onClick={() => {
                        //             props.removeImage(index);
                        //         }}
                        //     >
                        //         X
                        //     </button>
                        // </div>
                    );
                })}
            </div>
        </>
    );
}
