import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaUserMd } from 'react-icons/fa';
import Logo from '../Buttons/Logo.jpg';

const Header = ({ isAuthenticated, profilePicture, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // To detect route changes

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/theripest?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false); // Close the dropdown when the route changes
  }, [location]);

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <img src={Logo} alt="Logo" style={{ width: '40px', height: '32px', marginRight: '8px', borderRadius: '45%' }} />
            <span className="fs-4 text-white"></span>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/contact-us" className="nav-link px-2 text-white">Contact Us</Link></li>
            <li><Link to="/tickets" className="nav-link px-2 text-white">Appointment</Link></li>
            <li><Link to="/services" className="nav-link px-2 text-white">Emergency</Link></li>
            <li><Link to="/help" className="nav-link px-2 text-white">Help</Link></li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 d-flex align-items-center" role="search" onSubmit={handleSearchSubmit}>
            <FaUserMd style={{ marginRight: '8px', color: '#fff' }} />
            <input
              type="search"
              className="form-control form-control-dark text-bg-dark"
              placeholder="Search Therapist"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="text-end d-flex align-items-center">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                <Link to="/signup" className="btn btn-warning">Sign-up</Link>
              </>
            ) : (
              <div className="dropdown ms-3">
                <button
                  className="btn btn-outline-light d-flex align-items-center"
                  onClick={toggleDropdown}
                >
                  {profilePicture ? (
                    <img
                      src={`https://therapist-backend5.onrender.com/${profilePicture}`}
                      alt="Profile"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                      }}
                    />
                  ) : (
                    <FaUserCircle size={24} />
                  )}
                </button>
                {dropdownOpen && (
                  <ul className="dropdown-menu dropdown-menu-end show">
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" to="/history">History</Link></li>
                    <li><Link className="dropdown-item" onClick={onLogout}>Sign Out</Link></li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
