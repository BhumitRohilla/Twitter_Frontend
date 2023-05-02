import Styles from "./index.module.css";
import TweetModel from "../TweetModel/index";
import { useContext, useEffect, useState } from "react";
import LoadingDiv from "../Loading";
import AuthContext from "../../Context/AuthContext";
import getNotification from "../../Adapters/UserApi";
import getToken from "../../Adapters/Token";
import Comment from "../Comment";
export default function Notifcation() {
    const [loading, setLoading] = useState(true);
    const { user, setUser } = useContext(AuthContext);
    const [tweet, setTweet] = useState([]);

    const [tweetToComment, setTweetToComment] = useState(null);
    const [commentModel, setCommentModel] = useState(false);

    function handleCommentPress(tweet) {
        setTweetToComment(tweet);
        setCommentModel(true);
    }
    function handleRetweetPress() {
        console.log("Retweet");
    }

    useEffect(() => {
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
                getNotification(token)
                    .then((data) => {
                        setTweet(data);
                        setLoading(false);
                    })
                    .catch((err) => {
                        setLoading(false);
                    });
            })
            .catch((err) => {
                if (err.message == 401) {
                    setUser({});
                }
                setLoading(false);
            });
    }, []);

    return (
        <>
            <h3 className={Styles.heading}>Notifcation</h3>
            {loading ? (
                <LoadingDiv />
            ) : tweet.length === 0 ? (
                <div className={Styles.noNotificationParent}>
                    <h5 className={Styles.noNotification}>No Notifications</h5>
                </div>
            ) : (
                tweet.map((element) => {
                    return (
                        <TweetModel
                            tweet={element}
                            handleCommentPress={handleCommentPress}
                            handleRetweetPress={handleRetweetPress}
                            className={Styles.tweet}
                        />
                    );
                })
            )}
            <>
                <Comment
                    tweet={tweetToComment}
                    isOpen={commentModel}
                    handleClose={() => {
                        setCommentModel(false);
                        setTweetToComment(null);
                    }}
                />
            </>
        </>
    );
}
