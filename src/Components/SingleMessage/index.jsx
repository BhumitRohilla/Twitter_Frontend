import Styles from './index.module.css'

export default function MessageBox(props){
    return (
        <div className={`${(props.currentUser===props.message.sender)?Styles.self:Styles.other}  ${props.className}`}> 
            {props.message.message}        
        </div>
    )
}