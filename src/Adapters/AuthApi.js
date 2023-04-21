function loginApi(payload){
    return fetch('http://192.168.56.1:4000',{
        method:'POST',
        headers:{
            'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(payload)
    })
    .then((res)=>{
        if(res.status === 200){
            return res.json();
        }else{
            throw new Error(res.status);
        }
    })
    .catch((err)=>{
        return err;
    })
}