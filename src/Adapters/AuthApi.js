import jwtDecode from 'jwt-decode';

export function loginApi(username,password){
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,{
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
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,{
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
        user = user.userInfo;
        Object.assign(obj,{...user});
        return obj;
    })
}

export function refreshTokenNew(){
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,{
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
        return data.token;
    })
}

export function logoutApi(){
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`,{
        method:'GET',
        credentials: 'include'
    })
    .then((res)=>{
        if(res.status === 200){
            res.text();
        }
    })
}

//!Depricated
export function checkForExpire(token){
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
        console.log(err);
        return  false;
    }
}


//!Depricated
export function refreshToken(){
    return refreshApi()
    .then((data)=>{
        setUser(data);
        return data.token;
    })
    .catch((err)=>{
        setUser({});
    })
}
