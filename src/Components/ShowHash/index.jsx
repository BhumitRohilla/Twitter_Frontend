import Styles from './index.module.css'

export default function ShowHash(props){
    return (
        <>
            <p className={Styles.text}>{props.text}</p>
        </>
    )
}