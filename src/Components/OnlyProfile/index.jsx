import Styles from "./index.module.css";
import Button from "../Button";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/AuthContext";
import TweetModel from "../TweetModel";
import getToken from "../../Adapters/Token";
import {
    getAllLikedOfUser,
    getCommentOfUser,
    getTweetsOfUser,
} from "../../Adapters/ProfileApi";
import defaultProfile from "/twitterPicture.jpg";

export default function OnlyProfile({ userToShow }) {
    const [step, changeStep] = useState(1);
    const { user, setUser } = useContext(AuthContext);

    const [tweet, setTweet] = useState([]);
    const [comment, setComment] = useState([]);
    const [likes, setLikedTweet] = useState([]);

    function handleCommentPress() {
        console.log("Comment");
    }
    function handleRetweetPress() {
        console.log("Retweet");
    }

    useEffect(() => {
        if (user.token === undefined) {
        } else {
            getToken(user.token)
                .then((token) => {
                    if (token.newToken !== undefined) {
                        let newUser = { ...user };
                        setUser({ user }, "OldUser");
                        newUser.token = token.newToken;
                        console.log(newUser);
                        setUser({ ...newUser });
                        token = token.newToken;
                    } else {
                        token = token.oldToken;
                    }
                    getTweetsOfUser(userToShow.u_id, token)
                        .then((data) => {
                            setTweet(data);
                        })
                        .catch((err) => {
                            console.log(err);
                            //TODO: remove alert
                            alert("Server error occures");
                        });

                    getCommentOfUser(userToShow.u_id, token)
                        .then((data) => {
                            console.log(data);
                            setComment(data);
                        })
                        .catch((Err) => {
                            console.log(Er);
                            alert("Server error occures");
                        });

                    getAllLikedOfUser(userToShow.u_id, token)
                        .then((data) => {
                            console.log(data);
                            setLikedTweet(data);
                        })
                        .catch((err) => {
                            console.log(err);
                            alert("Server error occures");
                        });
                })
                .catch((err) => {
                    if (err.message == 401) {
                        setUser({});
                    }
                });
        }
    }, []);

    return (
        <>
            <div className={Styles.header}>{userToShow.username}</div>
            <div className={Styles.headerpictureHolder}>
                {userToShow.headerpicture === null ? (
                    <div className={Styles.headerpicture} />
                ) : (
                    <img className={Styles.headerpicture} src={`http://localhost:4000/header/${userToShow.headerpicture}`} alt="" />
                )}
            </div>
            <div className={Styles.profileContent}>
                <div className={Styles.profileHolder}>
                    <div
                        className={Styles.profile}
                        style={
                            userToShow.profilepicture
                                ? {
                                      background: `url(http://localhost:4000/profile/${userToShow.profilepicture})`,
                                  }
                                : { background: `url(${defaultProfile})` }
                        }
                    ></div>
                    <Button className={Styles.followBtn}>Follow</Button>
                </div>
                <div>
                    <h2 className={Styles.nameTitle}>{userToShow.name}</h2>
                    <h4 className={Styles.usernamTitle}>
                        @{userToShow.username}
                    </h4>
                    <div></div>
                    <p className={Styles.followTitle}>
                        <span className={Styles.whiteText}>
                            {user.following}
                        </span>{" "}
                        Following &nbsp; &nbsp;{" "}
                        <span className={Styles.whiteText}>{user.follows}</span>{" "}
                        Followers
                    </p>
                </div>
            </div>

            <div className={Styles.btnCluster}>
                <button onClick={() => changeStep(1)} className={Styles.btn}>
                    <div className={step === 1 ? Styles.active : null}>
                        Tweets
                    </div>
                </button>
                <button onClick={() => changeStep(2)} className={Styles.btn}>
                    <div className={step === 2 ? Styles.active : null}>
                        Replies
                    </div>
                </button>
                <button onClick={() => changeStep(3)} className={Styles.btn}>
                    <div className={step === 3 ? Styles.active : null}>
                        Likes
                    </div>
                </button>
            </div>
            <div>
                {step === 1 && (
                    <>
                        {tweet.map((element) => {
                            return (
                                <TweetModel
                                    tweet={element}
                                    handleCommentPress={handleCommentPress}
                                    handleRetweetPress={handleRetweetPress}
                                />
                            );
                        })}
                    </>
                )}
                {step === 2 && (
                    <>
                        {comment.map((element) => {
                            return (
                                <TweetModel
                                    tweet={element}
                                    handleCommentPress={handleCommentPress}
                                    handleRetweetPress={handleRetweetPress}
                                />
                            );
                        })}
                    </>
                )}
                {step === 3 && (
                    <>
                        {likes.map((element) => {
                            return (
                                <TweetModel
                                    tweet={element}
                                    handleCommentPress={handleCommentPress}
                                    handleRetweetPress={handleRetweetPress}
                                />
                            );
                        })}
                    </>
                )}
            </div>
        </>
    );
}
