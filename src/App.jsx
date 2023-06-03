import { useContext, useState } from "react";
import AuthContext, { AuthProvider } from "./Context/AuthContext";
import LoginPopUp from "./Components/LoginPopUp/index";
import SignupPopUp from "./Components/Signup";
import "./App.css";
import ModelOpen from "./Context/OpenModel";

//twitter
import twitterIcon from "/twitter.png";

import Router from "./Router";
import { RouterProvider } from "react-router-dom";


function App() {
    const [login, setLogin] = useState(false);
    const [register, setReg] = useState(false);
    const {user,loading} = useContext(AuthContext);
    //useEffect

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

    console.dir(AuthProvider);

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
                        <RouterProvider router={Router(user)} />
                    </ModelOpen.Provider>
                </div>
            </div>
        );
    }
}

export default App;
