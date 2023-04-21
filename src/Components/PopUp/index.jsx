import React from "react";
import Styles from './index.module.css'
import TwitterIcon from '../../assets/twitterIcon'

export default function PopUp({isOpen,children,handleClose}){
    
    function close(){
        handleClose();
    }     
        

    if(!isOpen){
        return <></>
    }else{
        return (
            <>
                <div className='blurBack'>
                </div>  
                <div className={Styles.main}>
                    <div className={Styles.header}>
                        <button title="Close" className={Styles.close} onClick={close}><div className={Styles.firstDiv}></div><div className={Styles.secondDiv}></div></button>
                        <div className={Styles.iconHolder}>
                            <TwitterIcon className={Styles.icon}/>
                        </div>
                    </div>
                    <div className={Styles.content}>
                        {children}
                    </div>
                </div>
            </>
 
        ) 
    }
}