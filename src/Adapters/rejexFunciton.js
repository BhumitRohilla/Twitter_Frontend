export function validUserName(userName){
    const userRejex = /^[a-zA-Z_]+$/;
    return userRejex.test(userName);
}


export function validPassword(password){
    const passwordRejex = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
    return passwordRejex.test(password);
}