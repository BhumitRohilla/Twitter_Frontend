import React from "react";
import Styles from './index.module.css'


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
                        <button title="Close" className={Styles.close} onClick={close}><div className={Styles.firstDiv}></div><div className={Styles.secondDiv}></div></button>
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