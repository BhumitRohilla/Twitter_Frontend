import Styles from "./index.module.css";
import defaultProfile from "/twitterPicture.jpg";

export default function TweeterTextModel({tweet,children,className}){
    return (
        <div className={`${Styles.mainBody} ${className}`}>
        <div className={Styles.profileHolder}>
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
    </div>
    )
}