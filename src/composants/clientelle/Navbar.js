import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../style/navbar.css';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

const Navbar=()=> {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  let history = useHistory();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);
  const deconn=()=>{
    localStorage.removeItem('idClient')
    history.push('/')
}
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='#' className='navbar-logo' onClick={closeMobileMenu}>
            SHARING
          </Link>

          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='#' className='nav-links' onClick={closeMobileMenu}>
                Accueil
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/appClient/de'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                INERVENTION
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='#'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                HISTORIQUE
              </Link>
            </li>
            
          </ul>
          <Button variant="contained" onClick={deconn} color="secondary" size="medium" >Log-OUT</Button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;