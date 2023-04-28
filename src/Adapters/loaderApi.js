export function loadProfile(u_id){
    return fetch(`http://localhost:4000/check/profile/${u_id}`,{
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