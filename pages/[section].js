import { useRouter } from 'next/router';
import { pid } from 'process';
import { useEffect } from 'react';
import Carousel from './Carousel/index';


export default function Section ({ data })  {
    const router = useRouter();
    useEffect(() => {
      if (router.asPath !== router.route) {
        // router.query.lang is defined
        console.error("---", router.asPath);
        
      }
    }, [router])
    return (
        <>
        <h1>Section : { router.asPath}</h1>
        <Carousel data={data} />
        </>
    )
}

export async function getServerSideProps(context) {
    // Fetch data from external API 
    console.log("--__--", context.query.section);
    const section = context && context.query && context.query.section.toLowerCase();
    context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=100, stale-while-revalidate=59'
    )
    const URl = `https://catalogue-ms.cloud.altbalaji.com/v1/list/zuul/catalogue/balaji/catalogue/filters/carousal-`+section+`?domain=IN&limit=10`;
    const response = await fetch(URl)
    const content = await response.json()
    const data = content.content;
    // Pass data to the page via props
    
    return { props: { data } }
  }
  