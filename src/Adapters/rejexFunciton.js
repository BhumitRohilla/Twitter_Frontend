export function validUserName(userName){
    const userRejex = /^[a-zA-Z_0-9]+$/;
    return userRejex.test(userName);
}


export function validPassword(password){
    const passwordRejex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,40}$/;
    console.log("Validating password:", password);
    return passwordRejex.test(password);
}

export function validEmail(email){
    const emailRejex = /^[a-zA-Z0-9]+@[a-z]+.com$/;
    return emailRejex.test(email);
}

export function checkHash(text){
    const hashReject = /^[a-zA-Z0-9]+$/;
    return hashReject.test(text);
}
