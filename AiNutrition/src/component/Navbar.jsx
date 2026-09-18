import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Navbar.css";

function Navbar() {
  let Navigate = useNavigate();
  const [usersname, setUsersname] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/usersName")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUsersname(data.name);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Navigate]);

  const firstCharName = usersname.charAt(0);
  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        {/* Logo */}
        <div className='logo'>
          <div className='logo-icon'>🌿</div>

          <div className='logo-text'>
            <h2>DECODE</h2>
            <h2>YOUR PLATE</h2>
            <span>AI Nutrition Intelligence</span>
          </div>
        </div>

        {/* Navigation */}

        {/* Auth buttons */}

        <button className='dyp-nav__user' onClick={() => Navigate("/")}>
          Logout{" "}
          <span className='dyp-nav__avatar'>
            {firstCharName ? firstCharName : ""}
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
