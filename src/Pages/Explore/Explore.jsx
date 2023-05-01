import Twitter from "../GeneralPage/Twitter";
import SearchBar from "../../Components/SearchBar";
import SideBarComponenetWhenLogedOut from "../../Components/SideBarComponenetWhenLogedOut/index";
import ExploreItem from "../../Components/Explore";
import { useEffect, useState } from "react";

export default function Explore() {
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        
    },[])

    return (
        <Twitter
            firstElement={
                <>
                    <SearchBar />
                    
                </>
            }
            secondElement={
                <>
                    <SideBarComponenetWhenLogedOut />
                </>
            }
        />
    );
}
