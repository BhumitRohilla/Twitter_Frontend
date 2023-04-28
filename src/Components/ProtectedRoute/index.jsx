import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({element}){
    const {user} = useContext(AuthContext);
    if(user?.username != undefined){
        return element
    }else{
        return <Navigate to={'/'}/>
    }
}