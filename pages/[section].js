import { useRouter } from 'next/router';
import { pid } from 'process';
import { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import Slider from '../components/Slider';
import Gridview from '../components/Gridview';
import styles from '../styles/Home.module.css';
import Head from 'next/head';

export default function Section ({ data })  {
    const router = useRouter();
    const section = router.query.section;
    useEffect(() => {
      // if (router.asPath !== router.route) {
      //   // router.query.lang is defined
        
      // }
    }, [])
    return (
        <>
        <Head>
          <title>{section}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {
           data.length > 0 ? content(data) : Loading()
        }        
        </>
    )
}
export function content(data) {
  return(
    <>
      <Carousel data={data[1]} />
      {data[0].length > 2 ? <Slider data={data[2]} /> : <Gridview data={data[2]}/>}
    </>
  )
}
export function Loading() {
  return(
    <>
    <div className={styles.loading}>
    <h1>Loading....</h1>
    </div>
    </>
  )
}

//ServerSide Props....
export async function getServerSideProps(context) {
    // Fetch data from external API 
    const section = context && context.query && context.query.section.toLowerCase();
    let sectionId = '';
    context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=1000, stale-while-revalidate=120'
    );
    const configUrl = 'https://realtimedatabasesumit.firebaseio.com/alt.json';
    const configRes = await fetch(configUrl);
    const configContent = await configRes.json();
    configContent.map((x, i)=>{if(x.title == context.query.section){
      sectionId = x.sectionID;
    }})
    const sectionUrl = `https://api.cloud.altbalaji.com/sections/`+sectionId+`?domain=IN&limit=10`;
    const URl = `https://catalogue-ms.cloud.altbalaji.com/v1/list/zuul/catalogue/balaji/catalogue/filters/carousal-`+section+`?domain=IN&limit=10`;
    let thumbNailUrl = '';
    if(section == 'home'){
      thumbNailUrl = 'https://catalogue-ms.cloud.altbalaji.com/v1/list/zuul/catalogue/balaji/catalogue/filters/trending-home-1?domain=IN&limit=10';
    }else {
      thumbNailUrl = `https://catalogue-ms.cloud.altbalaji.com/v1/list/zuul/catalogue/balaji/catalogue/filters/all-`+section+`?domain=IN&limit=10`
    }
    
    const sectionRes = await fetch(sectionUrl);
    const caroselRes = await fetch(URl);
    const thumbNailRes = await fetch(thumbNailUrl);
    const sectionContent = await sectionRes.json();
    const caroselContent = await caroselRes.json();
    const thumbnailContent = await thumbNailRes.json();
    let data = [];
    let sectionData = sectionContent.lists ? sectionContent.lists : [];
    let caroselData = caroselContent.content ? caroselContent.content : [];
    let thumbNailData = thumbnailContent.content ? thumbnailContent.content : [];
    data = data.concat([sectionData], [caroselData], [thumbNailData]);
    // Pass data to the page via props
    
    console.log("dataset  server----", thumbNailData)
    return { props: { data } }
  };
  