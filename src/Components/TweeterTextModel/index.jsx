import { useNavigate } from "react-router-dom";
import Styles from "./index.module.css";
import defaultProfile from "/twitterPicture.jpg";

export default function TweeterTextModel({ tweet, children, className }) {

    const navigate = useNavigate();
    
    return (
        <div className={`${Styles.mainBody} ${className}`}>
            <div onClick={()=>navigate(`/profile/${tweet.u_id}`)} className={Styles.profileHolder}>
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
                <p className={Styles.userId}>@{tweet.username}</p>
                <p>{tweet.text}</p>

                <div>
                    {tweet.img.split(" ").reduce((prev, current) => {
                        if (current.trim() !== "") {
                            prev.push(
                                <img
                                    src={`http://localhost:4000/Tweets/${current}`}
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
