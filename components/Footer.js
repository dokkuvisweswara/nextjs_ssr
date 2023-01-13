import styles from "../styles/Home.module.css";
import Image from 'next/image';
import Link from 'next/link';

export default function Footer () {
    return(
        <>
        <div className={styles.footer}>
            <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.anchor}
            >
            Powered by{' '}
            <span className={styles.logo}>
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
            </span>
            </a>
            <span class="footer_copyright__nFXY7"><span>Copyright</span> © 2023 Vercel Inc. All rights reserved.</span>
        </div>
        </>
    )
}