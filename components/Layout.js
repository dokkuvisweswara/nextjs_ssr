import Footer from "./Footer";
import Header from "./Header";
import styles from '../styles/Home.module.css';
const Layout = ({children}) => {
    return (
        <div className="content">
            <Header/>
            <div className={styles.container}>
                { children }
            </div>
            <Footer />
        </div>
    )
}
export default Layout;