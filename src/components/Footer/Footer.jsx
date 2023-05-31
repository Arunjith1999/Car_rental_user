import styles from './Footer.module.css'

function Footer() {
    return (
      <>
        <footer>
          <div className={styles.container}>
            <div className={styles["footer-content"]}>
              <ul className={styles.one}>
                <li>
                  <span>CAR</span> Rental
                </li>
                <li>
                  We offers a big range of vehicles for all your driving needs. We
                  have the perfect car to meet your needs.
                </li>
                <li>
                  <a className={styles.a} href="tel:123456789">
                    <i className="fa-solid fa-phone"></i> &nbsp; (123) -456-789
                  </a>
                </li>
  
                <li>
                  <a
                    href="mailto: 
                  carrental@gmail.com"
                  >
                    <i className="fa-solid fa-envelope"></i>
                    &nbsp; calebjephuneh@gmail.com
                  </a>
                </li>
  
                <li>
                  <a
                    style={{ fontSize: "14px" }}
                    target="_blank"
                    rel="noreferrer"
                    href="https://jephunneh.com/"
                  >
                    Design by cjephuneh
                  </a>
                </li>
              </ul>
  
              <ul className="footer-content__2">
                <li>Company</li>
                <li>
                  <a href="#home">New York</a>
                </li>
                <li>
                  <a href="#home">Careers</a>
                </li>
                <li>
                  <a href="#home">Mobile</a>
                </li>
                <li>
                  <a href="#home">Blog</a>
                </li>
                <li>
                  <a href="#home">How we work</a>
                </li>
              </ul>
  
              <ul className={styles.two}>
                <li>Working Hours</li>
                <li>Mon - Fri: 9:00AM - 9:00PM</li>
                <li>Sat: 9:00AM - 19:00PM</li>
                <li>Sun: Closed</li>
              </ul>
  
              <ul className={styles.two}>
                <li>Subscription</li>
                <li>
                  <p>Subscribe your Email address for latest news & updates.</p>
                </li>
                <li>
                  <input className={styles.input} type="email" placeholder="Enter Email Address"></input>
                </li>
                <li>
                  <button className={styles.email}>Submit</button>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </>
    );
  }
  
  export default Footer;
  