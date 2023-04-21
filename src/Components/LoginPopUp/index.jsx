import React, { useState } from 'react'
import PopUp from '../PopUp'
import Styles from './index.module.css'
import Input from '../InputBox/index'
import Button from '../Button';

export default function index(props) {
  const [userName, setUserName] = useState('');
  const [password, setpassword] = useState('');
  return (
    <PopUp isOpen={props.isOpen} handleClose={props.handleClose}>
      <div className={Styles.main}>
        <h2 className={Styles.title}>Sign in to Twitter</h2>
        <Input label={'User Name'} value={userName} onChange={setUserName} type="text" required/>
        <Input label={'Password'} value={password} onChange={setpassword} type="password" required/>
        <Button className={Styles.button}>Next</Button>
      </div>
    </PopUp>
  )
}
