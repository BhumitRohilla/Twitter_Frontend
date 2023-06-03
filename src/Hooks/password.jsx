import { useState } from "react"

export default function usePassword(setErrorPassword){
    const [password,set] = useState("");
    function setpassword(value){
        set(value);
        if (value.trim() === "") {
            setErrorPassword("Password cannot be empty");
        }else{
            setErrorPassword('');
        }
        
    }

    return [password,setpassword]
}