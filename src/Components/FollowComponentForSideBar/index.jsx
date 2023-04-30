import Styles from "./index.module.css";
import SmallFollowProfile from "../SmallFollowProfile/index";
import BackGroundGrayBox from "../BackGroundGrayBox/index";
import { useContext, useEffect, useState } from "react";
import getToken from "../../Adapters/Token";
import { getListOfUserToFollow } from "../../Adapters/UserApi";
import AuthContext from "../../Context/AuthContext";
import LoadingDiv from "../Loading";

export default function FollowCompnenetForSideBar() {
    const [loadingStatus, changeLoadingStatus] = useState(true);
    const [APIdata, setAPIData] = useState([]);
    const [offset, limit] = [0, 5];

    console.log(offset, limit);
    const { user, setUser } = useContext(AuthContext);
    useEffect(() => {
        console.log(APIdata);
        getToken(user.token)
            .then((token) => {
                if (token.newToken !== undefined) {
                    let newUser = { ...user };
                    setUser({ user }, "OldUser");
                    newUser.token = token.newToken;
                    console.log(newUser);
                    setUser({ ...newUser });
                    token = token.newToken;
                } else {
                    token = token.oldToken;
                }
                getListOfUserToFollow({ offset, limit }, token)
                    .then((data) => {
                        console.log(data);
                        setAPIData([...data]);
                        changeLoadingStatus(false);
                    })
                    .catch((err) => {
                        console.log(err);
                        changeLoadingStatus(false);
                    });
            })
            .catch((err) => {
                if (err.message == 401) {
                    setUser({});
                }
            });
    }, []);

    if (loadingStatus) {
        return (
            <BackGroundGrayBox>
                <LoadingDiv />
            </BackGroundGrayBox>
        );
    } else {
        return (
            <BackGroundGrayBox>
                <h2 className={Styles.title}>Who To Follow</h2>
                <div>
                    {APIdata.map((element) => {
                        return <SmallFollowProfile {...element} />;
                    })}
                </div>
            </BackGroundGrayBox>
        );
    }
}
