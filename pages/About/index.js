
import { useState } from 'react';
import styles from '../../styles/Details.module.css';

const About = ({data}) => {
    const isSSR = () =>{return typeof window  == undefined};
    let [localValue, setLocalValue] = useState(null);
    // setInterval(()=>{
    //     setLocalValue(localStorage.getItem('Active'));
    // }, 5);
    return(
        <div className={styles.detailsContainer}>
        <h1>About........</h1>
        <ul>
            {data && data.map((item, index)=> (
                localValue ? <li key={index}>{item.title}</li> : <li key={index}>{item.sectionID}</li>
            ))}
        </ul>
        </div>
        
    )
}
export const getStaticProps = async (context, sss) => {    // Fetch data from external API 
      let data = [];
      const configUrl = 'https://realtimedatabasesumit.firebaseio.com/alt.json';
      const configRes = await fetch(configUrl);
      data = await configRes.json();
      
      // Pass data to the page via props
      return { props: { data }, revalidate: 60*5}
  };

// export async function getStaticPaths() {
//     const paths =['/About'];
//     return { paths, fallback: true }
// };
export default About;