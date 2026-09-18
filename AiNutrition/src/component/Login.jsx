

import {useState} from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function checkEmail() {
    let parts = email.trim().split("@");

    //if the array does not have exactly 2 parts.”
    if (parts.length !== 2) {
      setEmailError("Please enter a valid email");
      return false;
    }

    let username = parts[0];
    let domain = parts[1];

    if (username.length < 3) {
      setEmailError("Email username should be at least 3 characters");
      return false;
    }
    // whether the username contains any special character.
    if (
      username.includes("@") ||
      username.includes("#") ||
      username.includes("$") ||
      username.includes("%") ||
      username.includes("!") ||
      username.includes("&") ||
      username.includes("?") ||
      username.includes("+") ||
      username.includes("-") ||
      username.includes("..") ||
      username.includes("_") ||
      username.includes(":") ||
      username.includes(";") ||
      username.includes("^") ||
      username.includes("/") ||
      username.includes(" ") ||
      username.includes(",") ||
      username.includes("'") ||
      username.includes("(") ||
      username.includes(")") ||
      username.includes("{") ||
      username.includes("}") ||
      username.includes("[") ||
      username.includes(">") ||
      username.includes("<") ||
      username.includes("]") ||
      username.includes("|") ||
      username.includes("`") ||
      username.includes("~")
    ) {
      setEmailError("Email contains invalid character or space");
      return false;
    }
    // if the domain is not gmail.com.
    if (domain !== "gmail.com") {
      setEmailError("Please enter a valid Gmail address");
      return false;
    }

    setEmailError("");
    return true;
  }

  function checkPassword() {
    let userPassword = password.trim();
    if (userPassword.length < 8 || userPassword.length > 12) {
      setPasswordError("user's Password must be 8 to 12 characters");
      return false;
    }

    if (userPassword === userPassword.toLowerCase()) {
      setPasswordError("user's Password must contain one capital letter");
      return false;
    }

    if (userPassword === userPassword.toUpperCase()) {
      setPasswordError("user's Password must contain one small letter");
      return false;
    }
    if (userPassword.includes(" ")) {
      setPasswordError("user's Password should not contain space");
      return false;
    }

    if (
      !(
        userPassword.includes("!") ||
        userPassword.includes("@") ||
        userPassword.includes("#") ||
        userPassword.includes("$") ||
        userPassword.includes("%") ||
        userPassword.includes("^") ||
        userPassword.includes("&") ||
        userPassword.includes("*") ||
        userPassword.includes("(") ||
        userPassword.includes(")") ||
        userPassword.includes(">") ||
        userPassword.includes("+") ||
        userPassword.includes("{") ||
        userPassword.includes("}") ||
        userPassword.includes("[") ||
        userPassword.includes("]") ||
        userPassword.includes("|") ||
        userPassword.includes("'") ||
        userPassword.includes(";") ||
        userPassword.includes(":") ||
        userPassword.includes("/") ||
        userPassword.includes("?") ||
        userPassword.includes(">") ||
        userPassword.includes("<") ||
        userPassword.includes(".") ||
        userPassword.includes("`") ||
        userPassword.includes("~") ||
        userPassword.includes(",")
      )
    ) {
      setPasswordError("userPassword must contain one special character");
      return false;
    }

    if (
      !(
        userPassword.includes("0") ||
        userPassword.includes("1") ||
        userPassword.includes("2") ||
        userPassword.includes("3") ||
        userPassword.includes("4") ||
        userPassword.includes("5") ||
        userPassword.includes("6") ||
        userPassword.includes("7") ||
        userPassword.includes("8") ||
        userPassword.includes("9")
      )
    ) {
      setPasswordError("Password must contain one number");
      return false;
    }

    setPasswordError("");
    return true;
  }

  function handleLogin(event) {
    event.preventDefault();

    if (loading) {
      return;
    }
    //clear error .
    setError("");
    setEmailError("");
    setPasswordError("");

    if (!email.trim() || !password) {
      setError("Please enter email and password.");
      return;
    }
    // checkEmail() check the email format.
    let emailValid = checkEmail();

    if (!emailValid) {
      setEmailError("please enter correct email.");
      return;
    }
    // checkPassword() checks password is valid.
    let passwordValid = checkPassword();

    if (!passwordValid) {
      setPasswordError("please enter correct password");
      return;
    }
    //if email and password are valid,
       setLoading(true);
    //send the post request ,
    fetch("http://localhost:3000/loginAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          navigate("/Layout/Dashboard");
        } else {
          setPasswordError(data.message);
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Server error. Please try again.");
        alert(" Something wrong please try again");
      })
      .finally(() => {
        setLoading(false);
        setError("");
        setEmailError("");
        setPasswordError("");
      });
  }



  return (
    <div className="auth-wrapper">
      <div className="auth-brand-panel">
        <div className="auth-logo">🌿</div>
        <p className="auth-brand-title">NutriTrack</p>
        <p className="auth-brand-text">Understand what's really in your food, one meal at a time.</p>
      </div>

      <div className="auth-form-panel">
        <form className="auth-form" >
          <p className="auth-heading">Welcome back</p>
          <p className="auth-subheading">Log in to continue tracking your nutrition.</p>

          <label className="input-label">Email</label>
          <input type="email" placeholder="you@example.com" value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loading} />
               {emailError ? emailError : ""}
          <label className="input-label">Password</label>
          <input type="password" placeholder="••••••••"  value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={loading} />
            <p> {passwordError ? passwordError : ""}</p>
          <div className="auth-row-between">
            {/* <label className="checkbox-label"><input type="checkbox" /> Remember me</label> */}
            
          </div>        

          <button  className="primary-btn"  disabled={loading}
            onClick={handleLogin}>
           {loading ? "Logging in..." : "Login"}
          </button>
             {error ? error : ""}
          <p className="auth-footer-text">
            Don't have an account?{" "}
            <p
              className='signuplink'
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </p>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;