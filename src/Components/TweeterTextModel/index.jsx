import { useNavigate } from "react-router-dom";
import Styles from "./index.module.css";
import defaultProfile from "/twitterPicture.jpg";
import Image from "../TweetImg";

export default function TweeterTextModel({ tweet, children, className }) {

    const navigate = useNavigate();
    
    function openProfile(ev){
        ev.stopPropagation();
        navigate(`/profile/${tweet.u_id}`);
    }
    return (
        <div className={`${Styles.mainBody} ${className}`}>
            <div onClick={(ev)=>openProfile(ev)} className={Styles.profileHolder}>
                <div
                    style={{
                        background:
                            tweet.profilepicture == null
                                ? `url(${defaultProfile})`
                                : `url(http://localhost:4000/Profile/${tweet.profilepicture})`,
                    }}
                    className={Styles.profile}
                ></div>
            </div>

            <div className={Styles.content}>
                <p className={Styles.userDetails}>{tweet.name} <span className={Styles.userId}> @{tweet.username}</span></p>
                <p>{tweet.text}</p>

                <div>
                    {tweet.img.split(" ").reduce((prev, current) => {
                        if (current.trim() !== "") {
                            prev.push(
                                <Image
                                    src={`http://localhost:4000/Tweets/${current}`}
                                    className={Styles.tweetImage}
                                />
                            );
                        }
                        return prev;
                    }, [])}
                </div>
                {children}
            </div>
            {tweet.commentof != null ? (
                <div className={Styles.comment}>comment</div>
            ) : (
                <></>
            )}
        </div>
    );
}
