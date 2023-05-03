import Styles from './profile.module.css'
import Twitter from '../GeneralPage/Twitter'
import { useContext, useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'
import OnlyProfile from '../../Components/OnlyProfile'
import FollowCompnenetForSideBar from "../../Components/FollowComponentForSideBar";
import SearchBar from "../../Components/SearchBar";

export default function  Profile(){
    const data = useLoaderData();
    const {user} = useContext(AuthContext);
    console.log(data,"test");
    console.log(data);

    const navigate =  useNavigate();
    function onClick(element){
        return ()=>navigate(`/profile/${element.u_id}`)
    }

    console.warn(user);

    return (
        <Twitter
            firstElement={<OnlyProfile userToShow={data}/>}
            secondElement={
                <>
                    <SearchBar onClick={onClick}/>
                    <FollowCompnenetForSideBar key="FollowSideBar"/>
                </>
            }
        />
    )
}