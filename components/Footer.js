import styles from "../styles/Home.module.css";
import Image from 'next/image';
import Link from 'next/link';

export default function Footer () {
    return(
        <>
        <div className={styles.footer}>
            
        <Link href='/Home'>
            Powered by{' '}
            <span className={styles.logo}>
                    <Image 
                        unoptimized
                        src="https://www.mobiotics.com/static/media/MobioticsLogo.aef4f60398cf176c355e86288c27b9ce.svg"
                        alt='mobiotics logo'
                        width={100}
                        height={100}
                        loading="lazy"
                        />
            </span>            
            </Link>
            <span className="footer_copyright__nFXY7"><span>Copyright</span> © 2023 Vercel Inc. All rights reserved.</span>
        </div>
        </>
    )
}