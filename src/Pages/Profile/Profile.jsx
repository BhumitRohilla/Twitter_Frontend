import Styles from './profile.module.css'
import Twitter from '../GeneralPage/Twitter'
import { useContext, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'
import OnlyProfile from '../../Components/OnlyProfile'

export default function  Profile(){
    const data = useLoaderData();
    const {user} = useContext(AuthContext);
    console.log(data,"test");
    return (
        <Twitter
            firstElement={<OnlyProfile user={data}/>}
            secondElement={<>Test</>}
        />
    )
}