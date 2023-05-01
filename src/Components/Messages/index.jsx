import Styles from './index.module.css'
import Button from '../Button/index'
export default function Messages(props){
    if(props.user === null){
        return (
            <div className={Styles.main}>
                <div className={Styles.holder}>
                    <h1 className={Styles.title}>Send Message</h1>
                    <p className={Styles.para}>Choose from your exisition conversations, start a new one, or just keep swimming.</p>
                    <Button onClick={props.setFoucs} className={Styles.FocusBtn}>Send Message</Button>
                </div>
            </div>
        )
    }else{
        return (
            <>
                {props.user.name}
            </>
        )
    }
}