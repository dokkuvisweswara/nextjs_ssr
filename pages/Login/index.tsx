'use client';

import { useRouter } from "next/router";
import Router from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { SET_PROFILE_NAME } from "../../redux/slices/profileSlice";
import { useLayoutEffect, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from '../../styles/Login.module.css';
import Redirect from '../../components/Redirect';
import NextButton from '../../components/NextButton';
import darklogo from '~image/btn_google_signin_light_normal_web@2x.png';
declare global {
  interface Window { google:any }
}
export default function Login() {
  const router = useRouter();
  let [userState, setUserState] = useState<any>('');
  let [userData, setUserData] = useState<any>({});
  let [userLoggedIn, setUserLoggedIn] = useState(false);
  let [errorHandle, setErrorHandle] = useState(false);
  
  useLayoutEffect(()=>{
    console.log("99999", localStorage.getItem('userName'));
    setUserState(localStorage.getItem('userName') == null ? '' : localStorage.getItem('userName'));
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
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
      let user:any = {};
      user.name = userState;
      setUserData(user);
      localStorage.setItem('userName', userState); 
      setUserLoggedIn(true);   
      // Router.push('/Home');
    }
  }
 const  parseJwt = (token: any) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  function handleCredentialResponse(response:any) {
    let user:any = {};
    let cred = parseJwt(response.credential);    
    console.log("JSON===>", JSON.stringify(response));
    console.log("Encoded JWT ID token: " + response.credential, response.code);
    console.log("cred===>", cred);
    user.name = cred.given_name;
    user.email = cred.email;
    user.picture = cred.picture;
    setUserData(user);
    localStorage.setItem('userName', cred.given_name); 
    setUserLoggedIn(true);
    let your_id_token = response.credential;
    fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=`+your_id_token )
  }
  function googleLogin() {
    window.google.accounts.id.initialize({
      client_id: "210901910046-rfq56c0me9i6mlpt7vf9pevd00e11vm8.apps.googleusercontent.com",
      scope: 'email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
      callback: handleCredentialResponse
    });
    window.google.accounts.id.prompt(); // also display the One Tap dialog
  }
  
  const handleCLickRedirect = () => {
    setUserLoggedIn(false);
  }
  return (
    <div className={styles.detailsContainer}>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className={styles.main}>
        {
          userLoggedIn ? <Redirect user={userData} callBack={handleCLickRedirect}/> : <LoginForm />
        }
      </div>
    </div>
  )
  function LoginForm() {
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
              <div style={{'textAlign': 'center'}}>OR</div>
              <div id={styles.buttonDiv} onClick={() => googleLogin()}>
                <Image 
                      unoptimized 
                      src={darklogo}
                      alt={"google"} 
                      width={260} height={50}
                      loading="lazy"
                      blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      placeholder="blur"
                />
              </div>
            </div>
            
          </div>
        </div>
      </>
    )
  }
}