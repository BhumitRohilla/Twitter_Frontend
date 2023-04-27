import React, { useContext, useState } from 'react'
import PopUp from '../PopUp'
import Styles from './index.module.css'
import Input from '../InputBox/index'
import Button from '../Button';
import { validUserName } from '../../Adapters/rejexFunciton';
import {loginApi} from '../../Adapters/AuthApi';
import AuthContext from '../../Context/AuthContext';
import ModelOpen from '../../Context/OpenModel';
import TwitterIcon from '../../assets/twitterIcon'

export default function index(props) {
  const [userName, setUserName] = useState('');
  const [password, setpassword] = useState('');
  const {setUser} = useContext(AuthContext);
  const {togleLoginSignUp}  = useContext(ModelOpen);

  async function login(){
    if(validUserName(userName) || userName.trim() === ''){
      console.log(userName);
    }else{
      //TODO: Remove this alertfunction
      return alert("Invalid userName");
    }

    if(password.trim() === ''){
      return alert("Password cannot be empty");
    }
    try{
      let result = await loginApi(userName,password);
      setUser(result);
      props.handleClose();
    }
    catch(err){
      console.log(err.message);
      console.log(err);
    }
  }

  return (
    <PopUp isOpen={props.isOpen} handleClose={props.handleClose} header={<div className={Styles.iconHolder}><TwitterIcon className={Styles.icon}/></div>} footer={<><Button onClick={login} className={Styles.loginBtn}>Login</Button><p>Don't have an account? <button onClick={togleLoginSignUp} className={Styles.signUp}>Sign up</button></p></>}>
      <div className={Styles.main}>
        <h2 className={Styles.title}>Sign in to Twitter</h2>
        <Input label={'User Name'} value={userName} onChange={setUserName} type="text" required/>
        <Input label={'Password'} value={password} onChange={setpassword} type="password" required/>
      </div>
    </PopUp>
  )
}
