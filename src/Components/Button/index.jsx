import React from 'react';
import styles from './index.module.css'

export default function Button({children,onClick,style,className}){
    return (
        <button className={`${styles.button} ` + className} onClick={onClick} style={style}>
            {children}
        </button>
    )
}