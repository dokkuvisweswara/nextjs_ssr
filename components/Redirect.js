import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router';

export default function Redirect({user}) {
    const router = useRouter();
    const logOut = () => {
        localStorage.removeItem('userName');
        router.reload();
    }
    return(
        <div>
            <h1>User: <span>{user}</span></h1>
            <h1><a className={styles.textDecoration} onClick={() =>logOut()}>LOGOUT</a> || Redirect to <Link href="/Home" className={styles.textDecoration}>Home</Link></h1>
        </div>
    )
}