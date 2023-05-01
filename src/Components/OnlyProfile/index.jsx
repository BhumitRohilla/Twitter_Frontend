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
import {
    checkAllUserTweets,
    followUserApi,
    getFollowStatus,
    unFollowUserApi,
    updateUser,
} from "../../Adapters/UserApi";
import ModelOpen from "../../Context/OpenModel";
import Comment from "../Comment/index";
import Steps from "./step1";
import EditProfilePopUp from "../EditProfilePopUp";
import { loadProfile } from "../../Adapters/loaderApi";

export default function OnlyProfile({ userToShow }) {
    //Context

    const [step, changeStep] = useState(1);
    const { user, setUser } = useContext(AuthContext);
    const { openLogin } = useContext(ModelOpen);
    const [tweet, setTweet] = useState([]);
    const [comment, setComment] = useState([]);
    const [likes, setLikedTweet] = useState([]);

    const [loading, setLoadingStatus] = useState(true);
    const [commentModel, setCommentModel] = useState(false);
    const [tweetToComment, setTweetToComment] = useState(null);

    const [following, changeFollowStatus] = useState(false);

    const [followrs, setFollower] = useState(parseInt(userToShow.follows));

    //FOR EDITING Profile
    const [editProfileStatus, setEditProfileStatus] = useState(false);
    const [headerInputFile, setHeaderInputFile] = useState(null);
    const [profileInputFile, setProfileInputFile] = useState(null);
    const [saving,setSaving] = useState(false);
    const [headerImg, setHeaderImg] = useState(
        userToShow.headerpicture
            ? `http://localhost:4000/Header/${userToShow.headerpicture}`
            : null
    );
    const [profileImg, setProfileImg] = useState(
        userToShow.profilepicture
            ? `http://localhost:4000/Profile/${userToShow.profilepicture}`
            : `${defaultProfile}`
    );
    const [name, setName] = useState(userToShow.name);
    const [bio, setBio] = useState(userToShow.bio);

    function handleCloseForEditProfile() {
        setEditProfileStatus(false);
        setHeaderInputFile(null);
        setProfileInputFile(null);
        setHeaderImg(
            userToShow.headerpicture
                ? `http://localhost:4000/Header/${userToShow.headerpicture}`
                : null
        );
        setProfileImg(
            userToShow.profilepicture
                ? `http://localhost:4000/Profile/${userToShow.profilepicture}`
                : `${defaultProfile}`
        );
        setName(userToShow.name);
        setBio(userToShow.bio);
    }

    function handleSubmitEditProfile() {
        console.log("Sending");
        const data = new FormData();
        data.append("name", name);
        data.append("bio", bio);
        data.append("headerImg", headerInputFile);
        data.append("profileImg", profileInputFile);
        if(userToShow.headerpicture !==undefined && headerImg === null){
            console.log("remove");
            data.append("headerRemove",true);
        }
            
        setSaving(true);
        getToken(user.token)
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

                updateUser(data, token)
                    .then((res) => {
                        // let newUser = {...user};
                        // newUser.profilepicture = data.profilepicture;
                        // newUser.headerpicture = data.headerpicture;
                        // newUser.name = data.name;
                        // newUser.bio = data.bio
                        // setUser(newUser);
                        if (res) {
                            return loadProfile(userToShow.u_id);
                        } else {
                            alert("Server error occure");
                        }
                    })
                    .then((data) => {
                        let newUser = { ...user };
                        newUser.profilepicture = data.profilepicture;
                        newUser.headerpicture = data.headerpicture;
                        newUser.name = data.name;
                        newUser.bio = data.bio;
                        userToShow.profilepicture = data.profilepicture;
                        userToShow.headerpicture = data.headerpicture;
                        userToShow.name = data.name;
                        userToShow.bio = data.bio;
                        setUser(newUser);
                        setSaving(false);
                    });
            })
            .catch((err) => {
                if (err.message == 401) {
                    setUser({});
                }
                setSaving(false);
            });
    }

    useEffect(() => {
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
                getFollowStatus(userToShow.u_id, token)
                    .then((res) => {
                        if (res === true) {
                            changeFollowStatus(true);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                if (err.message == 401) {
                    setUser({});
                }
            });
    }, [userToShow.u_id]);

    function handleCommentPress(tweet) {
        if (user.u_id !== undefined) {
            setCommentModel(true);
            setTweetToComment(tweet);
        } else {
            openLogin();
        }
    }
    function handleRetweetPress() {
        console.log("Retweet");
    }

    function followUser() {
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
                followUserApi(userToShow.u_id, user.token)
                    .then((result) => {
                        if (result === true) {
                            changeFollowStatus(true);
                            setFollower(followrs + 1);
                        } else {
                            //TODO:: remove alert;
                            alert("Sever error occure");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                if (err.message == 401) {
                    setUser({});
                }
            });
    }

    function unFollowUser() {
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
                unFollowUserApi(userToShow.u_id, user.token)
                    .then((result) => {
                        if (result === true) {
                            changeFollowStatus(false);
                            setFollower(followrs - 1);
                        } else {
                            alert("Sever error occure");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                if (err.message == 401) {
                    setUser({});
                }
            });
    }

    function openEditProfile() {
        setEditProfileStatus(true);
    }

    function handleSubmit() {}

    useEffect(() => {
        setLoadingStatus(true);
        if (user.token === undefined) {
            checkAllUserTweets(userToShow.u_id)
                .then((data) => {
                    setTweet(data);
                })
                .catch((err) => {
                    console.log(err);
                    //TODO: remove alert
                    alert("Server error occures");
                })
                .finally(() => {
                    setLoadingStatus(false);
                });
        } else {
            setLoadingStatus(true);
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
                        })
                        .finally(() => {
                            setLoadingStatus(false);
                        });

                    getCommentOfUser(userToShow.u_id, token)
                        .then((data) => {
                            setComment(data);
                        })
                        .catch((Err) => {
                            console.log(Er);
                            alert("Server error occures");
                        });

                    getAllLikedOfUser(userToShow.u_id, token)
                        .then((data) => {
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
    }, [userToShow.u_id]);

    function showTweet() {
        changeStep(1);
    }

    function showComment() {
        if (user.u_id != undefined) {
            changeStep(2);
        } else {
            openLogin();
        }
    }

    function showLikes() {
        if (user.u_id != undefined) {
            changeStep(3);
        } else {
            openLogin();
        }
    }

    return (
        <>
            <div className={Styles.header}>{userToShow.username}</div>
            <div className={Styles.headerpictureHolder}>
                {userToShow.headerpicture === null ? (
                    <div className={Styles.headerpicture} />
                ) : (
                    // <img
                    //     className={Styles.headerpicture}
                    //     src={`http://localhost:4000/header/${userToShow.headerpicture}`}
                    //     alt=""
                    // />
                    <div className={Styles.headerpicture} style={{background:`url(http://localhost:4000/header/${userToShow.headerpicture})`}}>

                    </div>
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
                    {userToShow.u_id !== user.u_id ? (
                        following ? (
                            <Button
                                onClick={() => unFollowUser()}
                                className={`${Styles.btnProfile} ${Styles.followingBtn}`}
                            >
                                Following
                            </Button>
                        ) : (
                            <Button
                                onClick={() => followUser()}
                                className={`${Styles.btnProfile} ${Styles.followBtn}`}
                            >
                                Follow
                            </Button>
                        )
                    ) : (
                        <Button
                            onClick={openEditProfile}
                            className={`${Styles.btnProfile} ${Styles.editProfileBtn}`}
                        >
                            Edit Profile
                        </Button>
                    )}
                </div>
                <div>
                    <h2 className={Styles.nameTitle}>{userToShow.name}</h2>
                    <h4 className={Styles.usernamTitle}>
                        @{userToShow.username}
                    </h4>
                    {userToShow.bio && (
                        <p className={Styles.bio}>{userToShow.bio}</p>
                    )}
                    <div></div>
                    <p className={Styles.followTitle}>
                        <span className={Styles.whiteText}>
                            {userToShow.following}
                        </span>{" "}
                        Following &nbsp; &nbsp;{" "}
                        <span className={Styles.whiteText}>{followrs}</span>{" "}
                        Followers
                    </p>
                </div>
            </div>

            <div className={Styles.btnCluster}>
                <button onClick={showTweet} className={Styles.btn}>
                    <div className={step === 1 ? Styles.active : null}>
                        Tweets
                    </div>
                </button>
                <button onClick={showComment} className={Styles.btn}>
                    <div className={step === 2 ? Styles.active : null}>
                        Replies
                    </div>
                </button>
                <button onClick={showLikes} className={Styles.btn}>
                    <div className={step === 3 ? Styles.active : null}>
                        Likes
                    </div>
                </button>
            </div>
            <div>
                {step === 1 && (
                    <Steps
                        tweet={tweet}
                        setTweet={setTweet}
                        loading={loading}
                        handleCommentPress={handleCommentPress}
                        handleRetweetPress={handleRetweetPress}
                    />
                )}
                {step === 2 && (
                    <>
                        <Steps
                            tweet={comment}
                            setTweet={setComment}
                            loading={loading}
                            handleCommentPress={handleCommentPress}
                            handleRetweetPress={handleRetweetPress}
                        />
                    </>
                )}
                {step === 3 && (
                    <>
                        <Steps
                            tweet={likes}
                            setTweet={setLikedTweet}
                            loading={loading}
                            handleCommentPress={handleCommentPress}
                            handleRetweetPress={handleRetweetPress}
                        />
                    </>
                )}
            </div>
            <div>
                <Comment
                    tweet={tweetToComment}
                    isOpen={commentModel}
                    handleClose={() => {
                        setCommentModel(false);
                        setTweetToComment(null);
                    }}
                />
            </div>
            <EditProfilePopUp
                isOpen={editProfileStatus}
                handleClose={handleCloseForEditProfile}
                headerImg={headerImg}
                setHeaderImg={setHeaderImg}
                profileImg={profileImg}
                setProfileImg={setProfileImg}
                name={name}
                setName={setName}
                bio={bio}
                setBio={setBio}
                headerInputFile={headerInputFile}
                profileInputFile={profileInputFile}
                setHeaderInputFile={setHeaderInputFile}
                setProfileInputFile={setProfileInputFile}
                submit={handleSubmitEditProfile}
                loading = {saving}
            />
        </>
    );
}
