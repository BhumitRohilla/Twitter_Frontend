import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContext from "./Context/AuthContext";
import Navbar from "./Components/Navbar/index";
import Home from './Pages/Home/Home'
import LoginPopUp from "./Components/LoginPopUp/index";
import "./App.css";
import ModelOpen from "./Context/OpenModel";
import { refreshApi } from "./Adapters/AuthApi";

//twitter
import twitterIcon from '/twitter.png';

function App() {

    //useState
    const [user, setUser] = useState({});
    const [login, setLogin] = useState(false);
    const [register, setReg] = useState(false);
    const [loading, setLoading] = useState(true);
    //useEffect
    useEffect(() => {
        refreshApi()
        .then((data)=>{
            setLoading(false);
            setUser(data);
        })
        .catch((err)=>{
            setLoading(false);
            console.log(err);
        })
    }, []);


    function openLogin(){
      setLogin(true);
    }
    
    function openSignUp(){
      setReg(true);
    }
    
    function togleLoginSignUp(){
      let loginStatus = login;
      if(login){
        console.log(login);
        setLogin(false);
        setReg(true);
      }else{
        setLogin(true);
        setReg(false);
      }
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navbar />,
            children: [
                {
                    // path: "explore",
                    // element: <Twitter />
                },
                {
                    path: 'home',
                    element: <Home/>
                }
            ],
        },
    ]);

    if(loading){
        return (
            <div>
                <div className="loadingDiv">
                    <img src={twitterIcon} alt="" />
                </div>
            </div>
        )
    }else{
        return (
            <div>
                <AuthContext.Provider value={{ user, setUser }}>
                    <ModelOpen.Provider value={{openLogin,openSignUp,togleLoginSignUp}}>
                        <LoginPopUp
                            isOpen={login}
                            handleClose={() => {
                                setLogin(false);
                            }}
                        />
                        <RouterProvider router={router} />
                    </ModelOpen.Provider>
                </AuthContext.Provider>
            </div>
        );
    }

}

export default App;
