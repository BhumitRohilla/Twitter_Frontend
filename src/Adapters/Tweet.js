export function commentSend(data,token){
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/tweet/sendComment`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            'Authorization': 'Bearer '+token,
        },
        body:data
    })
    .then((res)=>{
        if(res.status === 200){
            return res.json();
        }else{
            return false;
        }
    })
    .then((data)=>{
        return data.result;
    })
    .catch((err)=>{
        console.log(err);
        return false;
    })
}


export function tweetSend(data,token){
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/tweet/send`,{
        method:'POST',
        headers:{
            'Authorization': 'Bearer '+token,
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
}

export function getTweets(type,{start,length},token){
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/tweet/show/${type}`,{
        method: 'POST',
        headers:{
            'Authorization': 'Bearer ' + token,
            'Content-Type' : 'application/JSON',
        },
        body: JSON.stringify({start,length}),
    })
    .then((res)=>{
        if(res.status === 200 ){
            return res.json();
        }else{
            throw new Error(res.status);
        }
    })
    .then((data)=>{
        return data;
    })
}

export function getCommentTweet(t_id,token){
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/tweet/getCommentTweet/${t_id}`,{
        headers:{
            'Authorization': 'Bearer ' + token,
        }
    })
    .then((res)=>{
        if(res.status === 200){
            return res.json();
        }else{
            throw new Error(res.status)
        }
    })
    .then((data)=>{
        return data.result;
    })
}
