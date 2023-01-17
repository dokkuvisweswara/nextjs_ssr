
import styles from '../../styles/Details.module.css';

const About = ({data}) => {
    console.log("Huhooooo---", data);
    let locaValue = localStorage.getItem('Active');
    return(
        <div className={styles.detailsContainer}>
        <h1>About........</h1>
        <ul>
            {data && data.map((item, index)=> (
                locaValue ? <li key={index}>{item.title}</li> : <li key={index}>{item.sectionID}</li>
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
      console.log("6666666666", context, sss);    
      
      // Pass data to the page via props
      return { props: { data }, revalidate: 60*5}
  };

// export async function getStaticPaths() {
//     const paths =['/About'];
//     return { paths, fallback: true }
// };
export default About;