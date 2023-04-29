import { useEffect, useRef, useState } from "react";
import Styles from "./index.module.css";
import FloaterDiv from "../FloaterElement";
import { searchUsers } from "../../Adapters/UserApi";
import SmallProfile from "../SmallProfile/index";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [focusStatus, changeFocusStatus] = useState(false);
    const inputRef = useRef(null);
    const [input, changeInput] = useState("");
    const [APIdata, setAPIdata] = useState([]);
    const [controller, changeController] = useState(new AbortController());
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (input.trim() !== "") {
            setLoading(true);
            searchUsers(input.trim(), controller.signal)
                .then((data) => {
                    setAPIdata([...data]);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
            return () => {
                controller.abort();
            };
        }
    }, [input]);

    function getPopUpValues() {
        if (input.trim() === "") {
            return (
                <div className={Styles.popUp}>
                    <p className={Styles.popUpText}>
                        Try searching for people, topics, or keywords
                    </p>
                </div>
            );
        } else {
            //TODO: Improve This
            if (loading) {
                return <p>Loading</p>;
            }
            if (APIdata.length === 0) {
                return <p>No Data Found</p>;
            }
            return APIdata.map((element) => {
                return (
                    <div  onClick={()=>navigate(`/profile/${element.u_id}`)} className={Styles.profileHolder}>
                        <SmallProfile {...element} />
                    </div>
                );
            });
        }
    }

    function handleChange(ev) {
        setAPIdata([]);
        controller.abort();
        changeController(new AbortController());
        changeInput(ev.target.value);
        setLoading(true);
    }

    function handleClosePopUp(){
        setTimeout(()=>changeFocusStatus(false),2000);
    }

    return (
        <FloaterDiv
            className={Styles.holder}
            popUpStatus={focusStatus}
            popUp={getPopUpValues()}
            popupClassName={Styles.popUpHolder}
        >
            <div
                onClick={() => {
                    changeFocusStatus(true);
                    inputRef.current.focus();
                }}
                className={`${Styles.mainBody} ${
                    focusStatus && Styles.mainBodyActive
                }`}
            >
                <svg
                    fill="#ffffff"
                    viewBox="0 0 1920 1920"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                            d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
                            fill-rule="evenodd"
                        ></path>{" "}
                    </g>
                </svg>
                <input
                    ref={inputRef}
                    onBlur={() => {
                        handleClosePopUp();
                    }}
                    onFocus={() => {
                        changeFocusStatus(true);
                    }}
                    value={input}
                    onChange={(ev) => {
                        handleChange(ev);
                    }}
                    className={Styles.input}
                    placeholder="Search on Tweeter"
                />
            </div>
        </FloaterDiv>
    );
}
