import Styles from "./index.module.css";
export default function FloaterDiv({
    popUpStatus,
    className,
    styles,
    popupClassName,
    children,
    popUp,
}) {
    return (
        <div
            className={`${Styles.container} ${className}`}
            style={{ ...styles }}
        >
            {children}
            {popUpStatus && (
                <div className={popupClassName + ` ${Styles.popUp}`}>
                    {popUp}
                </div>
            )}
        </div>
    );
}
