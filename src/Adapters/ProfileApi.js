export function getTweetsOfUser(u_id,token){
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/user/getAllTweetsOfUser/${u_id}`,{
        method:'GET',
        credentials:'include',
        headers:{
            'Authorization': 'Bearer '+token,
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

export function getCommentOfUser(u_id,token){
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/user/getAllCommentsOfUser/${u_id}`,{
        method:'GET',
        credentials:'include',
        headers:{
            'Authorization': 'Bearer '+token,
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

export function getAllLikedOfUser(u_id,token){
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/user/getAllLikedOfUser/${u_id}`,{
        method:'GET',
        credentials:'include',
        headers:{
            'Authorization': 'Bearer '+token,
        },
    })
    .then((res)=>{
        console.log(res);
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