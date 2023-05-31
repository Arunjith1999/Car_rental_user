import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/Images/logo.png'
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import styles from './Home.module.css'
import { categoryGet, userLogout } from "../../../utils/constants";
import axios from '../../../utils/axios'

function Navbar() {
  const [nav, setNav] = useState(false);
  const Token = Cookies.get('jwt')
  const [cat, setCat] = useState([])
  const navigate = useNavigate()
  
  
const handleSelect=(e)=>{
 
    
    const value = e.target.value 
    
    
    navigate(`/category/${value}`)
}
  const openNav = () => {
    setNav(!nav);
  };
const id = Cookies.get('user_id')
console.log(id);
  const handleLogout=()=>{
    Cookies.remove('jwt')
    Cookies.remove('user_id')
    setTimeout(() => {
      navigate('/login');
    }, 0);
   
   
    
  }
  
  useEffect(()=>{
    axios.get(categoryGet).then((res)=>{
        
        setCat(res.data)
        
    })
  },[])

  return (
    <>
      <nav >
        {/* mobile */}
        <div className={`${styles['mobile-navbar']} ${nav ? styles["open-nav"] : ""}`}>
          <div onClick={openNav} className={styles.close}>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <ul className={styles.links}>
            <li className={styles.a}>
              <Link onClick={openNav} to="/">
                Home
              </Link>
            </li>
            <li className={styles.a}>
              <Link onClick={openNav} to="/about">
                About
              </Link>
            </li>
            <li className={styles.a}>
              {/* <Link onClick={openNav} to="/models"> */}
                <select name="" id="">
                    <option >Categories</option>
                    {cat.map((r, index)=>(
                    <option value={r.id} >{r.title}</option>
                    ))}
                </select>
              {/* </Link> */}
            </li>
            <li className={styles.a}>
              <Link onClick={openNav} to="/Profile">
               Profile
              </Link>
            </li>
            <li className={styles.a}>
              <Link onClick={openNav} to="/team">
                History
              </Link>
            </li>
            <li className={styles.a}>
              <Link onClick={openNav} to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* desktop */}

        <div className={styles.navbar}>
          <div className={styles.img}>
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img className={styles.img2} src={Logo} alt="logo-img" />
            </Link>
          </div>
          <ul className={styles.dlinks}>
            <li >
              <Link className={styles.ad} to="/">
                Home
              </Link>
            </li>
            <li >
              {" "}
              <Link className={styles.ad} to="/about">
                About
              </Link>
            </li>
            <li >
              {" "}
              {/* <Link className="models-link" to="/models">
                Vehicle Models
              </Link> */}<select className={styles.ad} style={{fontSize:'1.5rem', backgroundColor: 'transparent',border:'0px'}}  onChange={handleSelect} name="" id="">
                                    <option >Categories</option>

                    {cat.map((r, index)=>(
                    <option key={r.id} value={r.id}>{r.title}</option>
                    ))}
                </select>
            </li>
            <li >
              {" "}
              <Link className={styles.ad} to="/profile">
               Profile
              </Link>
            </li>
            <li >
              {" "}
              <Link className={styles.ad} to="/history">
                History
              </Link>
            </li>
            <li >
              {" "}
              <Link className={styles.ad} to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          {Token ? 
          

          <div className={styles.buttons}>
          
          {/* <Link className={styles.register} to='/login' onClick={handleLogout}>
            Logout
          </Link> */}
          <button className={styles.register} onClick={handleLogout}>Logout</button>
        </div>
          
          : 
          
          <div className={styles.buttons}>
          <Link className={styles.signin} to="/login">
            Sign In
          </Link>
          <Link className={styles.register} to="/signup">
            Register
          </Link>
        </div>
          
          }
      

          {/* mobile */}
          <div className={styles.mobile} onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
