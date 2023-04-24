import React, { useContext } from "react";
import styles from "./index.module.css";
import Button from "../Button/index";
import ModelOpen from "../../Context/OpenModel";

export default function BottomBar() {
    const { openLogin, openSignUp } = useContext(ModelOpen);

    return (
        <div className={styles.mainBody}>
            <div className={styles.innerDiv}>
                <div className="first"></div>
                <div className={`second ${styles.contentContainer}`}>
                    <div className={styles.textBox}>
                        <h3 className={styles.heading}>
                            Don't miss what's happening
                        </h3>
                        <h5 className={styles.subheading}>
                            People on twitter are the first to know and probably
                            wrong info.
                        </h5>
                    </div>
                    <div className={`${styles.btnCluster}`}>
                        <Button
                            className={`${styles.loginBtn} ${styles.btn}`}
                            onClick={openLogin}
                        >
                            Login
                        </Button>
                        <Button className={styles.btn} onClick={openSignUp}>
                            Sign up
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
