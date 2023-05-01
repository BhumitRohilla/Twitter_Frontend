import Styles from "./index.module.css";
import PopUp from "../PopUp/index";
import Button from "../Button";
import Input from "../InputBox/index";
import { useState } from "react";
import camera from "../../assets/camera.svg";
import cross from "../../assets/cross.svg";
import { useRef } from "react";

export default function EditProfilePopUp(props) {
    const profileInput = useRef(null);
    const headerInput = useRef(null);

    function onPressHeaderInput() {
        headerInput.current.click();
    }

    function onPressHeaderRemove() {
        props.setHeaderInputFile([]);
        props.setHeaderImg(null);
    }

    function onPressProfileInput() {
        profileInput.current.click();
    }

    function handleHeaderFile() {
        props.setHeaderInputFile(headerInput.current.files[0]);
        props.setHeaderImg(URL.createObjectURL(headerInput.current.files[0]));
    }

    function handleProfileFile() {
        props.setProfileInputFile(profileInput.current.files[0]);
        props.setProfileImg(URL.createObjectURL(profileInput.current.files[0]));
    }

    return (
        <PopUp
            isOpen={props.isOpen}
            handleClose={props.handleClose}
            header={
                <>
                    <h3>Edit Profile</h3>
                    <Button onClick={props.submit} className={Styles.sendBtn}>
                        Send
                    </Button>
                </>
            }
            childClass={Styles.mainBody}
        >
            <div
                className={Styles.headerDiv}
                style={
                    props.headerImg
                        ? { background: `url(${props.headerImg})` }
                        : { backgroundColor: "#333639" }
                }
            >
                <button
                    onClick={onPressHeaderInput}
                    className={`${Styles.camaraBtn} ${Styles.floatingBtn}`}
                >
                    <img src={camera} alt="" />
                </button>
                {props.headerImg && (
                    <button
                        onClick={onPressHeaderRemove}
                        className={`${Styles.floatingBtn}`}
                    >
                        <img src={cross} alt="" />
                    </button>
                )}
            </div>
            <div className={Styles.marginDiv}>
                <div className={Styles.profileHolder}>
                    <div
                        className={Styles.profileDiv}
                        style={{ background: `url(${props.profileImg})` }}
                    >
                        <button
                            onClick={onPressProfileInput}
                            className={`${Styles.camaraBtn} ${Styles.floatingBtn}`}
                        >
                            <img src={camera} alt="" />
                        </button>
                    </div>
                </div>
                <div className={Styles.input}>
                    <input
                        ref={profileInput}
                        className={Styles.noDisp}
                        type="file"
                        accept="image/*"
                        onChange={handleProfileFile}
                    />
                    <input
                        ref={headerInput}
                        className={Styles.noDisp}
                        type="file"
                        accept="image/*"
                        onChange={handleHeaderFile}
                    />
                    <Input
                        value={props.name}
                        onChange={(value) => {
                            props.setName(value);
                        }}
                        label={"Name"}
                    />
                    <Input
                        value={props.bio}
                        onChange={(value) => {
                            props.setBio(value);
                        }}
                        label={"Bio"}
                    />
                </div>
            </div>
        </PopUp>
    );
}
