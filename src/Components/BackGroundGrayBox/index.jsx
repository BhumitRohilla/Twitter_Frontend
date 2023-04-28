import Styles from './index.module.css'

export default function BackGroundGrayBox({children,className,style}){
    return (
        <div className={`${Styles.mainBody} ` +className} style={{...style}}>
            {children}
        </div>
    )
}