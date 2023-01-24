import Link from "next/link";
import Image from "next/image";
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
            <h1>Profile</h1>
            <h4>User_Name: <span>{user.name}</span></h4>
            <h4>User_Email: <span>{user.email}</span></h4>
            <Image unoptimized 
                    src={user.picture} 
                    alt={item.name}
                    width={200}
                    height={300}
                    loading="eager"                    
                    blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    placeholder="blur"
            />
            <h1><a className={styles.textDecoration} onClick={() =>logOut()}>LOGOUT</a> || Redirect to <Link href="/Home" className={styles.textDecoration}>Home</Link></h1>
        </div>
    )
}