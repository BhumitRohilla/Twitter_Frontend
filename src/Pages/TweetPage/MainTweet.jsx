import { useState } from "react";
import TweetModel from "../../Components/TweetModel";
import Comment from "../../Components/Comment";
export default function MainTweet(props) {
    const [commentModel, setCommentModel] = useState(false);
    const [tweetToComment, setTweetToComment] = useState(null);
    
    function handleCommentPress(tweet) {
        setCommentModel(true);
        setTweetToComment(tweet);
    }

    function handleRetweetPress(){
        console.log("Test");
    }

    return (
        <div>
            <TweetModel
                key={props.tweet.t_id}
                tweet={props.tweet}
                handleCommentPress={handleCommentPress}
                handleRetweetPress={handleRetweetPress}
                className={props.className}
            />
            <br />
            <hr />
            <br />
            <hr />
            <Comment
                tweet={tweetToComment}
                isOpen={commentModel}
                handleClose={() => {
                    setCommentModel(false);
                    setTweetToComment(null);
                }}
                handleCommentData={props.handleCommentData}
            />
        </div>
    );
}
