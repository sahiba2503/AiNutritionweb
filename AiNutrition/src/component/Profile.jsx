import { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const Navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/usersInfor")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUserName(data.name);
          setUserEmail(data.email);
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

  const user = {
    fullName: userName,
    email: userEmail,
  };

  return (
    <div className='page'>
      <h1 className='page-title'>Profile</h1>
      <p className='page-subtitle'>Manage your personal information.</p>

      <div className='profile-hero'>
        <div className='profile-avatar'>{firstCharName}</div>
        <div>
          <p className='profile-name'></p>
          <p className='profile-tagline'>Healthy choices, brighter future.</p>
        </div>
      </div>

      <div className='section-head'>
        <p className='section-heading'>Personal Information</p>
      </div>
      <div className='info-list'>
        <div className='info-row'>
          <span>Full Name</span>
          <span>{user.fullName}</span>
        </div>
        <div className='info-row'>
          <span>Email</span>
          <span>{user.email}</span>
        </div>
      </div>

      <p className='section-heading'>Account Settings</p>
      <div className='settings-list'>
        <div
          className='settings-row'
          onClick={() => {
            Navigate("/ForgotPassword");
          }}
        >
          🔒 Change Password
        </div>
      </div>
    </div>
  );
}

export default Profile;
