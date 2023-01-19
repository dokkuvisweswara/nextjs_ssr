'use client';

import { useRouter } from "next/router";
import Router from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { SET_PROFILE_NAME } from "../../redux/slices/profileSlice";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from '../../styles/Login.module.css';
import Redirect from '../../components/Redirect';
import NextButton from '../../components/NextButton';

export default function Login() {
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const user = useSelector((state: RootState) => state.profile.name);
  const [userLogged, setUserLogged] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user == 'null' || user == null) {
      setUserLogged(false);
    } else {
      setUserLogged(true);
    }
  }, [router, user]);

  const handleSubmit = (data:any) => {
    localStorage.setItem('userName', userName);
    dispatch(SET_PROFILE_NAME(userName));
    // Router.push('/Home');
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
              <input type="text" name="name" value={userName} onChange={(event) => setUserName(event.target.value)} placeholder="userName" />
              <input type="password" name="password" placeholder="password" />
              {/* <button onClick={() => handleSubmit()}>LOGIN</button> */}
              <NextButton data="outline-success" btnName="LOGIN" disblity={false} width="100%" callBack={handleSubmit}/>
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
          userLogged ? <Redirect user={user}/> : loginForm()
        }
      </main>
    </div>
  )
}