import jwtDecode from 'jwt-decode';
const domain = 'localhost';

export function loginApi(userName,password){
    return fetch(`http://${domain}:4000/auth/login`,{
        method:'POST',
        credentials: 'include',
        headers:{
            'Content-Type': 'application/JSON'
        },
        body: JSON.stringify({userName,password})
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