
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";

function Sidebar() {
  const Navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const SECTIONS = [
    { key: "Dashboard", icon: "🏠", path: "/Layout/Dashboard" },
    { key: "Add Food", icon: "➕", path: "/Layout/AddFood" },
    { key: "Recommendations", icon: "💡", path: "/Layout/Recommendations" },
    { key: "Profile", icon: "👤", path: "/Layout/Profile" },

     ];

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
              className='asideListItem'
              onClick={() => Navigate(s.path)}
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
