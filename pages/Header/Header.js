import styles from '../../styles/Home.module.css';
import Link from 'next/link';

export default function Header() {
    return(
        <>
        <ul className={styles.header}>
            <li> <Link href="/"> Home </Link> </li>
            <li> <Link href="/Shows"> Shows </Link> </li>
            <li> <Link href="/Carousel"> Comedy </Link> </li>
            <li> Movies </li>
            <li><Link href="/About"> About </Link></li>
        </ul>
        </>
    )
}