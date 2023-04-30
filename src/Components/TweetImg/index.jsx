import Styles from './index.module.css'
export default function Image(props){
    return (
        <img src={`${props.src}`} className={`${props.className} ${Styles.main}`}/>
    )
}