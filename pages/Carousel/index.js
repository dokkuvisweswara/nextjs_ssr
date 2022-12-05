import { useEffect, useState } from "react";
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';

export default function Carousel ({data}) { 
    const router = useRouter();
    const { id } = router.query;
    const [carouselData, setCarouselData] = useState([]);
    const [isReady, setIsReady] = useState(router.isReady);
    const [number, setNumber] = useState(0);
    const handleClick = async (u) => {
        alert(u)
    }
    const addExtra = async (m) => {
        setNumber(number+1);
        setCarouselData([...carouselData, ...[carouselData[number]]]);
        data.push(data[number]);
        setIsReady(true);
    }
    useEffect(() => {
        if(!router.isReady) return;
        console.log("=-=", data);
        setCarouselData(data);
        setNumber(0);
        console.log("carouselData", carouselData);
        // inItsetTimeOut();
    }, [id, data]);

    // function inItsetTimeOut() {
    //     setTimeout(() => {
    //         setCarouselData([...[carouselData[1]]])  ;
    //         console.log("ppppp",carouselData);
    //         data.push(data[1]);
    //     }, 2000);
    // }
    return (
        <>
        <div>
            <button onClick={() => {addExtra(1)}} >ADD</button>
        </div>
         <div className={styles.carousel}>
        {
        carouselData && carouselData.length> 0 ? carouselData.map((x, index) => (
            <button onClick={() => {handleClick(x.title)}} key={index} className={styles.imageButton}>
                <Image unoptimized src={x.images[0].url} alt={x.title} width={100} height={200} key={index} className={styles.carouselImag}/>
            </button>
        )) : <h1>Loading.....</h1>
        }
        </div> 
        </>
    )
}

  