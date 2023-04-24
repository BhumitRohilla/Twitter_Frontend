import React, { useEffect, useRef, useState } from 'react'
import Styles from './index.module.css';

function Input({type,placeHolder,onChange,value,label}) {

    const [pStatus,pChangeStatus] = useState(true)
    function changevalue(ev){
        onChange(ev.target.value);
    }
    
    let inputRef = useRef(null);

    function inputFocus(){
        inputRef.current?.focus();
        pChangeStatus(false);
    }

    function checkForValue(){
        if(value === ''){
            pChangeStatus(true);
        }
    }

    return (
        <div onClick={inputFocus} onFocus={inputFocus} className={Styles.main}>
            <p className={(pStatus)?Styles.pBig:Styles.pSmall}>{label}</p>
            <input maxLength={30} className={Styles.input} onBlur={checkForValue} ref={inputRef} type={type} onChange={(ev) =>{changevalue(ev)}} value={value}/>
        </div>
    )
}

export default Input