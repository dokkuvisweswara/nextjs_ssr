import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Switch from "@mui/material/Switch";
import { useEffect, useState } from 'react';
import ComponentOne from './components/ComponentOne';
import ComponentTwo from './components/ComponentTwo';
import loadConfig from 'next/dist/server/config';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Home() {
  const user = useSelector((state:any) => state.profile.name)
  const [mobile, setMobile] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if(user == 'null' || user == null){
      router.push('Login');
    } else {
      setUserLogged(true);
    }
  }, [])
  const handleToggle = () => {
    setMobile(!mobile);
  }

  return (
    
    <>
      <main className={styles.main}>   
      {
        !userLogged ? <div>loading....</div> :
        <div>   
          <Switch {...label} onClick={handleToggle}/>
          {
            mobile ? <ComponentOne /> : <ComponentTwo />
          }
        </div>        
      }
      </main>
    </>
  )
}
