import {useRef, useState } from "react";
import Styles from "./index.module.css";
import TweeterInputOptions from "../TweeterInputOptions";
import Button from '../Button/index'

export default function TweetPopUpModel({
    isOpen,
    content,
    handleClose,
    footer,
    onClick,
    text,
    children,
    changeImgFile,
    showEmoji,
    changeShowEmoji,
    handleFile,
    addEmoji
}) {
    function close() {
        handleClose();
    }

    if (!isOpen) {
        return <></>;
    } else {
        return (
            <>
                <div className="blurBack"></div>
                <div className="wrapper">
                <div className={Styles.openModel}>
                    <div>
                        <button
                            title="Close"
                            className={Styles.close}
                            onClick={close}
                        >
                            <div className={Styles.firstDiv}></div>
                            <div className={Styles.secondDiv}></div>
                        </button>
                    </div>
                    <div>{children}</div>
                    <div className={Styles.bottom}>
                        {!footer ? (
                            <>
                                <TweeterInputOptions
                                    className={Styles.addOns}
                                    addEmoji={addEmoji}
                                    changeImgFile={changeImgFile}
                                    showEmoji={showEmoji}
                                    changeShowEmoji={changeShowEmoji}
                                    handleFile={handleFile}
                                />
                                <Button className={Styles.mainBtn} >{text}</Button>
                            </>
                        ) : (
                            <>
                                {footer}
                                <Button onClick={onClick} className={Styles.mainBtn} >{text}</Button>
                            </>
                        )}
                    </div>
                </div>
                </div>
            </>
        );
    }
}
