import React from 'react'
import styles from './Banner.module.css'

const Banner = () => {
  return (
    <>
      <section className={styles['banner-section']}>
        <div className="container">
          <div className={styles['banner-content']}>
            <div className={styles.text}>
              <h2 className={styles.h2}>Save big with our cheap car rental!</h2>
              <p className={styles.p}>
                Top Airports. Local Suppliers. <span className={styles.span}>24/7</span> Support.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner
