import React from 'react';
import styles from './index.module.css'

export default function Button({disabled=false,children,onClick,style,className}){
    return (
        <button disabled={disabled}  className={`${styles.button} ` + className} onClick={onClick} style={style}>
            {children}
        </button>
    )
}