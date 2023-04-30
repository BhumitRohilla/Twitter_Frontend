import LoadingDiv from "../Loading";
import TweetModel from "../TweetModel";

export default function Steps({
    tweet,
    setTweet,
    handleCommentPress,
    handleRetweetPress,
    loading
}) {

    function handleLikePress(t_id,status){
        let newArray = tweet.map((element)=>{
            if(element.t_id === t_id){
                element.liked = status;
            }
            return element;
        })
        setTweet(newArray);
    }

    if(loading){
        return (
            <LoadingDiv/>
        )
    }

    return (
        <>
            {tweet.map((element) => {
                return (
                    <TweetModel
                        tweet={element}
                        handleCommentPress={handleCommentPress}
                        handleRetweetPress={handleRetweetPress}
                        handleLikePress = {handleLikePress}
                    />
                );
            })}
        </>
    );
}
