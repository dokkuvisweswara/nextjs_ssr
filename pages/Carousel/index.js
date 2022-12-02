import { useEffect, useState } from "react";
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

export default function Carousel ({data}) {
    const g = data; 
    const [carouselData, setCarouselData] = useState([...g]);
    const handleClick = async (u) => {
        alert(u)
    }

    useEffect(() => {
        console.log("carouselData", carouselData);
        inItsetTimeOut();
    }, [inItsetTimeOut, carouselData]);

    function inItsetTimeOut() {
        setTimeout(() => {
            setCarouselData([...[carouselData[1]]])  ;
            console.log("ppppp",carouselData);
            data.push(data[1]);
        }, 2000);
    }
    return (
        <>
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

  