import styles from '../../styles/Home.module.css';
import Link from 'next/link';

export default function Header() {
    return(
        <>
        <ul className={styles.header}>
            <li> <Link href="/"> Home </Link> </li>
            <li> <Link href="/Shows"> Shows </Link> </li>
            <li> <Link href="/Comedy"> Comedy </Link> </li>
            <li> <Link href="/Movie"> Movies </Link> </li>
            <li><Link href="/About"> About </Link></li>
        </ul>
        </>
    )
}