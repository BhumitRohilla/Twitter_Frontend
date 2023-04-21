import React from "react";
import styles from './twitter.module.css'
import GrayBorderBox from "../../Components/GrayBorderBox";
import Button from '../../Components/Button/index'

export default function Twitter(){
    return (
        <div className={styles.mainSection}>
            <div className={styles.container}>
                This Is main Page
            </div>
            <div className={styles.sideBar}>
                <GrayBorderBox>
                    <h4>New to Twitter?</h4>
                    <p>Sign up to get going</p>
                    <Button className={`${styles.createAccountBtn}`}>Create accout</Button>
                </GrayBorderBox>
            </div>
        </div>
    )
}