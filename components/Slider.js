
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import styles from '../styles/Slider.module.css';
import Image from 'next/image';

export default function Slider({ data }) {
    console.log("data===", data);
    const router = useRouter();
    const emptyData = [1, 2, 3, 4]
    const [tabsBoxOne, setTabsBoxOne] = useState(false);
    useEffect(() => {
        let isDragging = false;
        if (!router.isReady) return;
        const tabsBox = document.querySelectorAll('[data-tab-box]');
        setTabsBoxOne(tabsBox[0]);
        const dragging = (e) => {
            if(!isDragging) return;
            tabsBox[0].scrollLeft -= e.movementX; 
        };
        // tabsBox[0].addEventListener("mousedown", () => {isDragging = true;} );
        tabsBox[0].addEventListener("mousemove", dragging);
        // document.addEventListener("mouseup", () => {isDragging = false;});
    }, [router.isReady]);
    const handlePrevNext = (isPrevious) => {
            tabsBoxOne.scrollLeft += isPrevious ? -350 : 350;
    }
    const goToDetailsPage = (data) => {
        let contentType = data.uid;
        let contentId = data.id;
        const str = data.title;
        const spacesReplaced = str.replaceAll(' ', '-');
        router.push('show/'+spacesReplaced+'/'+contentId);
        if (contentType == "TVSHOW") {
            
            router.push('series/'+spacesReplaced+'/'+contentId);
          } else {
            router.push('movie/'+spacesReplaced+'/'+contentId);
          }
        // router.push('series/baby-come-naa/242');
    }
    return (
        <div className={styles.main}>
        <div className={styles.WRAPPER}>
            <button
                className={`${styles.carouselButton} ${styles.carouselButtonPrevious}`}
                data-carousel-button-previous
                onClick={() => handlePrevNext(true)}
            >
                <span className={`fas fa-chevron-left ${styles.PREVBTN}`}></span>
            </button>
            <button
                className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
                data-carousel-button-next
                onClick={() => handlePrevNext(false)}
            >
                <span className={`fas fa-chevron-right ${styles.NEXTBTN}`}></span>
            </button>
        <div className={styles.TABSBOX} data-tab-box>
            {data.length >0 ? data.map((item, index)=> (
            <div className={styles.TAB} onClick={()=>goToDetailsPage(item)} key={index}>
                <Image 
                    unoptimized 
                    src={item.image} 
                    alt={item.title}
                    width={200}
                    height={300}
                    loading="lazy"
                    />
            </div>
            )) : emptyData.map((item, index)=> (
                <div className={styles.TAB} onClick={()=>goToDetailsPage(item)} key={index}>
                    <div className={styles.IMG}></div>
                </div>
                ))
            }
        </div>
        </div>
        </div>
    )
}