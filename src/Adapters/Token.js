import { refreshTokenNew } from "./AuthApi";
import jwtDecode from "jwt-decode";
export default function getToken(token){
    return new Promise((resolve, reject) => {
        if(checkIfValid(token)){
            resolve({oldToken:token})
        }else{
            refreshTokenNew()
            .then((newToken)=>{
                console.log(newToken,'token');
                resolve({newToken:newToken})
            })
            .catch((err)=>{
                throw new Error(err);
            })
        }
        
    })
}

function checkIfValid(token){
    try{
        const decoded = jwtDecode(token);
        if((decoded.exp) < ((Date.now()/1000) + 5)){
            console.log("Token refreshed");
            return false;
        }else{
            return true;
        }
    }
    catch(err){
        return  false;
    }
}

/*
!Need AuthContext for working
getToken(user.token)
.then((token) => {
    if (token.newToken !== undefined) {
        let newUser = { ...user };
        setUser({ user }, "OldUser");
        newUser.token = token.newToken;
        setUser({ ...newUser });
        token = token.newToken;
    } else {
        token = token.oldToken;
    }
    console.log(token);

    *YourFunction Here

})
.catch((err) => {
    if (err.message == 401) {
        setUser({});
    }
});
*/

