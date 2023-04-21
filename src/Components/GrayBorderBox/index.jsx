import React from "react";
import Styles from './index.module.css'

export default function GrayBorderBox({children}){
    return (
        <div className={Styles.mainContainer}>
            {children}
        </div>
    )
}