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
      'public, s-maxage=100, stale-while-revalidate=59'
    );
    const configUrl = 'https://realtimedatabasesumit.firebaseio.com/alt.json';
    const configRes = await fetch(configUrl);
    const configContent = await configRes.json();
    configContent.map((x, i)=>{if(x.title == context.query.section){
      sectionId = x.sectionID;
      debugger;
      console.log("dataset----", sectionId);
    }})
    const sectionUrl = `https://api.cloud.altbalaji.com/sections/`+sectionId+`?domain=IN&limit=10`;
    const sectionRes = await fetch(sectionUrl);    
    const sectionContent = await sectionRes.json();
    const sectionData = sectionContent.lists ? sectionContent.lists : [];    
    console.log("dataset----", sectionId);
    let first = sectionData.slice(0, 2);
    console.log("dataset  server----", first);
    const URl = `https://catalogue-ms.cloud.altbalaji.com/v1/list`+first[0]['external_id']+`?domain=IN&size=10&page=1`;
    let thumbNailUrl = `https://catalogue-ms.cloud.altbalaji.com/v1/list`+first[1]['external_id']+`?domain=IN&size=10&page=1`;
    // if(section == 'home'){
    //   thumbNailUrl = 'https://catalogue-ms.cloud.altbalaji.com/v1/list/zuul/catalogue/balaji/catalogue/filters/trending-home-1?domain=IN&limit=10';
    // }else {
    //   thumbNailUrl = `https://catalogue-ms.cloud.altbalaji.com/v1/list/zuul/catalogue/balaji/catalogue/filters/all-`+section+`?domain=IN&limit=10`
    // }
    
    const caroselRes = await fetch(URl);
    const thumbNailRes = await fetch(thumbNailUrl);
    const caroselContent = await caroselRes.json();
    const thumbnailContent = await thumbNailRes.json();
    let data = [];
    let caroselData = await actACrouselData(caroselContent.content ? caroselContent.content : []);
    console.log("dataset  server----", caroselData);
    let thumbNailData = await actAthumbnailData(thumbnailContent.content ? thumbnailContent.content : []);
    data = data.concat([sectionData], [caroselData], [thumbNailData]);
    // Pass data to the page via props
    
    // console.log("dataset  server----", caroselData);
    return { props: { data } }
  };

  export async function actACrouselData(data) {
    let filteredArray = [];
    if(data.length >=0){
      return filteredArray = data.map((item, index)=> {
        let filteredData = {};
        filteredData.uid = item.uid;
        filteredData.id = item.id;
        filteredData.title = item.title;
        filteredData.image = getHotspotImage(item.images);
        return filteredData;
      });       
    }else{ 
      return [];
    }
  }
  export async function actAthumbnailData(data) {
    let filteredArray = [];
    if(data.length >=0){
      return filteredArray = data.map((item, index)=> {
        let filteredData = {};
        filteredData.uid = item.uid;
        filteredData.id = item.id;
        filteredData.title = item.title;
        filteredData.image = item.images[0].url;
        return filteredData;
      });       
    }else{ 
      return [];
    }
  }
  export const getHotspotImage = (sectionListDetailSingle) => {
    let single = []
    single = sectionListDetailSingle.filter((img) => {
      if (img.type === 'system') {
        return img;
      }
      return ''
    });

    if (single.length > 0) {
      if (single[0].format && typeof (single[0].format) != 'string') {
        // return single[0].format['tiles-hd'].source
        return single[0].format['tiles-sd'].source
      } else {
        single = sectionListDetailSingle.filter((img) => {
          //previously we taking img.type === "system" && img.formet == 'tiles-hd'
          if (img.type === 'system' && img.format == 'tiles-sd') {
            return img;
          }
          return ''
        });
        return single[0].url;
      }
    }
  }
  