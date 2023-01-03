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

export default function Section ({ data })  {
    let [carouselData, setCarouselData] = React.useState(data[0]);
    let [thumbNailData, setThumbNailData] = React.useState(data[1]);
    let [isThumbNailLoading, setIsThumbNailLoading] = React.useState(true);
    let [counter, setCounter] = React.useState(2);

    let user = useSelector((state) => state.config);
    const isSSR = () =>{return typeof window  == undefined};
    const router = useRouter();
    const section = router.query.section;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };
    const { ref, inView, entry } = useInView(options);
  
    React.useEffect(() => {
        setCarouselData(data[0]);
        setThumbNailData(data[1]);
        setCounter(2);
        setIsThumbNailLoading(true);
    }, [router.events, data]);
    React.useEffect(() => {      
      inView && handleScroll(counter);
    }, [inView]);

    const handleScroll = async (count) => { 
      console.log("counter", count);
      setCounter(count+1);
      let configContent = user.configData;
      let filteredSections = [];
      let thumbnailSections = [];
      let thumbnailSectionsData = [];
      console.log("configContent", configContent)
      configContent && configContent.map((x, i)=>{
        if(x.id.toUpperCase() == section.toUpperCase()){
        filteredSections = x.sections;
      }});    
      getFilteredSection(filteredSections);
      let newFilteredSections = getFilteredSection(filteredSections) ? getFilteredSection(filteredSections) : [];
      console.log("++++", thumbnailSections);
      let itemLength = newFilteredSections.length;
      if(count >= itemLength){
        setIsThumbNailLoading(false);
        return ;
      }
      const thumbNailUrl = `https://vcms.mobiotics.com/prodv3/`+newFilteredSections[count].endpoint+`?`+getParams(newFilteredSections[count].parameters);
      console.log("itemLength", itemLength);
      await getThumbNailData(thumbNailUrl).then((response) => {
        thumbnailSectionsData = response.success.data;
        }).catch((error) => {
            if (error.status == 429) {
              console.log("responsesuccess", error.message);
            }else {
              console.log("responsesuccess", 'Generic error');
            }
           });
      // for(let i =0; i< itemLength; i++){
      //   let item = thumbnailSections[i];
      //   const thumbNailUrl = `https://vcms.mobiotics.com/prodv3/`+item.endpoint+`?`+getParams(item.parameters);
      //   await getThumbNailData(thumbNailUrl).then((response) => {
      //     thumbnailSectionsData = [...thumbnailSectionsData, response.success.data];
      // }).catch((error) => {
      //     if (error.status == 429) {
      //       console.log("responsesuccess", error.message);
      //     }else {
      //       console.log("responsesuccess", 'Generic error');
      //     }         
      // });
      // };
      console.log("thumbnailSectionsData", thumbnailSectionsData);
      let NewthumbnailSectionsData = actThumbnailDataOne(thumbnailSectionsData ? thumbnailSectionsData : []);
      console.log("NewthumbnailSectionsData", NewthumbnailSectionsData);
      setThumbNailData([...thumbNailData, NewthumbnailSectionsData]);
      console.log("ThumbNailData", thumbNailData);
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
              thumbNailData && thumbNailData.map((section, index) =>(              
                <Slider data={section} slideIndex={index} key={index}/>
              ))
             }
             {isThumbNailLoading && 
             <div ref={ref}><SlideAnimation /></div>}
            </> : <></>
          }   
          </main>     
          </>
      )
};

//ServerSide Props....
export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async (context) => {    // Fetch data from external API 
      let data = [];
      let conFigScreen = store.getState().config.configData;
      const section = context && context.query && context.query.section.toUpperCase();
      let consfigInfo = [];
      let filteredSections = [];
      let thumbnailSections = [];
      let thumbnailSectionsData = [];
      context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=100, stale-while-revalidate=59'
      );
      conFigScreen && conFigScreen.map((x, i)=>{
        if(x.id.toUpperCase() == section){
        filteredSections = x.sections;
      }});    
      getFilteredSection(filteredSections);  
      let newFilteredSections = getFilteredSection(filteredSections) ? getFilteredSection(filteredSections) : [];
      thumbnailSections = newFilteredSections.slice(1, 2);
      const carouselUrl = `https://vcms.mobiotics.com/prodv3/`+newFilteredSections[0].endpoint+`?`+getParams(newFilteredSections[0].parameters);
      const caroselRes = await fetch(carouselUrl, {"headers": {
                          "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VpZCI6IjEyMjM3NjQ2ODgwOTg4MDMiLCJkZXZpY2V0eXBlIjoiUEMiLCJkZXZpY2VvcyI6IldJTkRPV1MiLCJwcm92aWRlcmlkIjoibm9vcnBsYXkiLCJ0aW1lc3RhbXAiOjE2NzI2NDQ0NDYsImFwcHZlcnNpb24iOiI0Ni40LjAiLCJpcCI6IjE1LjE1OC40Mi40IiwiR2VvTG9jSXAiOiIxNzEuNzYuNzEuNzIiLCJ2aXNpdGluZ2NvdW50cnkiOiJJTiIsImlzc3VlciI6Im5vb3JwbGF5IiwiZXhwaXJlc0luIjo2MDQ4MDAsInByb3ZpZGVybmFtZSI6Ik5vb3JQbGF5IiwiaWF0IjoxNjcyNjQ0NDM0LCJleHAiOjE2NzMyNDkyMzQsImlzcyI6Im5vb3JwbGF5In0.cgt9LtwAVmeJI5tTiNBPSLV1G1VQ7t-iq_oc4fyAw0o",
                        }, "method": "GET"},);
      const caroselContent = await caroselRes.json();
      const caroselData = actACrouselDataOne(caroselContent.data ? caroselContent.data : []);
      const thumbNailUrl = `https://vcms.mobiotics.com/prodv3/`+thumbnailSections[0].endpoint+`?`+getParams(thumbnailSections[0].parameters);
      const thumbNailRes = await fetch(thumbNailUrl, {"headers": {
                              "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VpZCI6IjEyMjM3NjQ2ODgwOTg4MDMiLCJkZXZpY2V0eXBlIjoiUEMiLCJkZXZpY2VvcyI6IldJTkRPV1MiLCJwcm92aWRlcmlkIjoibm9vcnBsYXkiLCJ0aW1lc3RhbXAiOjE2NzI2NDQ0NDYsImFwcHZlcnNpb24iOiI0Ni40LjAiLCJpcCI6IjE1LjE1OC40Mi40IiwiR2VvTG9jSXAiOiIxNzEuNzYuNzEuNzIiLCJ2aXNpdGluZ2NvdW50cnkiOiJJTiIsImlzc3VlciI6Im5vb3JwbGF5IiwiZXhwaXJlc0luIjo2MDQ4MDAsInByb3ZpZGVybmFtZSI6Ik5vb3JQbGF5IiwiaWF0IjoxNjcyNjQ0NDM0LCJleHAiOjE2NzMyNDkyMzQsImlzcyI6Im5vb3JwbGF5In0.cgt9LtwAVmeJI5tTiNBPSLV1G1VQ7t-iq_oc4fyAw0o",
                            }, "method": "GET"},);
      const thumbnailContent = await thumbNailRes.json();
      let newThumbNailData = await actThumbnailDataOne(thumbnailContent.data ? thumbnailContent.data : []);
      let thumbnailSData = [];
      thumbnailSData = thumbnailSData.concat([newThumbNailData]);
      data = data.concat([caroselData], [thumbnailSData], [newFilteredSections]);
      
      console.log('6666', data);
      // Pass data to the page via props
      return { props: { data } }
  });
  export function getParams(params) {
    var urlParam = [];
    for (var i in params){
      urlParam.push(encodeURI(i) + "=" + encodeURI(params[i]));
    }
    urlParam =  urlParam.join("&").toString();
    urlParam =  urlParam.replaceAll('%22', "");
    return urlParam;
  }
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
  }
  export function actThumbnailDataOne(data){
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
  }
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
}
  export const actAthumbnailImage = (sectionListDetailSingle) => {
    let single = [];
    let singleUrl = '';
    console.log("cvv", sectionListDetailSingle);
    sectionListDetailSingle.filter((img) => {
      if (img.postertype === "PORTRAIT") {
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
  }
  