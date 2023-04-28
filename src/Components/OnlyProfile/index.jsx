import Styles from './index.module.css'
import Button from '../Button'

export default function OnlyProfile({user}){
    return (
        <>
            <div className={Styles.header}>
                {user.username}
            </div>
            <div className={Styles.headerpictureHolder}>
                <img className={Styles.headerpicture} src="https://pbs.twimg.com/profile_banners/2455740283/1601560191/600x200" alt="" />
            </div>
            <div className={Styles.profileContent}>
                <div className={Styles.profileHolder}>
                    <div className={Styles.profile} style={{background:'url(https://pbs.twimg.com/profile_banners/2455740283/1601560191/600x200)'}}>

                    </div>
                    <Button className={Styles.followBtn}>Follow</Button>
                </div>
                <div>
                    <h2 className={Styles.nameTitle}>{user.name}</h2>
                    <h4 className={Styles.usernamTitle}>@{user.username}</h4>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}