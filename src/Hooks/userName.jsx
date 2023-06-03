import { useState } from "react"
import { validUserName } from "../Adapters/rejexFunciton";
export default function useUserName(setErrorUser){
    const [userName,set] = useState("");
    function setUserName(value){
        set(value);
        if (validUserName(value) && value.trim() !== "") {
            setErrorUser('');
        } else {
            //TODO: Remove this alertfunction
            setErrorUser('Invalid UserName')
        }
        
    }

    return [userName,setUserName]
}