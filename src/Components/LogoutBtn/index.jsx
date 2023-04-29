import Styles from './index.module.css';
import UserProfilePicture from '../UserProfilePicture';

export default function LogoutBtn(){
    return (
        <>
            <div className={Styles.mainBtn}>
                <UserProfilePicture className={Styles.profile}/>
            </div>
            <p className='navbarText'>Logout</p>
        </>
    )
}