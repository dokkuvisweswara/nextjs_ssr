'use client';

import { useRouter } from "next/router";
import Router from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { SET_PROFILE_NAME } from "../../redux/slices/profileSlice";
import { useLayoutEffect, useEffect, useState } from "react";
import Head from "next/head";
import styles from '../../styles/Login.module.css';
import Redirect from '../../components/Redirect';
import NextButton from '../../components/NextButton';

export default function Login() {
  const router = useRouter();
  let [userState, setUserState] = useState<any>('');
  let [userLoggedIn, setUserLoggedIn] = useState(false);
  let [errorHandle, setErrorHandle] = useState(false);
  useLayoutEffect(()=>{
    console.log("99999", localStorage.getItem('userName'));
    setUserState(localStorage.getItem('userName') == null ? '' : localStorage.getItem('userName'));
    if(localStorage.getItem('userName') == null){
      setUserLoggedIn(false);
    }else {
      setUserLoggedIn(true);
    }
  },[router.events]);

  const handleSubmit = (data:any) => {
    if(userState == ''){
      setErrorHandle(true);
    }else{
      setErrorHandle(false);
      localStorage.setItem('userName', userState); 
      // setUserLoggedIn(true);   
      Router.push('/Home');
    }
  }
  const loginForm = () => {
    return (
      <>
        <div className={styles.loginForm}>
          <div className={styles.loginCard}>
            <div className={styles.loginHeadder}>
              <h1 className="M0">Login Form</h1>
            </div>
            <div className={styles.innerForm}>
              <input type="text" name="name" value={userState} onChange={(event) => setUserState(event.target.value)} placeholder="userName" />
              <input type="password" name="password" placeholder="password" />
              {errorHandle && <h5 style={{color:'red'}}>userName should not empty</h5>}
              <NextButton data="outline-success" btnName="LOGIN" disblity={false} width="100%" callBack={handleSubmit}/>
              <div>
              <div id="g_id_onload"
                  data-client_id="210901910046-rfq56c0me9i6mlpt7vf9pevd00e11vm8.apps.googleusercontent.com"
                  data-context="signin"
                  data-ux_mode="popup"
                  data-login_uri="https://nextjs-ssr-q77k.vercel.app/Login"
                  data-auto_select="true"
                  data-itp_support="true">
              </div>
              <div className="g_id_signin"
                  data-type="standard"
                  data-shape="rectangular"
                  data-theme="outline"
                  data-text="signin_with"
                  data-size="large"
                  data-logo_alignment="left">
              </div>
            </div>
            </div>
            
          </div>
        </div>
      </>
    )
  }
  return (
    <div className={styles.detailsContainer}>
      <Head>
        <title>Login Page</title>
      </Head>
      <main className={styles.main}>
        {
          userLoggedIn ? <Redirect user={userState}/> : loginForm()
        }
      </main>
    </div>
  )
}