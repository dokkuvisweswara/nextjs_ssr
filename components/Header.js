import styles from '../styles/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useLayoutEffect, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { staticMenu } from '../menu.js';

export default function Header() {
    const router = useRouter();
    let [userState, setUserState] = useState('');
    let [userLoggedIn, setUserLoggedIn] = useState(false);
    let userLogin = useSelector((state) => state.profile.name);
    const [staticMenue, setStaticMenue] = useState(staticMenu);
    const isSSR = () => typeof window  == 'undefined';

    useLayoutEffect(()=>{
        setUserState(localStorage.getItem('userName') == null ? '' : localStorage.getItem('userName'));
        if(localStorage.getItem('userName') == null){
            setUserLoggedIn(false);
          }else {
            setUserLoggedIn(true);
          }
      },[router]);

    useEffect(() => {
        if(isSSR) return ;
        else actConfigApi();
    }, [router.events]);
    const toggMenue = () => {
        const siteNavMenu = document.querySelectorAll('[data-navmenu]');
        siteNavMenu[0].classList.toggle(styles.mobileMenu);
    };
    const actConfigApi = async () => {
        const fetch = await fetch(`https://d2xowqqrpfxxjf.cloudfront.net/noorplay/web-noorplayv2.json`);
        const response = await fetch.json();
        setStaticMenue(response.menu);
    }

    return(
        <div className={styles.headerArea}>
        <div className={styles.headerContainer}>
            <div className={styles.siteLogo}>
                <Link href='/Home'>
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
                        userLoggedIn  ?
                        <li onClick={() => toggMenue()}> <Link href="/Login"> <i className="fas fa-user"></i> <span>{userState}</span> </Link> </li> : 
                        <li onClick={() => toggMenue()}> <Link href="/Login"> Login </Link> </li> 
                    } 
                     <li> <Link href="/About"> About </Link> </li>           
                </ul> 
            </div>
        </div>
        </div>
    )
}

 