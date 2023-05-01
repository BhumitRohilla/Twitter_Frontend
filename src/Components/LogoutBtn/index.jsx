import Styles from './index.module.css';
import UserProfilePicture from '../UserProfilePicture';

export default function LogoutBtn(){
    return (
        <>
            <UserProfilePicture className={Styles.profile}/>
            
            <p className='navbarText'>Logout</p>
        </>
    )
}