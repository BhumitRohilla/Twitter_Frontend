import Twitter from "../GeneralPage/Twitter";
import SearchBar from "../../Components/SearchBar";
import FollowCompnenetForSideBar from "../../Components/FollowComponentForSideBar";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import LoadingDiv from "../../Components/Loading";
import MainTweet from "./MainTweet";
import Styles from "./index.module.css";
import { getCommentTweet } from "../../Adapters/Tweet";
import getToken from "../../Adapters/Token";
import AuthContext from "../../Context/AuthContext";
import TweetModel from "../../Components/TweetModel";
import Comment from "../../Components/Comment";

export default function Tweets() {
    const tweetToShow = useLoaderData();
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const { user, setUser } = useContext(AuthContext);

    const [commentModel, setCommentModel] = useState(false);
    const [tweetToComment, setTweetToComment] = useState(null);

    function handleCommentPress(tweet) {
        setCommentModel(true);
        setTweetToComment(tweet);
    }

    function handleCommentData(data) {
        console.log(data);
        setComments([data, ...comments]);
    }

    function handleRetweetPress() {
        console.log("comment pressed");
    }

    function sidebarOnClick(element){
        return ()=>navigate(`/profile/${element.u_id}`)
    }


    useEffect(() => {
        setLoading(true);
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
                getCommentTweet(tweetToShow.t_id, token).then((data) => {
                    setLoading(false);
                    console.log(data);
                    setComments(data);
                });
            })
            .catch((err) => {
                if (err.message == 401) {
                    setUser({});
                }
                return null;
            });
    }, [tweetToShow]);
    return (
        <Twitter
            firstElement={
                <>
                    <h2>Tweet</h2>
                    <MainTweet
                        className={Styles.mainTweet}
                        tweet={tweetToShow}
                        handleCommentPress={handleCommentPress}
                        handleRetweetPress={handleRetweetPress}
                        handleCommentData={handleCommentData}
                    />
                    <div className={Styles.tweetHolder}>
                        {loading ? (
                            <LoadingDiv />
                        ) : (
                            comments.map((element) => {
                                return (
                                    <TweetModel
                                        key={element.t_id}
                                        tweet={element}
                                        handleCommentPress={handleCommentPress}
                                        handleRetweetPress={handleRetweetPress}
                                        className={Styles.tweets}
                                        
                                    />
                                );
                            })
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
                </>
            }
            secondElement={
                <>
                    <SearchBar onClick={sidebarOnClick}/>
                    <FollowCompnenetForSideBar key="FollowSideBar" />
                </>
            }
        />
    );
}
