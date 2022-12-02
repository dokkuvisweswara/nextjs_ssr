import { useEffect, useState } from "react";
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router'

export default function Carousel ({data:[]}) {
    const [carousalData, setCarousalData] = useState([...data]);
    const router = useRouter()
    
    const handleClick = async (u) => {
        console.log(u);
        alert(u)
    }
    
    useEffect(() => {
        inItSetTimeOut(); 
        // const url = "https://catalogue-ms.cloud.altbalaji.com/v1/v1/section/list/S1_Lock_Upp-Preview_Carousal?domain=IN&limit=10";
        // fetchCarousel(url).then((x)=>{
        //     console.log("....", x);
        //     setCarousalData(...x)});
    }, []);
    async function inItSetTimeOut() {
        setTimeout(() => {
            // data.push(data[1]);
            let x = [...carousalData];
            x.push(x[1]);
            setCarousalData([...x]);
            carousalData.map((item) => {
                console.log('+=+', item.images[0].url);
            })
        }, 100)
    }
    return (
        <>
         <div className={styles.carousel}>
        {
        carousalData && carousalData.length> 0 ? carousalData.map((item, index) => (
            <button onClick={() => {handleClick(item.title)}} key={index}>
                <Image unoptimized src={item.images[0].url} alt={item.title} width={100} height={200} key={index} className={styles.carouselImag}/>
            </button>
        )) : <h1>Loading.....</h1>
        }
        </div> 
        </>
    )
}
// export async function getServerSideProps(context) {
//     // Fetch data from external API 
//     context.res.setHeader(
//       'Cache-Control',
//       'public, s-maxage=100, stale-while-revalidate=59'
//     )
//     const URl = "https://catalogue-ms.cloud.altbalaji.com/v1/v1/section/list/S1_Lock_Upp-Preview_Carousal?domain=IN&limit=10";
//     const response = await fetch(URl)
//     const content = await response.json()
//     const data = content.content;
//     // Pass data to the page via props
    
//     return { props: { data } }
//   }
  