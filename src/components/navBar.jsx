import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import '../styles/navBar.css';

const NavBar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);

    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu on link click for mobile
  const handleLinkClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };



  return (
    <>
      {/* <div className='navbar-block'></div> */}
      <div className='navbar'>
        <div className="navbar-left">
          <div className="navbar-left-name" style={{ display: "flex", gap: "7px" }}>
            INVOICE <p>MANAGEMENT.</p>
          </div>
        </div>

        {isMobile ? (
          <>
            <button className="hamburger-menu" onClick={toggleMenu}>
              {isMenuOpen ? <IoClose className='hamburger-menu-close'/> : <GiHamburgerMenu className='hamburger-menu-ham'/>}
            </button>
            {isMenuOpen && (
              <div className="mobile-menu">
                <Link
                  className={`navbar-right-link-properties ${location.pathname === '/' ? 'active' : ''}`}
                  to="/"
                  onClick={handleLinkClick}
                >
                  HOME
                </Link>
                <Link
                  className={`navbar-right-link-properties ${location.pathname === '/add-invoice' ? 'active' : ''}`}
                  to="/add-invoice"
                  onClick={handleLinkClick}
                >
                  ADD INVOICE
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="navbar-right">
            <Link
              className={`navbar-right-link-properties ${location.pathname === '/' ? 'active' : ''}`}
              to="/"
            >
              HOME
            </Link>
            <Link
              className={`navbar-right-link-properties ${location.pathname === '/add-invoice' ? 'active' : ''}`}
              to="/add-invoice"
            >
              ADD INVOICE
            </Link>
          </div>
        )}
      </div>

      {/* Show 'Add Invoice' section when the state is true */}
      
    </>
  );
};

export default NavBar;
