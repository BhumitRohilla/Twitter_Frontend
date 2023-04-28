import { useEffect, useState } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import AuthContext from "./Context/AuthContext";
import Navbar from "./Components/Navbar/index";
import Home from "./Pages/Home/Home";
import LoginPopUp from "./Components/LoginPopUp/index";
import SignupPopUp from "./Components/Signup";
import "./App.css";
import ModelOpen from "./Context/OpenModel";
import { refreshApi } from "./Adapters/AuthApi";
import TweetPopUpModel from "./Components/TweetPopUpModel";
//twitter
import twitterIcon from "/twitter.png";
import ProtectedRoute from "./Components/ProtectedRoute";
import { loadProfile } from "./Adapters/loaderApi";
import Profile from "./Pages/Profile/Profile";

function App() {
    //useState
    const [user, setUser] = useState({});
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
        let loginStatus = login;
        if (login) {
            console.log(login);
            setLogin(false);
            setReg(true);
        } else {
            setLogin(true);
            setReg(false);
        }
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Navbar />}>
                <Route
                    path="home"
                    element={<ProtectedRoute element={<Home />} />}
                />
                <Route
                    path="profile/:u_id"
                    loader={({ params }) => {
                        return loadProfile(params.u_id)
                        .then((data)=>{
                            return data;
                        })
                        .catch((err)=>{
                            console.log(err);
                            return null;
                        })
                    }}
                    element={<Profile/>}
                />
            </Route>
        )
    );
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
                <AuthContext.Provider value={{ user, setUser }}>
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
                        <RouterProvider router={router} />
                    </ModelOpen.Provider>
                </AuthContext.Provider>
            </div>
        );
    }
}

export default App;
