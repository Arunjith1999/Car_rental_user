import { useEffect, useState } from "react";
import CarBox from "./CarBox";
import { CAR_DATA } from "./CarData";
import styles from './CarPick.module.css'
import axios from '../../../utils/axios'
import { homeCarGet } from "../../../utils/constants";


function PickCar() {
  const [active, setActive] = useState(1);
  const [car, setCar] = useState([])
  const [colorBtn, setColorBtn] = useState(1);
  
  const btnID = (id) => {
    setColorBtn(colorBtn === id ? "" : id);
  };

  const coloringButton = (id) => {
    return colorBtn === id ? "colored-button" : "";
  };

  useEffect(()=>{
    axios.get(homeCarGet).then((res)=>{
      
     console.log(res.data);
setCar(res.data)
    })
  },[])

  return (
    <>
      <section className={styles["pick-section"]}>
        <div className={styles.container}>
          <div className={styles["pick-container"]}>
            <div className={styles.title}>
              <h3 className={styles.h3}>Vehicle Models</h3>
              <h2 className={styles.h2}>Our rental fleet</h2>
              <p className={styles.p}>
                Choose from a variety of our amazing vehicles to rent for your
                next adventure or business trip
              </p>
            </div>
            <div className={styles["car-content"]}>

              
              <div className={styles["pick-box"]}>
                {car.map((c)=>(
                    <button
                    // className={`${coloringButton(c.id)}`}
                    className={styles.button}
                    id={c.id}
                    onClick={() => {
                      setActive(c.id);
                      {active === c.id && <CarBox data={c}  />}
                      btnID(c.id);
                    }}
                  >
                    {c.name}
                  </button>
                  
                ))}

                
                
              </div>

             
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PickCar;
