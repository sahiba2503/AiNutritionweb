

import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Login from "./component/Login";
import Signup from "./component/Signup";
import ForgotPassword from "./component/ForgotPassword";
import Dashboard from "./component/Dashboard";
import AddFood from "./component/AddFood";
import Recommendations from "./component/Recommendations";
import Profile from "./component/Profile";
import Logout from "./component/Logout";

import "./App.css";

function App() {
  return (
    <div className='appContainer'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path='/Logout' element={<Logout />} />
        <Route path='/Layout' element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path='/Layout/Dashboard' element={<Dashboard />} />
          <Route path='/Layout/AddFood' element={<AddFood />} />
          <Route path='/Layout/Recommendations' element={<Recommendations />} />
          <Route path='/Layout/Profile' element={<Profile />} />
          <Route path='/Layout/Logout' element={<Logout/>} />
          </Route>
      </Routes>
    </div>
  );
}
export default App;
