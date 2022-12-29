import { useRouter } from 'next/router';
import { pid } from 'process';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Carousel from '../components/Carousel';
import Slider from '../components/Slider';
import Gridview from '../components/Gridview';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import {wrapper} from '../redux/store';
import { SET_CONFIG_DATA, SET_FILTEREDSECTIONS } from "../redux/slices/configSlice";
import { getThumbNailData } from "../auth.server";
import useOnScreen from "../useOnScreen";

export default function Section ({ data })  {
    let [carouselData, setCarouselData] = React.useState(data[0]);
    let [thumbNailData, setThumbNailData] = React.useState(data[0]);
    let user = useSelector((state) => state.config);
    const isSSR = () =>{return typeof window  == undefined};
    console.log("9999999+", isSSR());
    const router = useRouter();
    const section = router.query.section;
    React.useEffect(() => {
        setCarouselData(data[0]);
        setThumbNailData(data[1]);
      window.addEventListener("scroll", () => {
        handleScroll();
        console.log("ppppp")
      }, { once: true });
    }, [router.events, data]);
    const handleScroll = async () => {
      let item = user.filteredData;
      console.log("0000", item.length)
      if(item.length >3){
      const thumbNailUrl = `https://vcms.mobiotics.com/prodv3/`+item[3].endpoint+`?`+getParams(item[4].parameters);
      console.log("__--__", thumbNailUrl);      
      const thumbNailRes = await fetch(thumbNailUrl, {"headers": {
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VpZCI6IjI3Mzk0MDIyNjk4OTkxNyIsImRldmljZXR5cGUiOiJQQyIsImRldmljZW9zIjoiTUFDT1MiLCJwcm92aWRlcmlkIjoibm9vcnBsYXkiLCJ0aW1lc3RhbXAiOjE2NzIwMjgzMTAsImFwcHZlcnNpb24iOiI0Ni40LjAiLCJpcCI6IjE1LjE1OC40Mi4xNiIsIkdlb0xvY0lwIjoiNDkuMjA3LjIyNC4yMDciLCJ2aXNpdGluZ2NvdW50cnkiOiJJTiIsImlzc3VlciI6Im5vb3JwbGF5IiwiZXhwaXJlc0luIjo2MDQ4MDAsInByb3ZpZGVybmFtZSI6Ik5vb3JQbGF5IiwiaWF0IjoxNjcyMDI4MzE2LCJleHAiOjE2NzI2MzMxMTYsImlzcyI6Im5vb3JwbGF5In0.6RCNKdXU4n4LzA47PtZc0Da3GvOlIWnG2XIWgW2zbeQ",
      }, "method": "GET"},);
      const thumbnailContent = await thumbNailRes.json();
      let newThumbNailData = await actThumbnailDataOne(thumbnailContent.data ? thumbnailContent.data : []);
      setThumbNailData([...data[1], newThumbNailData]);
    }
    };
      return (
          <>
          <Head>
            <title>{section}</title>
            <meta name="description" content={section} />
          </Head>
          {
             data.length > 0 ? <>
             <Carousel data={carouselData} />
             {
              thumbNailData && thumbNailData.map((section, index) =>(              
                <Slider data={section} slideIndex={index} key={index}/>
              ))
             }
            </> : <></>
          }        
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
      const configUrl = 'https://d2xowqqrpfxxjf.cloudfront.net/noorplay/web-noorplayv2.json';
      const configRes = await fetch(configUrl);
      const configContent = await configRes.json();
      store.dispatch(SET_CONFIG_DATA(configContent.screens));
      configContent.screens && configContent.screens.map((x, i)=>{
        if(x.id.toUpperCase() == section){
        filteredSections = x.sections;
      }});      
      let newFilteredSections = [];
      filteredSections.map((item, i)=>{
        if(item.sectionType === "CONTINUEWATCH"){
          console.log("CONTINUEWATCH", item.sectionType === "CONTINUEWATCH")
        }else{
          newFilteredSections.push(item);
        }
      });
      store.dispatch(SET_FILTEREDSECTIONS(newFilteredSections));
      thumbnailSections = newFilteredSections.slice(1, 4);
      const carouselUrl = `https://vcms.mobiotics.com/prodv3/`+newFilteredSections[0]['endpoint']+`?`+getParams(newFilteredSections[0].parameters);
      // const thumbNailUrl = `https://vcms.mobiotics.com/prodv3/`+newFilteredSections[1]['endpoint']+`?`+getParams(newFilteredSections[1].parameters);
      const caroselRes = await fetch(carouselUrl, {"headers": {
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VpZCI6IjI3Mzk0MDIyNjk4OTkxNyIsImRldmljZXR5cGUiOiJQQyIsImRldmljZW9zIjoiTUFDT1MiLCJwcm92aWRlcmlkIjoibm9vcnBsYXkiLCJ0aW1lc3RhbXAiOjE2NzIwMjgzMTAsImFwcHZlcnNpb24iOiI0Ni40LjAiLCJpcCI6IjE1LjE1OC40Mi4xNiIsIkdlb0xvY0lwIjoiNDkuMjA3LjIyNC4yMDciLCJ2aXNpdGluZ2NvdW50cnkiOiJJTiIsImlzc3VlciI6Im5vb3JwbGF5IiwiZXhwaXJlc0luIjo2MDQ4MDAsInByb3ZpZGVybmFtZSI6Ik5vb3JQbGF5IiwiaWF0IjoxNjcyMDI4MzE2LCJleHAiOjE2NzI2MzMxMTYsImlzcyI6Im5vb3JwbGF5In0.6RCNKdXU4n4LzA47PtZc0Da3GvOlIWnG2XIWgW2zbeQ",
      }, "method": "GET"},);
      const caroselContent = await caroselRes.json();
      const caroselData = actACrouselDataOne(caroselContent.data ? caroselContent.data : []);
      // const thumbNailRes = await fetch(thumbNailUrl, {"headers": {
      //   "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VpZCI6IjI3Mzk0MDIyNjk4OTkxNyIsImRldmljZXR5cGUiOiJQQyIsImRldmljZW9zIjoiTUFDT1MiLCJwcm92aWRlcmlkIjoibm9vcnBsYXkiLCJ0aW1lc3RhbXAiOjE2NzIwMjgzMTAsImFwcHZlcnNpb24iOiI0Ni40LjAiLCJpcCI6IjE1LjE1OC40Mi4xNiIsIkdlb0xvY0lwIjoiNDkuMjA3LjIyNC4yMDciLCJ2aXNpdGluZ2NvdW50cnkiOiJJTiIsImlzc3VlciI6Im5vb3JwbGF5IiwiZXhwaXJlc0luIjo2MDQ4MDAsInByb3ZpZGVybmFtZSI6Ik5vb3JQbGF5IiwiaWF0IjoxNjcyMDI4MzE2LCJleHAiOjE2NzI2MzMxMTYsImlzcyI6Im5vb3JwbGF5In0.6RCNKdXU4n4LzA47PtZc0Da3GvOlIWnG2XIWgW2zbeQ",
      // }, "method": "GET"},);
      let itemLength = thumbnailSections.length;

      for(let i =0; i< itemLength; i++){
        let item = thumbnailSections[i];
        console.log(`for loop get thumb ${i}`);
        const thumbNailUrl = `https://vcms.mobiotics.com/prodv3/`+item.endpoint+`?`+getParams(item.parameters);
        let actData = {};
        await getThumbNailData(thumbNailUrl).then((response) => {
         thumbnailSectionsData = [...thumbnailSectionsData, response.success.data];
      }).catch((error) => {
          if (error.status == 429) {
            console.log("responsesuccess", error.message);
          }else {
            console.log("responsesuccess", 'Generic error');
          }
         
      });
      console.log(`for loop ${i}`);
      };    
      // const thumbnailContent = await thumbNailRes.json();
      let NewthumbnailSectionsData = thumbnailSectionsData.map((item, i) => {
        let thumbNailData = actThumbnailDataOne(item ? item : []);
        return thumbNailData;
      });
      console.log("NewthumbnailSectionsData", NewthumbnailSectionsData);
      // let thumbNailData = await actThumbnailDataOne(thumbnailContent.data ? thumbnailContent.data : []);
      let thumbNailData = [];
      data = data.concat([caroselData], [NewthumbnailSectionsData], [consfigInfo]);
      store.dispatch(SET_CONFIG_DATA(data));
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
  