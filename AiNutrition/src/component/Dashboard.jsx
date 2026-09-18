

import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import {useState,useEffect} from "react";

function Dashboard() {
 const Navigate = useNavigate();

 
   const [userName, setUserName] = useState("");
   
 
   useEffect(() => {
     fetch("http://localhost:3000/usersInfor")
       .then((response) => response.json())
       .then((data) => {
         if (data.success) {
           setUserName(data.name);
                   } else {
           Navigate("/");
         }
       })
       .catch((error) => {
         console.log(error);
         Navigate("/");
       });
   }, [Navigate]);
 
   const firstCharName = userName.charAt(0);
 
    return (
    <div className="page">
      <div className="page-topbar">
        <span className="bell-icon" onClick={()=>Navigate("/Logout")}> logout</span>
        <div className="avatar-chip">
          <span className="avatar-circle">{firstCharName}</span>
          <span></span>
        </div>
      </div>

      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Hello, ....! 👋 Track your food, stay healthy and make better choices.</p>

      <div className="hero-card">
        <div>
          <p className="hero-heading">🌿 Your Nutrition Journey</p>
          <p className="hero-text">
            You can add your food, get nutrition details, find healthy
            recommendations and build better eating habits. Small steps make
            big changes!
          </p>
        </div>
        <button onClick={()=>Navigate("/Layout/AddFood")} className="hero-btn">+ Go to Add Food →</button>
      </div>

      <h2 className="section-heading">Quick Overview</h2>
      <div className="stat-grid">
        <div className="stat-card">
          <p className="stat-icon">🍽️</p>
          <p className="stat-label">Today's Meals</p>
          <p className="stat-value">0</p>
          <p className="stat-sub">foods added</p>
        </div>
        <div className="stat-card">
          <p className="stat-icon">🔥</p>
          <p className="stat-label">Calories</p>
          <p className="stat-value">0 kcal</p>
          <p className="stat-sub">total today</p>
        </div>
        <div className="stat-card">
          <p className="stat-icon">💧</p>
          <p className="stat-label">Water Intake</p>
          <p className="stat-value">0 ml</p>
          <p className="stat-sub">stay hydrated</p>
        </div>
        <div className="stat-card">
          <p className="stat-icon">🌿</p>
          <p className="stat-label">Nutrition Goal</p>
          <p className="stat-value">Stay on track</p>
          <p className="stat-sub">for a healthier you</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;