import React from "react";
import Styles from './index.module.css'
import CloseBtn from "../CloseBtn";

export default function PopUp({isOpen,children,handleClose,footer,header}){
    
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
                        <button title="Close" className={Styles.close} onClick={close}><CloseBtn/></button>
                        {header}
                    </div>
                    <div className={Styles.content}>
                        {children}
                    </div>
                    <div className={Styles.footer}>
                        {footer}
                    </div>
                </div>
            </>
 
        ) 
    }
}