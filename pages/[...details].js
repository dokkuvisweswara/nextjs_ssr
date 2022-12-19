import styles from '../styles/Details.module.css';
import Image from 'next/image';

export default function Details({data}) {
    const filterImage = (images) => {
        var targetImage = "";
        if (images) {
          images.forEach(image => {
            if (image.type === 'system') {
              targetImage = image.format['tiles-sd']['source'];
            }
          });
        }
        return targetImage;
      }
    return(
        <div className={styles.detailsContainer}>
            <div className={styles.detailMainSection}>
                <div className={styles.deatilsText}>
                    <h1 className='M0'>{data.titles.default}</h1>
                    <p>{data.long_descriptions.default}</p>
                </div>
                <div className={styles.deatilsImage}>
                    <Image
                        unoptimized
                        src={filterImage(data.images)} 
                        alt={data.titles.default}
                        width={200}
                        height={300}
                    />
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
     // Fetch data from external API 
    const section = context && context.query && context.query.details;
    let sectionName = '';
    console.log("section", section);
    if(section[0] == 'show'){
      sectionName = 'series';
    }else if(section[0] == 'media'){
      sectionName = 'videos';
    }
     context.res.setHeader(
       'Cache-Control',
       'public, s-maxage=100, stale-while-revalidate=59'
     );
     const URl = `https://api.cloud.altbalaji.com/media/`+sectionName+`/`+section[2]+`?domain=IN`;
     const response = await fetch(URl);
     console.error("res", response)
     const content = await response.json();
     let data = [];
     data = content ? content : [];
     // Pass data to the page via props
     
     return { props: { data } }
}