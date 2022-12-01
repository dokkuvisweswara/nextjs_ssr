import { useEffect, useState } from "react";
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router'

export default function Carousel ({data}) {
    const [carousalData, setCarousalData] = useState([]);
    const router = useRouter()
    
    // useEffect(() => {
    //     console.log("{}", data);
    //     // const url = "https://catalogue-ms.cloud.altbalaji.com/v1/v1/section/list/S1_Lock_Upp-Preview_Carousal?domain=IN&limit=10";
    //     // fetchCarousel(url).then((x)=>{
    //     //     console.log("....", x);
    //     //     setCarousalData(...x)});
    // }, [])
    return (
        <>
         <div className={styles.carousel}>
        {
        data.length> 0 ? data.map((x, index) => (
            <Image unoptimized src={x.images[0].url} alt={x.title} width={100} height={200} key={index}/>
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
  