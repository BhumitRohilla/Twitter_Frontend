import React from "react";
import styles from './index.module.css'
import Button from '../Button/index';

export default function BottomBar(){

    function openLoginDiv(){
        console.log('login');
    }

    function openSignUpDiv(){
        console.log('sign up');
    }

    return (
        <div className={styles.mainBody}>
            <div className={styles.innerDiv}>
                <div className="first">

                </div>
                <div className={`second ${styles.contentContainer}`}>
                    <div className={styles.textBox}>
                        <h3 className={styles.heading}>Don't miss what's happening</h3>
                        <h5 className={styles.subheading}>People on twitter are the first to know and probably wrong info.</h5>
                    </div>
                    <div className={`${styles.btnCluster}`}>
                        <Button className={`${styles.loginBtn} ${styles.btn}`} onClick={openLoginDiv}>
                            Login
                        </Button>
                        <Button className={styles.btn} onClick={openSignUpDiv}>
                            Sign up
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}