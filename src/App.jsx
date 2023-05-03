import { useEffect, useState } from "react";

import AuthContext from "./Context/AuthContext";
import LoginPopUp from "./Components/LoginPopUp/index";
import SignupPopUp from "./Components/Signup";
import "./App.css";
import ModelOpen from "./Context/OpenModel";
import { refreshApi } from "./Adapters/AuthApi";
//twitter
import twitterIcon from "/twitter.png";


import Router from "./Router";
import { RouterProvider } from "react-router-dom";
function App() {
    //useState
    const [user,setUser] = useState({});
    const [login, setLogin] = useState(false);
    const [register, setReg] = useState(false);
    const [loading, setLoading] = useState(true);

    //useEffect

    useEffect(() => {
        refreshApi()
            .then((data) => {
                setLoading(false);
                setUser(data);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, []);

    function openLogin() {
        setLogin(true);
        setReg(false);
    }

    function openSignUp() {
        setReg(true);
        setLogin(false);
    }

    function togleLoginSignUp() {
        if (login) {
            console.log(login);
            setLogin(false);
            setReg(true);
        } else {
            setLogin(true);
            setReg(false);
        }
    }


    if (loading) {
        return (
            <div>
                <div className="loadingDiv">
                    <img src={twitterIcon} alt="" />
                </div>
            </div>
        );
    } else {
        return (
            <div>
           <div>
                <AuthContext.Provider value={{user,setUser}}>
                    <ModelOpen.Provider
                        value={{ openLogin, openSignUp, togleLoginSignUp }}
                    >
                        <LoginPopUp
                            isOpen={login}
                            handleClose={() => {
                                setLogin(false);
                            }}
                        />
                        <SignupPopUp
                            isOpen={register}
                            handleClose={() => {
                                setReg(false);
                            }}
                        />
                        <RouterProvider router={Router(user,setUser)} />
                    </ModelOpen.Provider>
                </AuthContext.Provider>
            </div>
            </div>
        );
    }
}

export default App;
