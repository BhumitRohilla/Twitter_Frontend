import React, { useEffect, useRef, useState } from 'react'
import Styles from './index.module.css';

function Input({type,placeHolder,onChange,value,label,err,onClick}) {
    
    const [pStatus,pChangeStatus] = useState(true);
    useEffect(()=>{
        value && pChangeStatus(false);
    },[])
    
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
            onChange('');
        }
    }

    return (
        <div onClick={onClick}>
            <div onClick={inputFocus} onFocus={inputFocus} className={Styles.main}>
                <p className={(pStatus)?Styles.pBig:Styles.pSmall}>{label}</p>
                <input maxLength={30} className={Styles.input} onBlur={checkForValue} ref={inputRef} type={type} onChange={(ev) =>{changevalue(ev)}} value={value}/>
            </div>
                { err && <p className={Styles.err}>{err}</p>}
        </div>
    )
}

export default Input