import styles from '../styles/SliderAnimation.module.css';

export default function SlideAnimation() {
    const emptyData = [1, 2, 3, 4];
    return(
        <div className={styles.main}>
        <div className={styles.WRAPPER}>
        <div className={styles.TABSBOX}>
        {emptyData.map((item, index)=> (
                <div className={styles.TAB}  key={index}>
                </div>
                ))
        }
        </div>
        </div>
        </div>
    )
}