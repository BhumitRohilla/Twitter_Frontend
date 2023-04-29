export function searchUser(username,controller){
    return fetch(`http://localhost:4000/check/searchUsers/${username}`,{
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