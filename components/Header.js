import styles from '../styles/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { staticMenu } from '../menu.js';

export default function Header() {
    let userLogin = useSelector((state) => state.profile.name);
    const router = useRouter();
    const [staticMenue, setStaticMenue] = useState(staticMenu);
    const isSSR = () => typeof window  == 'undefined';
    useEffect(() => {
        if(isSSR) return ;
        else actConfigApi();
    }, []);
    const toggMenue = () => {
        const siteNavMenu = document.querySelectorAll('[data-navmenu]');
        siteNavMenu[0].classList.toggle(styles.mobileMenu);
    };
    const actConfigApi = async () => {
        debugger;
        const fetch = await fetch(`https://d2xowqqrpfxxjf.cloudfront.net/noorplay/web-noorplayv2.json`);
        const response = await fetch.json();
        setStaticMenue(response.menu);
    }

    return(
        <header className={styles.headerArea}>
        <div className={styles.headerContainer}>
            <div className={styles.siteLogo}>
                <Link href='/HOME'>
                    <Image 
                        unoptimized
                        src="https://www.mobiotics.com/static/media/MobioticsLogo.aef4f60398cf176c355e86288c27b9ce.svg"
                        alt='mobiotics logo'
                        width={100}
                        height={100}
                        loading="lazy"
                        />
                </Link>
            </div>
            <div className={styles.mobileNav} onClick={() => toggMenue()}>
                <i className="fas fa-bars"></i>
            </div>
            <div className={styles.siteNavMenu} data-navmenu>
                <ul className={styles.PrimaryMenue}>
                    {
                       staticMenue && staticMenue.map((item, index) =>(
                        item.dataType == "CONTENT" && <li key={index} onClick={() => toggMenue()}> <Link href={item.title.default.toUpperCase()} className={router.asPath.toLowerCase() == '/'+item.title.default.toLowerCase() ? styles.active : ""}> {item.title.default} </Link> </li>                            
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

 