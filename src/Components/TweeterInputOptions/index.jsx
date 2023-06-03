import React from "react";
import { useRef, useState } from "react";
import Styles from "./index.module.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function TweeterInputOptions({
    handleFile,
    showEmoji,
    changeShowEmoji,
    addEmoji,
    className,
}) {
    const fileInputRef = useRef(null);
    return (
        <div className={className}>
            <div>
                <svg
                    className={Styles.svg}
                    onClick={() => {
                        fileInputRef.current.click();
                    }}
                    version="1.0"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 64 64"
                    enable-background="new 0 0 64 64"
                    xml:space="preserve"
                    fill="#1d9bf0"
                    stroke="#1d9bf0"
                    stroke-width="3.7119999999999997"
                >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g>
                            {" "}
                            <path
                                fill="#1d9bf0"
                                d="M60,0H4C1.789,0,0,1.789,0,4v56c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V4C64,1.789,62.211,0,60,0z M62,60c0,1.104-0.896,2-2,2H4c-1.104,0-2-0.896-2-2v-2.801l14.603-14.603c0.781-0.781,2.047-0.781,2.828,0 c0,0,6.197,6.198,7.15,7.15c0.953,0.953,1.88,0.95,2.829,0s17.171-17.171,17.171-17.171c0.781-0.781,2.047-0.781,2.828,0L62,45.167 V60z M62,42.338L50.823,31.161c-1.563-1.563-4.093-1.563-5.656,0L27.996,48.332l-7.151-7.15c-1.563-1.563-4.093-1.563-5.656,0 L2,54.37V4c0-1.104,0.896-2,2-2h56c1.104,0,2,0.896,2,2V42.338z"
                            ></path>{" "}
                            <path
                                fill="#1d9bf0"
                                d="M28.999,17h-2.998c-0.024,0-0.044,0.012-0.068,0.014c-0.181-1.469-0.76-2.812-1.626-3.924 c0.018-0.016,0.041-0.021,0.059-0.039l2.121-2.121c0.392-0.391,0.391-1.023,0-1.414c-0.392-0.391-1.023-0.391-1.416,0l-2.12,2.12 c-0.018,0.018-0.023,0.04-0.039,0.059c-1.111-0.867-2.454-1.446-3.924-1.627c0.002-0.022,0.014-0.044,0.014-0.067l0.001-3 c0-0.553-0.449-1-1-1C17.448,6.001,17.001,6.447,17,7.002V10c0,0.023,0.012,0.045,0.014,0.067c-1.47,0.181-2.813,0.76-3.925,1.626 c-0.016-0.018-0.021-0.041-0.038-0.058L10.93,9.515c-0.391-0.392-1.023-0.391-1.414,0c-0.391,0.392-0.392,1.023,0,1.415 l2.121,2.121c0.017,0.017,0.04,0.022,0.058,0.038c-0.867,1.111-1.446,2.456-1.627,3.925C10.044,17.012,10.023,17,10,17H7 c-0.553,0-1,0.447-1,1s0.447,1,1,1h3c0.023,0,0.044-0.012,0.067-0.014c0.181,1.47,0.76,2.813,1.627,3.925 c-0.019,0.016-0.041,0.021-0.059,0.039l-2.121,2.12c-0.392,0.392-0.392,1.025,0,1.414c0.392,0.393,1.022,0.391,1.416,0.002 l2.12-2.121c0.018-0.018,0.023-0.041,0.039-0.059c1.111,0.866,2.454,1.445,3.924,1.626C17.012,25.957,17,25.977,17,26.002 L16.999,29c0,0.554,0.448,1.002,1,1c0.554,0,1-0.447,1.003-1l-0.001-2.998c0-0.025-0.012-0.045-0.014-0.069 c1.469-0.181,2.812-0.76,3.924-1.627c0.016,0.019,0.021,0.042,0.039,0.06l2.12,2.121c0.392,0.393,1.025,0.391,1.414,0 c0.392-0.392,0.391-1.023,0.001-1.416l-2.12-2.12c-0.018-0.018-0.041-0.023-0.06-0.039c0.867-1.111,1.446-2.455,1.627-3.924 c0.024,0.002,0.044,0.014,0.068,0.014L29,19.002c0.554,0,1.001-0.448,1-1C30,17.448,29.553,17.002,28.999,17z M18,24 c-3.313,0-6-2.687-6-6s2.687-6,6-6s6,2.687,6,6S21.313,24,18,24z"
                            ></path>{" "}
                        </g>{" "}
                    </g>
                </svg>
                <input
                    multiple
                    ref={fileInputRef}
                    className={Styles.hiddenInput}
                    type="file"
                    onChange={handleFile}
                    accept="image/png"
                />
            </div>
            {/* <div>
                    <svg className={Styles.svg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1d9bf0" stroke-width="0.24000000000000005"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 7h6v2H3v6h4v-2H5v-2h4v6H1V7h2zm14 0h6v2h-6v2h4v2h-4v4h-2V7h2zm-4 0h-2v10h2V7z" fill="#1d9bf0"></path> </g></svg>
                </div> */}
            <div style={{ position: "relative" }}>
                <svg
                    onClick={() => {
                        changeShowEmoji(!showEmoji);
                    }}
                    className={Styles.svg}
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
                {showEmoji && (
                    <div style={{ position: "absolute",zIndex: 5 }}>
                        <Picker data={data} onEmojiSelect={addEmoji} />
                    </div>
                )}
            </div>
        </div>
    );
}
