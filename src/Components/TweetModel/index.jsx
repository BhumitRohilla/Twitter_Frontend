import Styles from "./index.module.css";
import TweeterTextModel from "../TweeterTextModel";

export default function TweetModel({
    tweet,
    handleCommentPress,
    handleRetweetPress,
    handleLikePress,
}) {
    return (
        <TweeterTextModel tweet={tweet}>
            <div className={Styles.btnCluster}>
                <button onClick={()=>handleCommentPress(tweet)} className={`${Styles.button} ${Styles.commentBtn}`}>
                    <svg
                        className={`${Styles.comment} ${Styles.svg}`}
                        fill="#ffffff"
                        viewBox="0 0 22 22"
                        xmlns="http://www.w3.org/2000/svg"
                        id="memory-comment"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M2 2H20V3H21V17H20V18H12V19H11V20H10V21H6V18H2V17H1V3H2V2M3 4V16H8V19H9V18H10V17H11V16H19V4H3Z"></path>
                        </g>
                    </svg>
                    <p>Test</p>
                </button>
                <button onClick={()=>handleRetweetPress(tweet)} className={`${Styles.button} ${Styles.retweetBtn}`}>
                    <svg
                        className={`${Styles.svg} ${Styles.retweet}`}
                        fill="#000000"
                        viewBox="0 0 24 24"
                        id="retweet-rounsd"
                        data-name="Flat Line"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon flat-line"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                id="primary"
                                d="M18.46,7.11A6,6,0,0,1,15,18H10"
                                className={Styles.retweet}
                                style={{
                                    fill: "none",
                                    stroke: "#ffffff",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                }}
                            ></path>
                            <path
                                id="primary-2"
                                data-name="primary"
                                d="M5.54,16.89A6,6,0,0,1,9,6h5"
                                className={Styles.retweet}
                                style={{
                                    fill: "none",
                                    stroke: "#ffffff",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                }}
                            ></path>
                            <polyline
                                id="primary-3"
                                data-name="primary"
                                points="12 20 10 18 12 16"
                                className={Styles.retweet}
                                style={{
                                    fill: "none",
                                    stroke: "#ffffff",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                }}
                            ></polyline>
                            <polyline
                                id="primary-4"
                                data-name="primary"
                                points="12 4 14 6 12 8"
                                className={Styles.retweet}
                                style={{
                                    fill: "none",
                                    stroke: "#ffffff",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                }}
                            ></polyline>
                        </g>
                    </svg>
                    <p>Test</p>
                </button>
                <button onClick={()=>handleLikePress(tweet)} className={`${Styles.button} ${Styles.likeBtn}`}>
                    <svg
                        className={`${Styles.like} ${Styles.svg}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            {" "}
                            <g id="Interface / Heart_01">
                                {" "}
                                <path
                                    id="Vector"
                                    d="M12 7.69431C10 2.99988 3 3.49988 3 9.49991C3 15.4999 12 20.5001 12 20.5001C12 20.5001 21 15.4999 21 9.49991C21 3.49988 14 2.99988 12 7.69431Z"
                                    stroke="#ffffff"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>{" "}
                            </g>{" "}
                        </g>
                    </svg>
                    <p>Test</p>
                </button>
                <button className={`${Styles.button}`}>
                    <svg
                        className={` ${Styles.svg}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 6C12 5.44772 11.5523 5 11 5C10.4477 5 10 5.44772 10 6V16C10 16.5523 10.4477 17 11 17C11.5523 17 12 16.5523 12 16V6ZM9 9C9 8.44772 8.55228 8 8 8C7.44772 8 7 8.44772 7 9V16C7 16.5523 7.44772 17 8 17C8.55228 17 9 16.5523 9 16V9ZM15 9C15 8.44772 14.5523 8 14 8C13.4477 8 13 8.44772 13 9V16C13 16.5523 13.4477 17 14 17C14.5523 17 15 16.5523 15 16V9ZM18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13V16C16 16.5523 16.4477 17 17 17C17.5523 17 18 16.5523 18 16V13ZM6 15C6 14.4477 5.55228 14 5 14C4.44772 14 4 14.4477 4 15V16C4 16.5523 4.44772 17 5 17C5.55228 17 6 16.5523 6 16V15ZM21 15C21 14.4477 20.5523 14 20 14C19.4477 14 19 14.4477 19 15V16C19 16.5523 19.4477 17 20 17C20.5523 17 21 16.5523 21 16V15ZM4 18C3.44772 18 3 18.4477 3 19C3 19.5523 3.44772 20 4 20H21C21.5523 20 22 19.5523 22 19C22 18.4477 21.5523 18 21 18H4Z"
                                fill="#ffffff"
                            ></path>{" "}
                        </g>
                    </svg>
                    <p>Test</p>
                </button>
            </div>
        </TweeterTextModel>
    );
}
