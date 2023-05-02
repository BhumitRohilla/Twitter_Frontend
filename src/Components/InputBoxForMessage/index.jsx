import Styles from "./index.module.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function MessageInput(props) {

    function send(){
        if(props.message.trim()!==''){
            props.send();
        }
    }

    return (
        <div
            className={`${props.className}  ${Styles.mainBody}`}
            style={{ ...props.style }}
        >
            <div className={Styles.btnContainer}>
            {props.showEmoji && (
                        <div className={Styles.emojiPicker}>
                            <Picker  data={data} onEmojiSelect={props.addEmoji} />
                        </div>
                    )}
                    <svg
                        onClick={() => {
                            props.changeShowEmoji(!props.showEmoji);
                        }}
                        className={`${Styles.svgCommon} ${Styles.svg}`}
                        width="193px"
                        height="193px"
                        viewBox="0 0 20.00 20.00"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        fill="#1d9bf0"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            {" "}
                            <title>emoji_happy_circle [#1d9bf0]</title>{" "}
                            <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                            <g
                                id="Page-1"
                                stroke-width="0.0002"
                                fill="none"
                                fill-rule="evenodd"
                            >
                                {" "}
                                <g
                                    id="Dribbble-Light-Preview"
                                    transform="translate(-380.000000, -5759.000000)"
                                    fill="#1d9bf0"
                                >
                                    {" "}
                                    <g
                                        id="icons"
                                        transform="translate(56.000000, 160.000000)"
                                    >
                                        {" "}
                                        <path
                                            d="M340,5607 C340,5608.105 339.105,5609 338,5609 C336.895,5609 336,5608.105 336,5607 C336,5605.895 336.895,5605 338,5605 C339.105,5605 340,5605.895 340,5607 M330,5609 C328.895,5609 328,5608.105 328,5607 C328,5605.895 328.895,5605 330,5605 C331.105,5605 332,5605.895 332,5607 C332,5608.105 331.105,5609 330,5609 M338.904,5611.453 C337.942,5616.931 330.058,5616.827 329.096,5611.349 C328.991,5610.751 329.482,5610.415 330.09,5610.415 L337.91,5610.415 C338.518,5610.415 339.009,5610.855 338.904,5611.453 M334,5617 C329.589,5617 326,5613.411 326,5609 C326,5604.589 329.589,5601 334,5601 C338.411,5601 342,5604.589 342,5609 C342,5613.411 338.411,5617 334,5617 M334,5599 C328.477,5599 324,5603.477 324,5609 C324,5614.523 328.477,5619 334,5619 C339.523,5619 344,5614.523 344,5609 C344,5603.477 339.523,5599 334,5599"
                                            id="emoji_happy_circle-[#1d9bf0]"
                                        >
                                            {" "}
                                        </path>{" "}
                                    </g>{" "}
                                </g>{" "}
                            </g>{" "}
                        </g>
                    </svg>

            </div>
            <input
                placeholder="Start a new Message"
                className={Styles.input}
                type="text"
                value={props.message}
                onChange={(ev)=>props.handleOnChange(ev.target.value)}
            />
            <div onClick={send} className={Styles.sendBtn}>
                <svg
                    className={`${Styles.svgCommon} ${
                        props.btnActive ? Styles.svg : Styles.svgDisabled
                    }`}
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
                            d="M20 4L3 11L10 14L13 21L20 4Z"
                            stroke="#ffffff"
                            stroke-width="1.5"
                            stroke-linejoin="round"
                        ></path>{" "}
                    </g>
                </svg>
            </div>
        </div>
    );
}
