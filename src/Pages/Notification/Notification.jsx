import Twitter from "../GeneralPage/Twitter";
import Styles from "./notification.module.css";
import SearchBar from "../../Components/SearchBar";
import FollowCompnenetForSideBar from "../../Components/FollowComponentForSideBar";
import Notifcation from "../../Components/Notification";
import { useNavigate } from "react-router-dom";
export default function NotificationPage() {
    const navigate = useNavigate();
    function onClick(element){
        return ()=>navigate(`/profile/${element.u_id}`)
    }

    return (
        <Twitter
            firstElement={<Notifcation/>}
            secondElement={
                <>
                    <SearchBar onClick={onClick}/>
                    <FollowCompnenetForSideBar key="FollowSideBar"/>
                </>
            }
        />
    );
}


