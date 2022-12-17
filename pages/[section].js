import { useRouter } from 'next/router';
import { pid } from 'process';
import { useEffect, useState } from 'react';
import Carousel from './Carousel/index';
import Slider from './sliders/slider.js';
import styles from '../styles/Home.module.css';

export default function Section ({ data })  {
    const router = useRouter();
    useEffect(() => {
      // if (router.asPath !== router.route) {
      //   // router.query.lang is defined
        
      // }
    }, [router.isReady])
    return (
        <>
        {
          data.length > 0 ? content(data) : Loading()
        }        
        </>
    )
}
export function content(data) {
  return(
    <>
      <Carousel data={data} />
      <Slider data={data} />
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


export async function getServerSideProps(context) {
    // Fetch data from external API 
    const section = context && context.query && context.query.section.toLowerCase();
    context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=100, stale-while-revalidate=59'
    );
    const URl = `https://catalogue-ms.cloud.altbalaji.com/v1/list/zuul/catalogue/balaji/catalogue/filters/carousal-`+section+`?domain=IN&limit=10`;
    const response = await fetch(URl);
    console.error("res", response)
    const content = await response.json();
    let data = [];
    data = content.content ? content.content : [];
    // Pass data to the page via props
    
    return { props: { data } }
  }
  