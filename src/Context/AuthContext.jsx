import { createContext, useState ,useEffect} from "react";
import { refreshApi } from "../Adapters/AuthApi";
const AuthContext = createContext(null);

export  function AuthProvider({children}){
    const [user,setUser] = useState({});
    const [loading,setLoading] = useState(true);
    console.log("test");
    useEffect(() => {
        refreshApi()
            .then((data) => {
                setLoading(false);
                setUser(data);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, []);

    return (
        <AuthContext.Provider value={{user,setUser,loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
