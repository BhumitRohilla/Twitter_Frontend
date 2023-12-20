import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Notification from "./Pages/Notification/Notification";
import Explore from "./Pages/Explore/Explore";
import Message from "./Pages/Message/Message";
import Tweet from "./Pages/TweetPage/Tweet";
import Navbar from "./Components/Navbar/index";
import getToken from "./Adapters/Token";
import { loadProfile, loadTweet, userToShow } from "./Adapters/loaderApi";
export default function Router(user) {

    return createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
        <Route
            path="home"
            element={<ProtectedRoute element={<Home />} />}
        />
        <Route
            path="profile/:u_id"
            loader={({ params }) => {
                return loadProfile(params.u_id)
                    .then((data) => {
                        return data;
                    })
                    .catch((err) => {
                        console.log(err);
                        return null;
                    });
            }}
            element={<Profile />}
        />
        <Route
            path="notifications"
            element={<ProtectedRoute element={<Notification />} />}
        />
        <Route path="explore" element={<Explore />} />
        <Route
            path="message"
            loader={() => {
                return getToken(user.token)
                    .then((token) => {
                        if (token.newToken !== undefined) {
                            let newUser = { ...user };
                            setUser({ user }, "OldUser");
                            newUser.token = token.newToken;
                            setUser({ ...newUser });
                            token = token.newToken;
                        } else {
                            token = token.oldToken;
                        }
                        return userToShow(token)
                            .then((data) => {
                                return data;
                            })
                            .catch((err) => {
                                console.log(err);
                                return null;
                            });
                    })
                    .catch((err) => {
                        if (err.message == 401) {
                            setUser({});
                        }
                        return null;
                    });
            }}
            
            element={<ProtectedRoute element={<Message />} />}
        />
        <Route
            path="tweet/:t_id"
            loader={({ params }) => {
                return getToken(user.token)
                    .then((token) => {
                        if (token.newToken !== undefined) {
                            let newUser = { ...user };
                            setUser({ user }, "OldUser");
                            newUser.token = token.newToken;
                            setUser({ ...newUser });
                            token = token.newToken;
                        } else {
                            token = token.oldToken;
                        }
                        return loadTweet(params.t_id, token)
                            .then((data) => {
                                console.log(data);
                                return data;
                            })
                            .catch((err) => {
                                console.log(err);
                                return null;
                            });
                    })
                    .catch((err) => {
                        if (err.message == 401) {
                            setUser({});
                        }
                        return null;
                    });
            }}
            element={<ProtectedRoute element={<Tweet />} />}
        />
    </Route>))
}
