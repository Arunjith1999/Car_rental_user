import React from 'react'
import BgShape from '../../assets/Images/hero-bg.png'
import  styles from './Hero.module.css'
import HeroCar from '../../assets/Images/main-car.png'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Hero = () => {
  return (
    <div>
      <section id="home" className={styles['hero-section']}>
        <div className={styles.container}>
          <img className={styles['bg-shape']} style={{width:'60%', height:'110% '}}  src={BgShape} alt="bg-shape" />
          <div className={styles['hero-content']}>
            <div className={styles.text}>
              <h4 className={styles.h4}>Plan your trip now</h4>
              <h1 className={styles.h1}>
                Save <span className={styles.span}>big</span> with our car rental
              </h1>
              <p className={styles.p}>
                Rent the car of your dreams. Unbeatable prices, unlimited miles,
                flexible pick-up options and much more.
              </p>
              <div className={styles['hero-btns']}>
                <Link
                //   onClick={bookBtn}
                  className={styles['book-ride']}
                  to="/"
                >
                  Book Ride &nbsp; <i className="fa-solid fa-circle-check"></i>
                </Link>
                <Link className={styles['learn-more']} to="/">
                  Learn More &nbsp; <i className="fa-solid fa-angle-right"></i>
                </Link>
              </div>
            </div>

            {/* img */}
            <img
              src={HeroCar}
              alt="car-img"
              className={styles['car-img']}
            />
          </div>
        </div>

        {/* page up */}
        <div
        //   onClick={scrollToTop}
        //   className={`scroll-up ${goUp ? "show-scroll" : ""}`}
        >
          <i className="fa-solid fa-angle-up"></i>
        </div>
      </section>
    </div>
  )
}

export default Hero
