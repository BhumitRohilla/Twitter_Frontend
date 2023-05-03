import Styles from "./index.module.css";
import SearchBar from "../SearchBar/index";

export default function MessageDashboard(props) {
    function onClick(element) {
        return () => {
            props.setUser(element);
        };
    }
    return (
        <>
            <h3 className={Styles.heading}>Message</h3>
            <SearchBar inputRef={props.inputRef} onClick={onClick} />
            <div className={Styles.userContainer}>
                {props.userToShow.map((element) => {
                    return (<div onClick={onClick(element)}><h1>{element.name}</h1></div>)
                })}

            </div>
        </>
    );
}
