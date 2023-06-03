import { useEffect, useState } from "react";
import CarAudi from '../../assets/Images/logo.png'
import CarGolf from '../../assets/Images/logo.png'
import CarToyota from '../../assets/Images/logo.png'
import CarBmw from '../../assets/Images/logo.png'
import CarMercedes from '../../assets/Images/logo.png'
import CarPassat from '../../assets/Images/logo.png'
import styles from './BookCar.module.css'
import axios from "../../../utils/axios";
import { brandGet } from "../../../utils/constants";
function BookCar() {
  const [modal, setModal] = useState(false); //  class - active-modal

  // booking car
  const [carType, setCarType] = useState([]);
  const [brand, setBrand] = useState('')
  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [carImg, setCarImg] = useState("");

  // modal infos
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");

  useEffect(()=>{
    axios.get(brandGet).then((res)=>{
      setCarType(res.data)
    })
  },[])

  // taking value of modal inputs
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleAge = (e) => {
    setAge(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleZip = (e) => {
    setZipCode(e.target.value);
  };

  // open modal when all inputs are fulfilled
  const openModal = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    if (
      pickUp === "" ||
      dropOff === "" ||
      pickTime === "" ||
      dropTime === "" ||
      carType === ""
    ) {
      errorMsg.style.display = "flex";
    } else {
      setModal(!modal);
      const modalDiv = document.querySelector(".booking-modal");
      modalDiv.scroll(0, 0);
      errorMsg.style.display = "none";
    }
  };

  // disable page scroll when modal is displayed
  useEffect(() => {
    if (modal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  // confirm modal booking
  const confirmBooking = (e) => {
    e.preventDefault();
    setModal(!modal);
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "flex";
  };

  // taking value of booking inputs
  const handleCar = (e) => {
    setCarType(e.target.value);
    // setCarImg(e.target.value);
  };

  const handlePick = (e) => {
    setPickUp(e.target.value);
  };

  const handleDrop = (e) => {
    setDropOff(e.target.value);
  };

  const handlePickTime = (e) => {
    setPickTime(e.target.value);
  };

  const handleDropTime = (e) => {
    setDropTime(e.target.value);
  };

  // based on value name show car img
  let imgUrl;
  switch (carImg) {
    case "Audi A1 S-Line":
      imgUrl = CarAudi;
      break;
    case "VW Golf 6":
      imgUrl = CarGolf;
      break;
    case "Toyota Camry":
      imgUrl = CarToyota;
      break;
    case "BMW 320 ModernLine":
      imgUrl = CarBmw;
      break;
    case "Mercedes-Benz GLK":
      imgUrl = CarMercedes;
      break;
    case "VW Passat CC":
      imgUrl = CarPassat;
      break;
    default:
      imgUrl = "";
  }

  // hide message
  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "none";
  };

  return (
    <>
      <section id="booking-section" className={styles["book-section"]}>
        {/* overlay */}
        <div
          onClick={openModal}
          className={`modal-overlay ${modal ? "active-modal" : ""}`}
        ></div>

        <div className={styles.container}>
          <div className={styles["book-content"]}>
            <div className={styles.box}>
              <h2 className={styles.h2}>Book a car</h2>

              <p className={styles["error-message"]}>
                All fields required! <i className="fa-solid fa-xmark"></i>
              </p>

              <p className="booking-done">
                Check your email to confirm an order.{" "}
                <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
              </p>

              <form className={styles["box-form"]}>
                <div className={styles["car-type"]}>
                  <label>
                    <i className={styles.label}></i> &nbsp; Select Your Car
                    Brand <b>*</b>
                  </label>
                  <select className={styles.select} value={brand} onChange={(e)=>{setBrand(e.target.value)}}>
                    <option>Select your car Brand</option>
                    {carType.map((b)=>(

                    <option value={b.id}>{b.title}</option>
                    ))}
                    
                  </select>
                </div>

                <div className={styles["car-type"]}>
                  <label className={styles.label}>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Pick-up{" "}
                    <b>*</b>
                  </label>
                  <select className={styles.select} value={pickUp} onChange={handlePick}>
                    <option>Select pick up location</option>
                    <option>Belgrade</option>
                    <option>Novi Sad</option>
                    <option>Nis</option>
                    <option>Kragujevac</option>
                    <option>Subotica</option>
                  </select>
                </div>

                <div className={styles["car-type"]}>
                  <label className={styles.label}>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Drop-of{" "}
                    <b>*</b>
                  </label>
                  <select  className={styles.select} value={dropOff} onChange={handleDrop}>
                    <option>Select drop off location</option>
                    <option>Novi Sad</option>
                    <option>Belgrade</option>
                    <option>Nis</option>
                    <option>Kragujevac</option>
                    <option>Subotica</option>
                  </select>
                </div>
             

                {/* <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Pick-up <b>*</b>
                  </label>
                  <input
                    id="picktime"
                    value={pickTime}
                    onChange={handlePickTime}
                    type="date"
                  ></input>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="droptime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Drop-of <b>*</b>
                  </label>
                  <input
                    id="droptime"
                    value={dropTime}
                    onChange={handleDropTime}
                    type="date"
                  ></input>
                </div> */}
                <div >
                <button className={styles.button} type="submit">
                  Search
                </button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* modal ------------------------------------ */}

   
    </>
  );
}

export default BookCar;

