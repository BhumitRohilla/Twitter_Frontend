export  function checkIfUserExists(email){
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/checkIfUserExists`,{
        method:'POST',
        headers:{
            'Content-Type':'application/JSON'
        },
        body:JSON.stringify({email})
    })
    .then((res)=>{
        if(res.status === 200){
            return res.json();
        }else{
            throw new Error(res.status);
        }
    })
    .then((data)=>{
        console.log(data);
        if(data.message === "user found"){
            return true;
        }else{
            return false;
        }
    })
}

export  function generateAToken(email){
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/sendValidationMail`,{
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type':'application/JSON'
        },
        body:JSON.stringify({email})
    })
    .then((res)=>{
        console.log(res.status);
        if(res.status === 200 ){
            return true;
        }else{
            return false;
        }
    })
    .catch((err)=>{
        return false;
    })
}

export  function checkCode(otp){
    console.log(otp);
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/checkCode`,{
        method:'POST',
        credentials:"include",
        headers:{
            'Content-Type':'application/JSON',
        },
        body:JSON.stringify({otp})
    })
    .then((res)=>{
        if(res.status === 200){
            return true;
        }else{
            return false;
        }
    })
}

export function createAccount(payLoad){
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signUp`,{
        method: 'POST',
        credentials:'include',
        headers:{
            'Content-Type':'application/JSON',
        },
        body:JSON.stringify(payLoad)
    })
    .then((res)=>{
        if(res.status === 200){
            return res.json();
        }else{
            throw new Error(res.status);
        }
    })
    .then((data)=>{
        return data;
    })
    .catch((error)=>{
        throw new Error(error);
    })
}