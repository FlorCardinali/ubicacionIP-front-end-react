import styles from "./App.module.css"

const Footer = () => {
    return ( 
        <section className={styles.footerText}>
              <a className={styles.important} href="https://portfolio-cardinali-florencia.netlify.app/">Portfolio</a> | <a className={styles.linkdln} href="https://www.linkedin.com/in/florencia-cardinali/">Linkdln</a> | Florencia Cardinali, 2025
        </section>
     );
}
 
export default Footer;