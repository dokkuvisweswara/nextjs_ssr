import styles from '../../styles/header.module.css';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function Header() {
    let userLogin = useSelector((state) => state.profile.name);
    const router = useRouter();
    console.log("iiiii", router);
    const primeryMenu = ['Home', 'Shows', 'Comedy', 'Movie', 'Music'];
    useEffect(() => {
        console.log("iiiii", router.asPath);
    }, [router.isReady]);
    const toggMenue = () => {
        const siteNavMenu = document.querySelectorAll('[data-navmenu]');
        console.log("querySelectorAll", siteNavMenu);
        siteNavMenu[0].classList.toggle(styles.mobileMenu);
    }
    return(
        <header className={styles.headerArea}>
        <div className={styles.headerContainer}>
            <div className={styles.siteLogo}>
                <a>HelloDemo</a>
            </div>
            <div className={styles.mobileNav} onClick={() => toggMenue()}>
                <i className="fas fa-bars"></i>
            </div>
            <div className={styles.siteNavMenu} data-navmenu>
                <ul className={styles.PrimaryMenue}>
                    {
                        primeryMenu.map((item, index) =>(
                            <li key={index}> <Link href={item} className={router.asPath =='/'+item ? styles.active : ""}> {item} </Link> </li>                            
                        ))
                    }
                </ul>
                <ul className={styles.PrimaryMenue}>
                    {
                        userLogin && userLogin!== 'null' ?
                        <li> <Link href="/Account"> <i className="fas fa-user"></i>{userLogin} </Link> </li> : 
                        <li> <Link href="/Login"> Login </Link> </li> 
                    }            
                </ul> 
            </div>
        </div>
        </header>
    )
}

 