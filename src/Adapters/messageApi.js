
export function getAllMessages(receiver_id,token){
    return fetch(`${process.env.VITE_BACKEND_URL}/message/getAllMessages`,{
        method:'POST',
        credentials:'include',
        headers:{
            'Authorization': 'Bearer '+token,
            'Content-Type' :'application/JSON'
        },
        body:JSON.stringify({receiver:receiver_id})
    })
    .then((res)=>{
        if(res.status===200){
            return res.json();
        }else{
            throw new Error("Server error occure");
        }
    })
    .then((data)=>{
        return data.result;
    })
}

export function sendMessage(receiver_id,message,token){
    return fetch(`${process.env.VITE_BACKEND_URL}/message/sendMessage`,{
        method:'POST',
        credentials:'include',
        headers:{
            'Authorization': 'Bearer '+token,
            'Content-Type' :'application/JSON'
        },
        body:JSON.stringify({receiver:receiver_id,message})
    })
    .then((res)=>{
        if(res.status == 200){
            return res.json();
        }else{
            return false;
        }
    })
    .then((data)=>{
        return data.convo_id;
    })
}
