
import { useNavigate ,useLocation } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";

function Sidebar() {
  const Navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const SECTIONS = [
    { key: "Dashboard", icon: "🏠", path: "/Layout/Dashboard" },
    { key: "Add Food", icon: "➕", path: "/Layout/AddFood" },
    { key: "Recommendations", icon: "💡", path: "/Layout/Recommendations" },
    { key: "Profile", icon: "👤", path: "/Layout/Profile" },

     ];
//useLocation() returns an object,
  return (
    <div className='sidnaveOuterContainer'>
      <button className='sidebarOpenBtn' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "←" : "→"}
      </button>

      <aside className={`dyp-side ${isOpen ? "showSidebar" : ""}`}>
        <ul className='sideListItem'>
          {SECTIONS.map((s) => (
            <li
              key={s.key}
              onClick={() => Navigate(s.path)}
              className={location.pathname === s.path ? "activelink" : "asideListItem"}
            >
              <span>{s.icon}</span>
              <p>{s.key}</p>
            </li>
          ))}
        </ul>
        
      </aside>
    </div>
  );
}

export default Sidebar;
