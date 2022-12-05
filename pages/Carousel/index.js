import { useEffect, useState } from "react";
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';

export default function Carousel ({data}) { 
    const router = useRouter();
    const { id } = router.query;
    const [number, setNumber] = useState(0);
    const handleClick = async (u) => {
        alert(u)
    }
    const addExtra = async (m) => {
        setNumber(number+1);
        data.push(data[number]);
    }
    useEffect(() => {
        if(!router.isReady) return;
        console.log("=-=", data);
        setNumber(0);
    }, [id, data]);
    return (
        <>
        <div>
            <button onClick={() => {addExtra(1)}} >ADD</button>
        </div>
         <div className={styles.carousel}>
        {
        data && data.length> 0 ? data.map((x, index) => (
            <button onClick={() => {handleClick(x.title)}} key={index} className={styles.imageButton}>
                <Image unoptimized src={x.images[0].url} alt={x.title} width={100} height={200} key={index} className={styles.carouselImag}/>
            </button>
        )) : <h1>Loading.....</h1>
        }
        </div> 
        </>
    )
}

  