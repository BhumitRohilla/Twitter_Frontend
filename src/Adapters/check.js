export function searchUser(username,controller){
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/check/searchUsers/${username}`,{
        signal:controller.signal
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

export function searchHash(hash){
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/check/searchHash/${hash}`)
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