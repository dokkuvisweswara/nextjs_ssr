import styles from '../styles/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function Header() {
    let userLogin = useSelector((state) => state.profile.name);
    const router = useRouter();
    const primeryMenu = ['Home', 'Shows', 'Comedy', 'Movies'];
    useEffect(() => {
    }, []);
    const toggMenue = () => {
        const siteNavMenu = document.querySelectorAll('[data-navmenu]');
        siteNavMenu[0].classList.toggle(styles.mobileMenu);
    }
    return(
        <header className={styles.headerArea}>
        <div className={styles.headerContainer}>
            <div className={styles.siteLogo}>
                <Image 
                    unoptimized
                    src="https://www.mobiotics.com/static/media/MobioticsLogo.aef4f60398cf176c355e86288c27b9ce.svg"
                    width={100}
                    height={100}
                    loading="lazy"
                    />
            </div>
            <div className={styles.mobileNav} onClick={() => toggMenue()}>
                <i className="fas fa-bars"></i>
            </div>
            <div className={styles.siteNavMenu} data-navmenu>
                <ul className={styles.PrimaryMenue}>
                    {
                        primeryMenu.map((item, index) =>(
                            <li key={index} onClick={() => toggMenue()}> <Link href={item} className={router.asPath =='/'+item ? styles.active : ""}> {item} </Link> </li>                            
                        ))
                    }
                </ul>
                <ul className={styles.PrimaryMenue}>
                    {
                        userLogin && userLogin!== 'null' ?
                        <li onClick={() => toggMenue()}> <Link href="/Login"> <i className="fas fa-user"></i> <span>{userLogin}</span> </Link> </li> : 
                        <li onClick={() => toggMenue()}> <Link href="/Login"> Login </Link> </li> 
                    }            
                </ul> 
            </div>
        </div>
        </header>
    )
}

 