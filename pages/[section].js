import { useRouter } from 'next/router';
import { pid } from 'process';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Carousel from '../components/Carousel';
import Slider from '../components/Slider';
import Gridview from '../components/Gridview';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import {wrapper} from '../redux/store';
import { SET_CONFIG_DATA, SET_FILTEREDSECTIONS } from "../redux/slices/configSlice";
import { getThumbNailData } from "../auth.server";
import SlideAnimation from '../components/SliderAnimation';
import { useInView } from 'react-intersection-observer';
import { token } from '../menu';

export default function Section ({ data })  {
  console.log("data.....Y", data[1]);
    let [carouselData, setCarouselData] = React.useState(data[0]);
    let [thumbNailData, setThumbNailData] = React.useState(data[1]);
    let [isThumbNailLoading, setIsThumbNailLoading] = React.useState(true);
    let [counter, setCounter] = React.useState(2);

    let user = useSelector((state) => state.config);      
    console.log("data---||--", thumbNailData);
    const isSSR = () =>{return typeof window  == undefined};
    const router = useRouter();
    const section = router.query.section;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };
    const { ref, inView, entry } = useInView(options);
  
    React.useEffect(() => {
        setCarouselData(data[0]);
        setThumbNailData(data[1]);
        setCounter(2);
        setIsThumbNailLoading(true);
    }, [router.events, data]);
    React.useEffect(() => {
      console.log("counter", counter);      
      inView && handleScroll(counter);
    }, [inView]);

    const handleScroll = async (count) => {
      let configContent = user.configData;
      let filteredSections = [];
      let thumbnailSections = [];
      let thumbnailSectionsData = [];
      let thumbnaiData = {};
      console.log("configContent", configContent)
      configContent && configContent.map((x, i)=>{
        if(x.id.toUpperCase() == section.toUpperCase()){
        filteredSections = x.sections;
      }});    
      getFilteredSection(filteredSections);
      let newFilteredSections = getFilteredSection(filteredSections) ? getFilteredSection(filteredSections) : [];
      console.log("++++", thumbnailSections);
      let itemLength = newFilteredSections.length;
      console.log("coming", count, itemLength);
      if(count >= itemLength){
        setIsThumbNailLoading(false);
        return;
      }   
      setCounter(count+1);
      console.log("newFilteredSections[count]", newFilteredSections[count]);
      thumbnaiData.title = newFilteredSections[count]?.title?.default;
      thumbnaiData.displayType = newFilteredSections[count]?.displayType;
      // thumbnaiData.data = [];
      thumbnaiData.title && setThumbNailData(oldArray => [...oldArray, thumbnaiData]);
      const headerData = {
        thumbNailUrl : `https://vcms.mobiotics.com/prodv3/`+newFilteredSections[count]?.endpoint+`?`+getParams(newFilteredSections[count]?.parameters),
        token : token.authorization
      };
      await getThumbNailData(headerData).then((response) => {
        // thumbnailSectionsData = response.success.data;
        thumbnaiData.data = actThumbnailDataOne(response.success.data ? response.success.data : [], thumbnaiData.displayType);
        }).catch((error) => {
            if (error.status == 429) {
              console.log("responsesuccess", error.message);
            }else {
              console.log("responsesuccess", 'Generic error');
            }
          });
      setThumbNailData(oldArray => [...oldArray]);
      // console.log("ThumbNailData", thumbNailData);
      // const unique = [...new Map(thumbNailData.map((m) => [m.title, m])).values()];
      // console.log("LOVEYOU", thumbnaiData);
    };
      return (
          <>
          <Head>
            <title>{section}</title>
            <meta name="description" content={section} />
          </Head>
          <main>
          {
            data.length > 0 ? <>
            <Carousel data={carouselData} />
            {
              thumbNailData && thumbNailData.map((section, index) =>{
               return( section.displayType === "PORTRAIT" ?
                  <div key={index}>
                  <h1 className={styles.thumbnailTitle}>{section.title}</h1>            
                  <Slider data={section.data} slideIndex={index} displayType={section.displayType}/>
                  </div> : <div key={index}>
                  <h1 className={styles.thumbnailTitle}>{section.title}</h1>            
                  <Slider data={section.data} slideIndex={index} displayType={section.displayType}/>
                  </div>)
                })
            }
            {isThumbNailLoading && 
            <div ref={ref}>
              <SlideAnimation />
            </div>}
            </> : <></>
          }   
          </main>     
          </>
      )
};

export const getStaticProps = wrapper.getStaticProps((store) =>
  async (context, sss) => {    // Fetch data from external API 
      let data = [];
      const configUrl = 'https://d2xowqqrpfxxjf.cloudfront.net/noorplay/web-noorplayv2.json';
      const configRes = await fetch(configUrl);
      const configContent = await configRes.json();
      console.log("6666666666", context, sss);    
      store.dispatch(SET_CONFIG_DATA(configContent.screens));
      // let conFigScreen = store.getState().config.configData;
      const section = context && context.params && context.params.section.toUpperCase();
      let consfigInfo = [];
      let filteredSections = [];
      let thumbnailSections = [];
      let thumbnailSectionsData = {};
      let finalThumbnailData = [];
      configContent && configContent.screens.map((x, i)=>{
        if(x.id.toUpperCase() == section){
        filteredSections = x.sections;
      }});    
      getFilteredSection(filteredSections);  
      let newFilteredSections = getFilteredSection(filteredSections) ? getFilteredSection(filteredSections) : [];
      thumbnailSections = newFilteredSections.slice(1, 2);
      const carouselUrl = `https://vcms.mobiotics.com/prodv3/`+newFilteredSections[0].endpoint+`?`+getParams(newFilteredSections[0].parameters);
      const caroselRes = await fetch(carouselUrl, {"headers": {
                          "authorization": token.authorization,
                        }, "method": "GET"});
      const caroselContent = await caroselRes.json();
      const caroselData = actACrouselDataOne(caroselContent.data ? caroselContent.data : []);
      thumbnailSectionsData.title = thumbnailSections[0]?.title.default;
      thumbnailSectionsData.displayType = thumbnailSections[0]?.displayType;
      const thumbNailUrl = `https://vcms.mobiotics.com/prodv3/`+thumbnailSections[0].endpoint+`?`+getParams(thumbnailSections[0].parameters);
      const thumbNailRes = await fetch(thumbNailUrl, {"headers": {
                              "authorization": token.authorization,
                            }, "method": "GET"});
      const thumbnailContent = await thumbNailRes.json();
      let newThumbNailData =  actThumbnailDataOne(thumbnailContent.data ? thumbnailContent.data : [], thumbnailSectionsData.displayType);
      let thumbnailSData = [];
      // thumbnailSData = thumbnailSData.concat([newThumbNailData]);
      thumbnailSectionsData.data = newThumbNailData;
      thumbnailSData.push(thumbnailSectionsData);
      data = data.concat([caroselData], [thumbnailSData]);
      // Pass data to the page via props
      return { props: { data }, revalidate: 60*30}
  });

export async function getStaticPaths() {
  const configUrl = 'https://d2xowqqrpfxxjf.cloudfront.net/noorplay/web-noorplayv2.json';
  const configRes = await fetch(configUrl);
  const configContent = await configRes.json();
  // Get the paths we want to pre-render based on posts
    let screens = [];
    configContent.screens.map((screen) => {
      if(screen.id == 'EID-PLAYS' ||  screen.id == 'FREEMIUM' || screen.id == 'HOME-KIDS'){            
      console.log("666666", screens);
      }else {
        screens.push(screen);
      }
    });
    const paths = screens.map((post) => ({
    
    params: { section: post.id.toUpperCase() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
};

//ServerSide Props....
// export const getServerSideProps = wrapper.getServerSideProps((store) =>
//   async (context) => {    // Fetch data from external API 
//       let data = [];
//       let conFigScreen = store.getState().config.configData;
//       const section = context && context.query && context.query.section.toUpperCase();
//       let consfigInfo = [];
//       let filteredSections = [];
//       let thumbnailSections = [];
//       let thumbnailSectionsData = [];
//       context.res.setHeader(
//         'Cache-Control',
//         'public, s-maxage=100, stale-while-revalidate=59'
//       );
//       conFigScreen && conFigScreen.map((x, i)=>{
//         if(x.id.toUpperCase() == section){
//         filteredSections = x.sections;
//       }});    
//       getFilteredSection(filteredSections);  
//       let newFilteredSections = getFilteredSection(filteredSections) ? getFilteredSection(filteredSections) : [];
//       thumbnailSections = newFilteredSections.slice(1, 2);
//       const carouselUrl = `https://vcms.mobiotics.com/prodv3/`+newFilteredSections[0].endpoint+`?`+getParams(newFilteredSections[0].parameters);
//       const caroselRes = await fetch(carouselUrl, {"headers": {
//                           "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VpZCI6IjEyMjM3NjQ2ODgwOTg4MDMiLCJkZXZpY2V0eXBlIjoiUEMiLCJkZXZpY2VvcyI6IldJTkRPV1MiLCJwcm92aWRlcmlkIjoibm9vcnBsYXkiLCJ0aW1lc3RhbXAiOjE2NzI2NDQ0NDYsImFwcHZlcnNpb24iOiI0Ni40LjAiLCJpcCI6IjE1LjE1OC40Mi40IiwiR2VvTG9jSXAiOiIxNzEuNzYuNzEuNzIiLCJ2aXNpdGluZ2NvdW50cnkiOiJJTiIsImlzc3VlciI6Im5vb3JwbGF5IiwiZXhwaXJlc0luIjo2MDQ4MDAsInByb3ZpZGVybmFtZSI6Ik5vb3JQbGF5IiwiaWF0IjoxNjcyNjQ0NDM0LCJleHAiOjE2NzMyNDkyMzQsImlzcyI6Im5vb3JwbGF5In0.cgt9LtwAVmeJI5tTiNBPSLV1G1VQ7t-iq_oc4fyAw0o",
//                         }, "method": "GET"},);
//       const caroselContent = await caroselRes.json();
//       const caroselData = actACrouselDataOne(caroselContent.data ? caroselContent.data : []);
//       const thumbNailUrl = `https://vcms.mobiotics.com/prodv3/`+thumbnailSections[0].endpoint+`?`+getParams(thumbnailSections[0].parameters);
//       const thumbNailRes = await fetch(thumbNailUrl, {"headers": {
//                               "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VpZCI6IjEyMjM3NjQ2ODgwOTg4MDMiLCJkZXZpY2V0eXBlIjoiUEMiLCJkZXZpY2VvcyI6IldJTkRPV1MiLCJwcm92aWRlcmlkIjoibm9vcnBsYXkiLCJ0aW1lc3RhbXAiOjE2NzI2NDQ0NDYsImFwcHZlcnNpb24iOiI0Ni40LjAiLCJpcCI6IjE1LjE1OC40Mi40IiwiR2VvTG9jSXAiOiIxNzEuNzYuNzEuNzIiLCJ2aXNpdGluZ2NvdW50cnkiOiJJTiIsImlzc3VlciI6Im5vb3JwbGF5IiwiZXhwaXJlc0luIjo2MDQ4MDAsInByb3ZpZGVybmFtZSI6Ik5vb3JQbGF5IiwiaWF0IjoxNjcyNjQ0NDM0LCJleHAiOjE2NzMyNDkyMzQsImlzcyI6Im5vb3JwbGF5In0.cgt9LtwAVmeJI5tTiNBPSLV1G1VQ7t-iq_oc4fyAw0o",
//                             }, "method": "GET"},);
//       const thumbnailContent = await thumbNailRes.json();
//       let newThumbNailData = await actThumbnailDataOne(thumbnailContent.data ? thumbnailContent.data : []);
//       let thumbnailSData = [];
//       thumbnailSData = thumbnailSData.concat([newThumbNailData]);
//       data = data.concat([caroselData], [thumbnailSData], [newFilteredSections]);
    
//       console.log('6666', data);
//       // Pass data to the page via props
//       return { props: { data } }
//   });
export function getParams(params) {
  var urlParam = [];
  for (var i in params){
    urlParam.push(encodeURI(i) + "=" + encodeURI(params[i]));
  }
  urlParam =  urlParam.join("&").toString();
  urlParam =  urlParam.replaceAll('%22', "");
  return urlParam;
};

export function actACrouselDataOne(data){
  let filteredArray = [];
  if(data.length >=0){
    return filteredArray = data.map((item, index)=> {
      let filteredData = {};
      filteredData.uid = item.category;
      filteredData.id = item.objectid;
      filteredData.title = item.title;
      filteredData.image = getHotspotImageOne(item.poster);
      return filteredData;
    });       
  }else{ 
    return [];
  }
};

export function actThumbnailDataOne(data, dtype){
  let filteredArray = [];
  if(data.length >=0){
    console.log("helloooooooo", data);
    return filteredArray = data.map((item, index)=> {
      let filteredData = {};
      filteredData.uid = item.category;
      filteredData.id = item.objectid;
      filteredData.title = item.title;
      // filteredData.image = getHotspotImageOne(item.poster);
      filteredData.image = actAthumbnailImage(item.poster, dtype);
      return filteredData;
    });       
  }else{ 
    return [];
  }
};

export const getHotspotImageOne = (sectionListDetailSingle) => {
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
};

export const actAthumbnailImage = (sectionListDetailSingle, x) => {
  let single = [];
  let singleUrl = '';
  console.log("cvvv", sectionListDetailSingle);
  sectionListDetailSingle.filter((img) => {
    if(x === "PORTRAIT"){
    if(sectionListDetailSingle.length > 1){
    if (img.postertype === "PORTRAIT") {
      single = img.filelist;
    }
  }else{
    if (img.postertype === "LANDSCAPE") {
      single = img.filelist;
    }
  }
  }else{
    if (img.postertype === "LANDSCAPE") {
      single = img.filelist;
    }
  }
  });
  if (single.length > 0) {  
      single.filter((img) => {
        if (img.quality === "LOW") {
          singleUrl =  img.filename;
        }
      });
} else singleUrl = '';
return singleUrl;
};

export function getFilteredSection(fs) {
  let newFilteredSections = [];
  fs.map((item, i)=>{
    if(item.sectionType === "CONTINUEWATCH"){
      console.log("CONTINUEWATCH", item.sectionType === "CONTINUEWATCH")
    }else{
      newFilteredSections.push(item);
    }
  });
  return newFilteredSections;
};
  