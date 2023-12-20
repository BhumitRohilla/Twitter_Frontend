export function loadProfile(u_id){
    return fetch(`${process.env.VITE_BACKEND_URL}/check/profile/${u_id}`,{
        method:'GET'
    })
    .then((res)=>{
        if(res.status === 200){
            return res.json();
        }else{
            throw new Error(res.status);
        }
    })
    .then((data)=>{
        return data.profile;
    })
}

export  function loadTweet(t_id,token){
    return fetch(`${process.env.VITE_BACKEND_URL}/tweet/getSingleTweet/${t_id}`,{
        headers:{
            'authorization' : 'Bearer '+token
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
        console.log(data);
        return data.result;
    })
}

export function userToShow(token){
    return fetch(`${process.env.VITE_BACKEND_URL}/message/userToConvo`,{
        headers:{
            'authorization' : 'Bearer '+token
        }
    })
    .then((res)=>{
        if(res.status===200){
            return res.json();
        }else{
            throw new Error(res.status);
        }
    })
    .then((data)=>{
        return data.result;
    })
}