import Style from "./index.module.css";
import defaultProfile from "/twitterPicture.jpg";
import Button from "../Button";
import { useContext, useState } from "react";
import AuthContext from "../../Context/AuthContext";
import { followUserApi, unFollowUserApi } from "../../Adapters/UserApi";

export default function SmallProfile(props) {
    let [follow, setFollow] = useState(false);
    const {user} = useContext(AuthContext);

    function followUser(){
        console.log(user);
        followUserApi(props.u_id,user.token)
        .then((result)=>{
            if(result === true){
                setFollow(true);
            }else{
                //TODO:: remove alert;
                alert("Sever error occure");
            }
        })
    }

    function unFollowUser(){
        unFollowUserApi(props.u_id,user.token)
        .then((result)=>{
            if(result === true ){
                setFollow(false);
            }else{
                alert("Sever error occure");
            }
        })
    }

    if(props.u_id === user.u_id){
        return <></>
    }

    return (
        <div className={Style.main}>
            <div className={Style.profileHolder}>
                <div
                    className={Style.profile}
                    style={{ background: (props.profilepicture == null)?`url(${defaultProfile})`:`url(http://localhost:4000/Profile/${props.profilepicture})`}}
                ></div>
            </div>
            <div className={Style.content}>
                <h3>{props.name}</h3>
                <p className={Style.username}> @{props.username}</p>
                {/* <p>Test</p> */}
            </div>
            <div className={Style.followHolder}>
                {(follow) ? (
                        <Button onClick={unFollowUser} className={Style.followedBtn}>Following</Button>
                    ) : (
                        <Button onClick={followUser} className={Style.followBtn}>Follow</Button>
                )}
            </div>
        </div>
    );
}

