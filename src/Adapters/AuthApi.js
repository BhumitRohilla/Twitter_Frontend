import jwtDecode from 'jwt-decode';

const domain = 'localhost';

export function loginApi(username,password){
    return fetch(`http://${domain}:4000/auth/login`,{
        method:'POST',
        credentials: 'include',
        headers:{
            'Content-Type': 'application/JSON'
        },
        body: JSON.stringify({username,password})
    })
    .then((res)=>{
        if(res.status === 200){
            return res.json();
        }else{
            throw new Error(res.status);
        }
    })
    .then((data)=>{
        let obj = {};
        obj.token = data.token;
        let user = jwtDecode(data.token);
        user = user.userInfo;
        Object.assign(obj,{...user});
        return obj;
    })
}

export function refreshApi(){
    return fetch(`http://${domain}:4000/auth/refresh`,{
        method: 'POST',
        credentials: 'include'
    })
    .then((res)=>{
        if(res.status === 200){
            return res.json();
        }else{
            throw new Error(res.status);
        }
    })
    .then((data)=>{
        let obj = {};
        obj.token = data.token;
        let user = jwtDecode(data.token);
        console.log(user);
        user = user.userInfo;
        Object.assign(obj,{...user});
        return obj;
    })
}

export function logoutApi(){
    return fetch('http://localhost:4000/auth/logout',{
        method:'GET',
        credentials: 'include'
    })
    .then((res)=>{
        if(res.status === 200){
            res.text();
        }
    })
}

export function checkForExpire(token){
    try{
        const decoded = jwtDecode(token);
        if((decoded.exp) < ((Date.now()/1000) + 5)){
            console.log("Token refreshed");
            return false;
        }else{
            console.log(decoded,decoded.exp+decoded.iat,Date.now()/1000+4);
            return true;
        }
    }
    catch(err){
        console.log(err);
        return  false;
    }
}

export function refreshToken(setUser){
    return refreshApi()
    .then((data)=>{
        setUser(data);
        return data.token;
    })
    .catch((err)=>{
        setUser({});
    })
}
