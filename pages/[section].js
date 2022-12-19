import { useRouter } from 'next/router';
import { pid } from 'process';
import { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import Slider from '../components/Slider';
import styles from '../styles/Home.module.css';
import Head from 'next/head';

export default function Section ({ data })  {
    const router = useRouter();
    const section = router.query.section;
    useEffect(() => {
      console.log("router", router);

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
    const content = await response.json();
    let data = [];
    data = content.content ? content.content : [];
    // Pass data to the page via props
    
    console.log("dataset  server----", data)
    return { props: { data } }
  }
  