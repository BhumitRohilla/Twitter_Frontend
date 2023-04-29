import React from "react";
import styles from './twitter.module.css'
import GrayBorderBox from "../../Components/GrayBorderBox";
import Button from '../../Components/Button/index'

export default function Twitter({firstElement,secondElement}){
    return (
        <div className={`${styles.mainSection} second`}>
            <div className={styles.container}>
                {firstElement}
            </div>
            <div className={styles.sideBar}>
                {secondElement}
            </div>  
        </div>
    )
}