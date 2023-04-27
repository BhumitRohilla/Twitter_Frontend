import React, { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
import BottomBar from '../BottomBar/index'
import SideBar from '../SideBar/index'
import { Outlet } from 'react-router-dom'

export default function Navbar(){
    let {user} = useContext(AuthContext);
    console.log(user);
    if(user.username === undefined){
        return (
            <>
                <div className='main-container'>
                    <div className='first'>
                        <SideBar />
                    </div>
                    <div className='second'>
                        <Outlet />
                    </div>
                </div>
                <BottomBar/>
            </>
        )
    }else{
        return(
            <>
                <div className='main-container'>
                    <div className='first'>
                        <SideBar userName={user.username} />
                    </div>
                    <div className= 'second'>
                        <Outlet />
                    </div>
                </div>
            </>
        )
    }
}