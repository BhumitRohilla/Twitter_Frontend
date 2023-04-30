import Image from "../TweetImg";
import CloseBtn from '../CloseBtn/index'
import Styles from './index.module.css'

export default function CancelableImage(props){
    return (
        <div className={Styles.main}>
            <button  onClick={props.handleClose} className={Styles.closeBtn}>
                <CloseBtn/>
            </button>
            <Image src={`${props.src}`}  className={`${props.className}`}/>
        </div>
    )
}