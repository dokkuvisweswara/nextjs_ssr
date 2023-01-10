import { useEffect, useState } from "react";
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import Head from "next/head";

export default function Carousel({ data }) {
    console.log("data-->", data);
    const router = useRouter();
    const { id } = router.query;
    let [currentSlide, setCurrentSlide] = useState(0);
    let [numSlides, setNumSlides] = useState(0);
    let [carousel, setCarousel] = useState(null);
    let [interval, setInterval] = useState(null);   
    useEffect(() => {
        if (!router.isReady) return;
        setCurrentSlide(0);
        setNumSlides(0);
        const carousels = document.querySelectorAll('[data-carousel]');
        carousels.forEach((carou, index) => {
            setCarousel(carou);
            actsetUpCarousel(carou);
        });
    }, [data, id, router.isReady]);

    function modulo(number, mod) {
        let result = number % mod;
        if (result < 0) {
            result += mod;
        }
        return result;
    }

    function actsetUpCarousel(carousel) {
        setCarousel(carousel);
        console.log("carousel", carousel)
        const slidesContainer = carousel.querySelector('[data-carousel-slides-container]');
        setNumSlides(slidesContainer.children.length);
    };
    // function autoSlide() {
    //     return setInterval(() => {
    //         let currentIndex = currentSlide;
    //         if (currentIndex+1 === numSlides) {
    //             currentIndex = 0;
    //         } else {
    //             currentIndex = currentIndex+1;
    //         }
    //         changeSlide(currentIndex);
    //         setCurrentSlide(currentIndex);
    //     }, 3000);
    // }
    function changeSlide(slideNumber) {
        carousel.style.setProperty('--current-slide', slideNumber);
    }
    function handleNext() {
        setCurrentSlide(modulo(currentSlide + 1, numSlides));
        changeSlide(modulo(currentSlide + 1, numSlides));
    }

    function handlePrev() {
        setCurrentSlide(modulo(currentSlide - 1, numSlides));
        changeSlide(modulo(currentSlide - 1, numSlides));
    }
    const isActive = (active) => {
        if (active) {
            return styles.active;
        } else { return ''; }
    }
    const handleNavigation = (item) => {
        setCurrentSlide(item);
        changeSlide(item);
    }
    const goToDetailsPage = (data) => {
        let contentType = data.uid;
        let contentId = data.id;
        const str = data.title;
        const spacesReplaced = str.replaceAll(' ', '-');
        if (contentType == "TVSHOW") {            
            router.push('series/'+spacesReplaced+'/'+contentId);
          } else {
            router.push('movie/'+spacesReplaced+'/'+contentId);
          }
        // router.push('series/baby-come-naa/242');
    }
    return (
            <div style={{ 'width': '100%' }}>
                <div className={styles.carousel} data-carousel>
                    {data && data.length > 0 ?
                        <>
                            <div className={styles.SLIDER} data-carousel-slides-container>
                                {
                                    data.map((x, index) => (
                                        <CarouselSlider data={x} i={index} key={index}/>
                                    ))
                                }
                            </div>
                            <div className="styles.carousel-buttons">
                                <button
                                    className={`${styles.carouselButton} ${styles.carouselButtonPrevious}`}
                                    data-carousel-button-previous
                                    onClick={() => handlePrev()}
                                >
                                    <span className={`fas fa-chevron-left ${styles.PREVBTN}`}></span>
                                </button>
                                <button
                                    className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
                                    data-carousel-button-next
                                    onClick={() => handleNext()}
                                >
                                    <span className={`fas fa-chevron-right ${styles.NEXTBTN}`}></span>
                                </button>
                            </div>
                            <div className={styles.NAVIGATIONVISIBILITY} data-navigation>
                                {
                                    data.map((x, index) => (
                                        <div
                                            className={`${styles.SLIDEICON} ${isActive(currentSlide == index)}`}
                                            key={index} id={`SLIDEICON${index}`}
                                            data-navigation-btn
                                            onClick={() => handleNavigation(index)}
                                        ></div>
                                    ))}
                            </div>
                        </>
                        : <h1>Loading.....</h1>
                    }
                </div>
            </div>
    );

    function CarouselSlider({data, i}) {
        console.log("data--i", data, i)
        // const getHotspotImage = (sectionListDetailSingle) => {
        //     let single = []
        //     single = sectionListDetailSingle.filter((img) => {
        //       if (img.type === 'system') {
        //         return img;
        //       }
        //       return ''
        //     });
        
        //     if (single.length > 0) {
        //       if (single[0].format && typeof (single[0].format) != 'string') {
        //         // return single[0].format['tiles-hd'].source
        //         return single[0].format['tiles-sd'].source
        //       } else {
        //         single = sectionListDetailSingle.filter((img) => {
        //           //previously we taking img.type === "system" && img.formet == 'tiles-hd'
        //           if (img.type === 'system' && img.format == 'tiles-sd') {
        //             return img;
        //           }
        //           return ''
        //         });
        //         return single[0].url;
        //       }
        //     }
        //   }
        return (
            <div className={styles.SLIDE} key={i} id="SLIDE" onClick={()=>goToDetailsPage(data)}>
                <Image 
                    unoptimized 
                    src={data.image} 
                    alt={data.title} 
                    width={100} height={200} 
                    key={i}
                    loading="lazy"
                    blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    placeholder="blur"
                    />
                {/* <div className={styles.INFO}>
                    <h2>Hello</h2>
                    <p>I am fine what about you</p>
                    <span>Info</span><span>Play</span><span>+</span>
                </div> */}
            </div>
        )
    }
}


