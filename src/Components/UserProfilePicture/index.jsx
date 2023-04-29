import { useContext } from "react";
import defaultProfile from "/twitterPicture.jpg";
import AuthContext from "../../Context/AuthContext";

export default function UserProfilePicture({className,style}) {
    const {user} = useContext(AuthContext);
    return (
        <div
            style={{
                background:
                    user.profilepicture == null
                        ? `url(${defaultProfile})`
                        : `url(http://localhost:4000/Profile/${user.profilepicture})`,
            ...style}}
            className={className}
        ></div>
    );
}
