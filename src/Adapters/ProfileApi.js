export function getTweetsOfUser(u_id,token){
    return fetch(`http://localhost:4000/user/getAllTweetsOfUser/${u_id}`,{
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
    return fetch(`http://localhost:4000/user/getAllCommentsOfUser/${u_id}`,{
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
    return fetch(`http://localhost:4000/user/getAllLikedOfUser/${u_id}`,{
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