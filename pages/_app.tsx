import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Header from '../pages/Header/Header';
import Footer from '../pages/Footer/Footer';
import styles from '../styles/Home.module.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
  <Header />
  <div className={styles.container}>
  <Component {...pageProps}/>     
  </div>
  <Footer />
  </>
  )
}
