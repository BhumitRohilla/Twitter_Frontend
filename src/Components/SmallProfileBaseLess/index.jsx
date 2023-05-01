import { useNavigate } from 'react-router-dom';
import Style from './index.module.css'
import defaultProfile from "/twitterPicture.jpg";

export default function SmallProfile(props){
    return (
        <>
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
        </>
    )
}