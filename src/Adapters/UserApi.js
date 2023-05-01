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

export function getListOfUserToFollow(payLoad,token){
    return fetch(`http://localhost:4000/user/userToFollow`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            'Authorization': 'Bearer '+token,
            'Content-Type' : 'application/JSON'
        },
        body:JSON.stringify(payLoad)
    })
    .then((res)=>{
        if(res.status === 200){
            return res.json();
        }else{
            throw new Error(res.status);
        }
    })
}

export function likedApi(t_id,token){
    return fetch(`http://localhost:4000/user/liked/${t_id}`,{
        method: 'GET',
        credentials: 'include',
        headers:{
            'Authorization': 'Bearer '+token
        },
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

export function removeLikeApi(t_id,token){
    return fetch(`http://localhost:4000/user/removeLike/${t_id}`,{
        method: 'GET',
        credentials: 'include',
        headers:{
            'Authorization': 'Bearer '+token
        }
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

export function searchUsers(username,signal){
    return fetch(`http://localhost:4000/check/searchUsers/${username}`,{
        signal:signal
    })
    .then((res)=>{
        if(res.status === 200){
            return res.json();
        }else{
            throw new Error(res.status);
        }
    })
    .then((data)=>{
        return data.result;
    })
}

export function getFollowStatus(userToCheck,token){
    return fetch(`http://localhost:4000/user/checkFollowStatus/${userToCheck}`,{
        headers:{
            'Authorization': 'Bearer '+token
        }
    })
    .then((res)=>{
        if(res.status === 200){
            return res.json();
        }else{
            throw new Error(res.status);
        }
    })
    .then((data)=>{
        return data.result;
    })
}

export function checkAllUserTweets(u_id){
    return fetch(`http://localhost:4000/check/getAllTweetsOfUser/${u_id}`)
    .then((res)=>{
        if(res.status === 200 ){
            return res.json();
        }else{
            throw new Error(res.status);
        }
    })
    .then((data)=>{
        return data.result;
    })
}

export function updateUser(data,token){
    return fetch(`http://localhost:4000/user/updateProfile`,{
        method: 'POST',
        headers:{
            'Authorization': 'Bearer '+token
        },
        body:data
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


export default function getNotification(token){
    return fetch(`http://localhost:4000/user/getNotifications`,{
        headers:{
            'Authorization': 'Bearer '+token
        },
    })
    .then((res)=>{
        if(res.status === 200){
            return res.json();
        }else{
            throw new Error(res.status);
        }
    })
    .then((data)=>{
        return data.result;
    })
}