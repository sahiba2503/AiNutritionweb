import "./Auth.css";
import { useNavigate } from "react-router-dom";
function Logout() {
  const Navigate = useNavigate();

  return (
    <div className='centered-wrapper'>
      <div className='small-card logout-card'>
        <div className='small-card-icon logout-icon'>🚪</div>
        <p className='auth-heading'>Log out of NutriTrack?</p>
        <p className='auth-subheading'>
          You'll need to log in again to access your dashboard and meal history.
        </p>
        <div className='logout-btn-row'>
          <button
            className='secondary-btn'
            onClick={() => Navigate("/Layout/Dashboard")}
          >
            Cancel
          </button>
          <button className='danger-btn' onClick={() => Navigate("/")}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
