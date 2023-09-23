import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/Images/logo.png'
import { useEffect, useState } from "react";
import { faBars, faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie'
import './navbar.css'
import { categoryGet, userLogout } from "../../../utils/constants";
import axios from '../../../utils/axios'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const [nav, setNav] = useState(false);
  const Token = Cookies.get('jwt')
  const [cat, setCat] = useState([])
  const [showDeleteSwal, setShowDeleteSwal] = useState(false);
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

    setShowDeleteSwal(true);
        {showDeleteSwal && (
            Swal.fire({
              title: 'Are you sure you want to logout ?',
              text: '!!!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, confirm!',
              cancelButtonText: 'cancel'
            }).then((result) => {
              if (result.isConfirmed) {
                Cookies.remove('jwt')
                Cookies.remove('user_id')
                setTimeout(() => {
                  navigate('/login');
                }, 0);
                  setShowDeleteSwal(false);
                }else {
                  // User clicked the cancel button, hide the swal
                  setShowDeleteSwal(false);
                }
              })
            )}
   
   
   
    
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
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar__close">
            <FontAwesomeIcon icon={faXmarkCircle}/>
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link onClick={openNav} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/about">
                About
              </Link>
            </li>
            <li>
              {/* <Link onClick={openNav} to="/models"> */}
                <select name="" id="" onChange={handleSelect}>
                    <option >Categories</option>
                    {cat.map((r, index)=>(
                    <option value={r.id} >{r.title}</option>
                    ))}
                </select>
              {/* </Link> */}
            </li>
            <li>
              <Link onClick={openNav} to="/Profile">
               Profile
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/history">
                History
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/contact">
                Contact
              </Link>
            </li>
            {Token ? 
          

          <div>
          
          <button  onClick={handleLogout}>Logout</button>
        </div>
          
          : 
          
          <div>
          <Link  to="/login">
            Sign In
          </Link>
          <Link  to="/signup">
            Register
          </Link>
        </div>
          
          }
          </ul>
        </div>

        {/* desktop */}

        <div className="navbar">
        <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img  src={Logo} alt="logo-img" />
            </Link>
          </div>
          <ul className="navbar__links">
            <li >
            <Link className="home-link" to="/">
                Home
              </Link>
            </li>
            <li >
              {" "}
              <Link className="about-link" to="/about">
                About
              </Link>
            </li>
            <li >
              {" "}
              {/* <Link className="models-link" to="/models">
                Vehicle Models
              </Link> */}<select style={{fontSize:'1.5rem', backgroundColor: 'transparent',border:'0px'}}  onChange={handleSelect} name="" id="">
                                    <option >Categories</option>

                    {cat.map((r, index)=>(
                    <option key={r.id} value={r.id}>{r.title}</option>
                    ))}
                </select>
            </li>
            <li >
              {" "}
              <Link className="profile-link" to="/profile">
               Profile
              </Link>
            </li>
            <li >
              {" "}
              <Link className="history-link" to="/history">
                History
              </Link>
            </li>
            <li >
              {" "}
              <Link className="contact-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          {Token ? 
          

          <div className="navbar__buttons">
          
          <button  className="navbar__buttons__register" onClick={handleLogout}>Logout</button>
        </div>
          
          : 
          
          <div className="navbar__buttons">
          <Link className="navbar__buttons__sign-in" to="/login">
            Sign In
          </Link>
          <Link className="navbar__buttons__register" to="/signup">
            Register
          </Link>
        </div>
          
          }
      

          {/* mobile */}
          <div  className="mobile-hamb" onClick={openNav}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
