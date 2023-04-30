import { useEffect, useState } from 'react';
import Styles from './index.module.css'
import { searchUser } from '../../Adapters/check';
import SmallProfile from '../SmallProfile/index'
import CancelableImage from '../CancelableImage';
import Image from '../TweetImg';

export default function TweetInputField(props) {
    const [controller,setController] = useState(new AbortController());
    const [divStatus,changeDivStatus] = useState(false);
    const [APIDate,setApiDate] = useState([]);

    useEffect(()=>{

        let words = props.text.split(' ');
        let lastWord = words[words.length - 1];

        if(lastWord[0] === '@'){
            let wordToSearch = lastWord.substring(1);
            console.log(wordToSearch);
            if(wordToSearch!=""){
                changeDivStatus(true);
                searchUser(wordToSearch,controller)
                .then((data)=>{
                    setApiDate(data);
                })
            }else{
                changeDivStatus(false);
            }
        }else{
            changeDivStatus(false);
        }
    },[props.text])

    
    function handleInput(ev){
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
                    {divStatus && <div className={Styles.floattingWindow}>
                            {APIDate.map((element)=>{
                                return (
                                    <div onClick={()=>props.addToInput(element.username)} className={Styles.profiles}>
                                        <SmallProfile  {...element}/>
                                    </div>
                                )
                            })}
                        </div>}
                </div>
                {/* <span className={Styles.tweetInput} onInput={handleInput} contentEditable={true}></span> */}
            </div>
            <div className={`${Styles.imageHolder} ${props.imgClass}`}>
                {props.imgFile.map((element, index) => {
                    let url = URL.createObjectURL(element);
                    return (
                        < CancelableImage handleClose={()=>props.removeImage(index)} className={`${Styles.tweetImage} ${props.individualImg}`} src={url}  />
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
