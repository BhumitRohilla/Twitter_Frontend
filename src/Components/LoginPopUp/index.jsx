import React, { useContext, useEffect, useState } from "react";
import PopUp from "../PopUp";
import Styles from "./index.module.css";
import Input from "../InputBox/index";
import Button from "../Button";
import { loginApi } from "../../Adapters/AuthApi";
import AuthContext from "../../Context/AuthContext";
import ModelOpen from "../../Context/OpenModel";
import TwitterIcon from "../../assets/twitterIcon";
import useUserName from "../../Hooks/userName";
import usePassword from "../../Hooks/password";
import { validUserName } from "../../Adapters/rejexFunciton";

export default function index(props) {
    const { setUser } = useContext(AuthContext);
    const { togleLoginSignUp } = useContext(ModelOpen);
  
    const [errUser,setErrorUser] = useState('');
    const [errPassword,setErrorPassword] = useState('');
    
    const [password, setpassword] = usePassword(setErrorPassword);
    const [userName, setUserName] = useUserName(setErrorUser);

    function handleClose(){
        setUserName('');
        setpassword('');
        setErrorUser('');
        setErrorPassword('');
        props.handleClose();
    }
    
    async function login() {
        if (validUserName(userName) && userName.trim() !== "") {
        } else {
            //TODO: Remove this alertfunction
            return setErrorUser('Invalid UserName')
        }
        if (password.trim() === "") {
            return setErrorPassword("Password cannot be empty");
        }
        try {
            let result = await loginApi(userName, password);
            setUser(result);
            console.log()
            props.handleClose();
        } catch (err) {
            console.log(err.message);
            console.log(err);
            setErrorUser('Username or Password Wrong');
        }
    }

    return (
        <PopUp
            isOpen={props.isOpen}
            handleClose={handleClose}
            header={
                <div className={Styles.iconHolder}>
                    <TwitterIcon className={Styles.icon} />
                </div>
            }
            footer={
                <>
                    <Button onClick={login} className={Styles.loginBtn}>
                        Login
                    </Button>
                    <p>
                        Don't have an account?{" "}
                        <button
                            onClick={togleLoginSignUp}
                            className={Styles.signUp}
                        >
                            Sign up
                        </button>
                    </p>
                </>
            }
        >
            <div className={Styles.main}>
                <h2 className={Styles.title}>Sign in to Twitter</h2>
                <Input
                    label={"Username"}
                    value={userName}
                    onChange={setUserName}
                    type="text"
                    err={errUser}
                    required
                />
                <Input
                    label={"Password"}
                    value={password}
                    onChange={setpassword}
                    type="password"
                    err={errPassword}
                    required
                />
            </div>
        </PopUp>
    );
}
