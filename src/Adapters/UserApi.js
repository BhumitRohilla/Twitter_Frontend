export function changeProfile(data,token){
    return fetch('http://localhost:4000/user/profile',{
        method:'POST',
        credentials:'include',
        headers:{
            'Authorization' :'Bearer '+token,
        },
        body:data
    })
    .then((res)=>{
        if(res.status === 200){
            return res.json();
        }else{
            throw new Error(res.status);
        }
    })
    .then((data)=>{
        return data;
    })
}

export function checkIfUsernameAvailable(data){
    return fetch('http://localhost:4000/check/username',{
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type'  :'application/JSON'
        },
        body:JSON.stringify({username:data})
    })
    .then((res)=>{
        if(res.status === 200){
            return true;
        }else{
            return false;
        }
    })
    .catch((err)=>{
        return false;
    })
}

export function updateUsername(data,token){
    return fetch('http://localhost:4000/user/username',{
        method: 'POST',
        credentials: 'include',
        headers:{
            'Authorization' :'Bearer '+token,
            'Content-Type'  :'application/JSON'
        },
        body:JSON.stringify({username:data})
    })
    .then((res)=>{
        console.log(res);
        if(res.status === 200){
            return true;
        }else{
            return false;
        }
    })
    .catch((err)=>{
        console.log(err);
        return false;
    })
}

export  function followUserApi(u_id,token){
    return fetch('http://localhost:4000/user/follow',{
        method: 'POST',
        credentials: 'include',
        headers:{
            'Authorization': 'Bearer '+token,
            'Content-Type' : 'application/JSON'
        },
        body:JSON.stringify({u_id})
    })
    .then((res)=>{
        if(res.status === 200){
            return true
        }else{
            return false;
        }
    })
    .catch((err)=>{
        console.log(err);
        return false;
    })
}

export  function unFollowUserApi(u_id,token){
    return fetch('http://localhost:4000/user/unfollow',{
        method: 'POST',
        credentials: 'include',
        headers:{
            'Authorization': 'Bearer '+token,
            'Content-Type' : 'application/JSON'
        },
        body:JSON.stringify({u_id})
    })
    .then((res)=>{
        if(res.status === 200){
            return true;
        }else{
            return false;
        }
    })
    .catch((err)=>{
        console.log(err);
        return false;
    })
}

export  function getListOfUser(){
    return fetch('http://localhost:4000/check/getListOfUsers',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/JSON',
        },
    })
    .then((res)=>{
        if(res.status === 200){
            return res.json();
        }else{
            throw new Error(res.status);
        }
    })
}