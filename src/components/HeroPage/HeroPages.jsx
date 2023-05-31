import { Link } from "react-router-dom";
import styles from './CarModelsAbout.module.css'
function HeroPages({ name }) {
  return (
    <>
      <section className={styles['hero-pages']}>
        <div className={styles.overlay}></div>
        <div className={styles.container}>
          <div className={styles.text}>
            <h3  className={styles['text-h3']}>{name}</h3>
            <p className={styles['text-p']}>
              <Link to="/">Home</Link> / {name}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroPages;