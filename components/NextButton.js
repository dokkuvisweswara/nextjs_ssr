import styles from '../styles/NextButton.module.css';

const NextButton = (props) => {
    const goBack = () => {
        props.callBack('hello');// can pass callback data here
    }
    return(
    <button onClick={goBack} disabled={props.disblity} className={styles.next_btn} style={{width: props.width}}>{props.btnName}</button>
     )
}

export default NextButton;