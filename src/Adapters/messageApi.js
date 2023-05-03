
export function getAllMessages(receiver_id,token){
    return fetch(`http://localhost:4000/message/getAllMessages`,{
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
    return fetch(`http://localhost:4000/message/sendMessage`,{
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
