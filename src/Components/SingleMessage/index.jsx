import Styles from './index.module.css'

export default function MessageBox(props){
    console.log(props);
    return (
        <div ref={props.lastRef} className={`${Styles.message} ${(props.currentUser===props.message.sender)?Styles.self:Styles.other}  ${props.className}`}> 
            {props.message.message}        
        </div>
    )
}