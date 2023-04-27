export function tweetSend(data,token){
    return fetch('http://localhost:4000/tweet/send',{
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
    return fetch(`http://localhost:4000/tweet/show/${type}`,{
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