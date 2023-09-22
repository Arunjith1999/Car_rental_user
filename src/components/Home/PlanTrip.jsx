import SelectCar from '../../assets/Images/icon1.png'
import Contact from '../../assets/Images/icon2.png'
import Drive from '../../assets/Images/icon3.png'
import styles from './PlanTrip.module.css'

function PlanTrip() {
  return (
    <>
      <section className={styles['plan-section']}>
        <div className={styles.container}>
          <div className={styles['plan-container']}>
            <div className={styles.title}>
              <h5 className={styles['plancontainer-h3']}>Plan your trip now</h5>
              <h2 className={styles['plancontainer-h2']}>Quick & easy car rental</h2>
            </div>

            <div className={styles.boxes}>
              <div className={styles.box}>
                <img className={styles['box-img']} src={SelectCar} alt="icon_img" />
                <h3 className={styles['box-h3']}>Select Car</h3>
                <p className={styles['box-p']}>
                  We offers a big range of vehicles for all your driving needs.
                  We have the perfect car to meet your needs
                </p>
              </div>

              <div className={styles.box}>
                <img className={styles['box-img']} src={Contact} alt="icon_img" />
                <h3 className={styles['box-h3']}>Contact Operator</h3>
                <p className={styles['box-p']}>
                  Our knowledgeable and friendly operators are always ready to
                  help with any questions or concerns
                </p>
              </div>

              <div className={styles.box}>
                <img  className={styles['box-img']} src={Drive} alt="icon_img" />
                <h3 className={styles['box-h3']}>Let's Drive</h3>
                <p className={styles['box-p']}>
                  Whether you're hitting the open road, we've got you covered
                  with our wide range of cars
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlanTrip;