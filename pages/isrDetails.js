import styles from '../styles/Details.module.css';
import Image from 'next/image';
import Head from 'next/head';
import { token } from '../menu';
import {wrapper} from '../redux/store';
import NextButton from '../components/NextButton';
import { useLayoutEffect, useState } from 'react';

export default function Details({data}) {
  
    const isSSR = () =>{return typeof window  == undefined};
    let [userState, setUserState] = useState(null);
    console.log("userState....", userState);
    const filterImage = (sectionListDetailSingle) => {
      let single = [];
      let singleUrl = '';
      sectionListDetailSingle.filter((img) => {
        if (img.postertype === "LANDSCAPE") {
          single = img.filelist;
        }
      });
      if (single.length > 0) {  
          single.filter((img) => {
            if (img.quality === "HD") {
              singleUrl =  img.filename;
            }
          });
    } else singleUrl = '';
    return singleUrl;
  }
  useLayoutEffect(()=>{
    setUserState(localStorage.getItem('userName'));
    console.log("userState....", userState);
  },[])
  const handleSubmit = (data) => {
    console.log("localStorage", localStorage.getItem('userName'));
  }
    return(
      <>
        <Head>
          <title>{data.defaulttitle}</title>
          <meta name="description" content={data.shortdescription} />
        </Head>
        <div className={styles.detailsContainer}>
            <div className={styles.detailMainSection}>
                <div className={styles.deatilsText}>
                    <h1 className='M0'>{data.defaulttitle}</h1>
                    <p>{data.shortdescription}</p>
                    <h5><span>{data.category}</span> | <span>{data.defaultgenre}</span> | <span>{data.contentlanguage}</span> | <span>{data.pgrating}</span></h5>
                    {userState ? <NextButton data="outline-success" btnName="WatchList" disblity={false} width="100%" callBack={handleSubmit}/> : <p>......</p>}
                </div>
                <div className={styles.deatilsImage}>
                    <Image
                        unoptimized
                        src={filterImage(data.poster)} 
                        alt={data.defaulttitle}
                        width={200}
                        height={300}
                    />
                </div>
            </div>
        </div>
      </>
    )
}

export const getStaticProps = wrapper.getStaticProps((store) =>
  async (context, sss) =>{
     // Fetch data from external API
     const URl = `https://vcms.mobiotics.com/prodv3/subscriber/v1/content/gnOJj66iEQb7?displaylanguage=eng`;
     const response = await fetch(URl, {"headers":{
                        "authorization": token.authorization,
                      }});
     const content = await response.json();
     let data = [];
     data = content ? content : [];
     // Pass data to the page via props
     return { props: { data }, revalidate: 60*30 }
});