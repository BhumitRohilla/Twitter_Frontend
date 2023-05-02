import Styles from './index.module.css'

export default function MessageBox(props){
    return (
        <div className={`${Styles.currentUser} ${props.className}`}> 
            {props.message}            
        </div>
    )
}