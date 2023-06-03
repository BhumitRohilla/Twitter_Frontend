import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import Twitter from "../GeneralPage/Twitter";
import Styles from "./home.module.css";
import Button from "../../Components/Button";
import AuthContext from "../../Context/AuthContext";

import { getTweets, tweetSend } from "../../Adapters/Tweet";
import TweetModel from "../../Components/TweetModel/index";
import TweeterInputOptions from "../../Components/TweeterInputOptions";
import Comment from "../../Components/Comment/index";
import TweetInputField from "../../Components/TweetInputField";
import UserProfilePicture from "../../Components/UserProfilePicture";
import getToken from "../../Adapters/Token";
import FollowCompnenetForSideBar from "../../Components/FollowComponentForSideBar";
import SearchBar from "../../Components/SearchBar";
import LoadingDiv from "../../Components/Loading";
import { useNavigate } from "react-router-dom";
const numberOfTweets = 100;

export default function Home() {

    const { user, setUser } = useContext(AuthContext);
    const [tweet, changeTweet] = useState("");
    const [showEmoji, changeShowEmoji] = useState(false);
    const [imgFile, changeImgFile] = useState([]);
    const [sending, changeSendState] = useState(false);
    const [currentView, changeView] = useState("Following");
    const [length, changeLength] = useState([0, 0]);

    const [followTweets, setFollowTweets] = useState([]);
    const [forYouTweets, setForYouTweets] = useState([]);

    //
    const [commentModel, setCommentModel] = useState(false);
    const [tweetToComment, setTweetToComment] = useState(null);

    //loading
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    function sideBarOnClick(element){
        return ()=>navigate(`/profile/${element.u_id}`)
    }


    function handleInput(ev) {
        changeTweet(ev.target.value);
        changeShowEmoji(false);
        console.log(tweet);
    }

    function addEmoji(data) {
        console.log(data);
    }

    function addEmoji(e) {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        changeTweet(tweet + emoji);
    }

    function handleFile(ev) {
        if (ev.target.files.length + imgFile.length > 4) {
            alert("Only four images are allowed");
        } else {
            let filesToPush = [];
            for (let i = 0; i < ev.target.files.length; ++i) {
                filesToPush.push(ev.target.files[i]);
            }
            changeImgFile([...imgFile, ...filesToPush]);
        }
    }

    function handleCommentPress(tweet) {
        setCommentModel(true);
        setTweetToComment(tweet);
    }

    function handleRetweetPress(tweet) {
        console.log(tweet);
    }

    function handleCommentData(tweet) {
        console.log(tweet);
        setFollowTweets([tweet, ...followTweets]);
    }

    useEffect(() => {
        let type;
        let start = length;
        switch (currentView) {
            case "For You": {
                type = "UserSuggestion";
                start = start[0];
                break;
            }
            case "Following": {
                type = "follow";
                start = start[1];
                break;
            }
        }

        getToken(user.token)
            .then((token) => {
                setLoading(true);
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
                getTweets(type, { start, length: numberOfTweets }, token)
                    .then((data) => {
                        setLoading(false);
                        if (type === "follow") {
                            setFollowTweets([...followTweets, ...data]);
                            let newLength = length;
                            newLength[1] = length[1] + data.length;
                            changeLength([...newLength]);
                        } else {
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        changeSendState(false);
                        changeTweet("");
                        changeImgFile([]);
                    });
            })
            .catch((err) => {
                if (err.message == 401) {
                    setUser({});
                }
            });
    }, [currentView]);

    function submit() {
        //checks;
        if (tweet.trim() === "") {
            return;
        }

        changeSendState(true);

        const data = new FormData();
        data.append("tweet", tweet);
        imgFile.forEach((file) => {
            data.append("tweetImg", file);
        });
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
                console.log(token);
                tweetSend(data, token)
                    .then((data) => {
                        console.log(data);
                        setFollowTweets([data.result, ...followTweets]);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        changeSendState(false);
                        changeTweet("");
                        changeImgFile([]);
                    });
            })
            .catch((err) => {
                if (err.message == 401) {
                    setUser({});
                }
            });
    }

    function removeImage(i) {
        console.log(i);
        let newImageArray = imgFile.filter((element, index) => {
            if (index === i) {
                return false;
            }
            return true;
        });
        changeImgFile(newImageArray);
    }

    function addToInput(textToAdd,hash) {
        let newString = tweet.split([" "]);
        newString.pop();
        if(hash){
            newString.push(`#${textToAdd} `)
        }else{
            newString.push(`@${textToAdd} `);
        }
        newString = newString.join(" ");
        changeTweet(newString);
    }


    function firstElement() {
        return (
            <>
                <div className={Styles.header}>
                    <div className={Styles.headerTitleContainer}>
                        <h3 className={Styles.headerTitle}>Home</h3>
                    </div>
                    <div className={Styles.buttonCluster}>
                        <div
                            onClick={() => {
                                currentView != "For You" &&
                                    changeView("For You");
                            }}
                            className={
                                `${Styles.topButton} ` +
                                (currentView === "For You"
                                    ? Styles.currentView
                                    : "")
                            }
                        >
                            <p>For You</p>
                        </div>
                        <div
                            onClick={() => {
                                currentView != "Following" &&
                                    changeView("Following");
                            }}
                            className={
                                `${Styles.topButton} ` +
                                (currentView === "Following"
                                    ? Styles.currentView
                                    : "")
                            }
                        >
                            <p>Following</p>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        `${Styles.tweetCreation} ` +
                        (sending ? Styles.sending : "")
                    }
                >
                    <div className={Styles.profileHolder}>
                        <UserProfilePicture className={Styles.profile} />
                    </div>
                    <div className={Styles.mainHolder}>
                        <TweetInputField
                            handleInput={handleInput}
                            text={tweet}
                            imgFile={imgFile}
                            placeholder={"What's happening?"}
                            removeImage={removeImage}
                            addToInput={addToInput}
                        />
                        <div className={Styles.tweeterTweet}>
                            <TweeterInputOptions
                                className={Styles.tweetAddon}
                                addEmoji={addEmoji}
                                changeImgFile={changeImgFile}
                                showEmoji={showEmoji}
                                changeShowEmoji={changeShowEmoji}
                                handleFile={handleFile}
                            />
                            <div>
                                <Button
                                    className={Styles.tweetBtn}
                                    onClick={submit}
                                >
                                    Tweet
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                {loading?<LoadingDiv/> :(
                    currentView === "Following" ? (
                        <>
                            {followTweets.map((element) => {
                                return (
                                    <TweetModel
                                        key={element.t_id}
                                        tweet={element}
                                        handleCommentPress={handleCommentPress}
                                        handleRetweetPress={handleRetweetPress}
                                        className={Styles.tweetHolder}
                                    />
                                );
                            })}
                        </>
                    ) : (
                        <>test</>
                    ))}
                </div>
                <div>
                    <Comment
                        tweet={tweetToComment}
                        isOpen={commentModel}
                        handleClose={() => {
                            setCommentModel(false);
                            setTweetToComment(null);
                        }}
                        handleCommentData={handleCommentData}
                    />
                </div>
            </>
        );
    }

    return (
        <Twitter
            firstElement={firstElement()}
            secondElement={
                <>
                    <SearchBar onClick={sideBarOnClick} />
                    <FollowCompnenetForSideBar key="FollowSideBar" />
                </>
            }
        />
    );
}
