import Styles from "./index.module.css";
import defaultProfile from "/twitterPicture.jpg";
export default function MessageUserInfo({ user }) {
    return (
        <div className={Styles.mainBody}>
            <div
                className={Styles.profile}
                style={{
                    background: user.profilepicture
                        ? `url(http://localhost:4000/Profile/${user.profilepicture})`
                        : `url(${defaultProfile})`,
                }}
            />
            <div style={{textAlign:"center"}}>
                <p>{user.name}</p>
                <p className={Styles.grayText}>@{user.username}</p>
            </div>
        </div>
    );
}
