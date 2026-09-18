import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function checkName() {
    let userName = name.trim();

    if (userName.length < 3) {
      setNameError("Name should be at least 3 characters");
      return false;
    }

    if (
      userName.includes("0") ||
      userName.includes("1") ||
      userName.includes("2") ||
      userName.includes("3") ||
      userName.includes("4") ||
      userName.includes("5") ||
      userName.includes("6") ||
      userName.includes("7") ||
      userName.includes("8") ||
      userName.includes("9")
    ) {
      setNameError("Name should not contain numbers");
      return false;
    }

    if (
      userName.includes("@") ||
      userName.includes("#") ||
      userName.includes("$") ||
      userName.includes("%") ||
      userName.includes("!") ||
      userName.includes("&") ||
      userName.includes("?") ||
      userName.includes("+") ||
      userName.includes("-") ||
      userName.includes("  ") ||
      userName.includes("^") ||
      userName.includes("/") ||
      userName.includes(":") ||
      userName.includes(";") ||
      userName.includes(".") ||
      userName.includes(",") ||
      userName.includes("'") ||
      userName.includes(">") ||
      userName.includes("<") ||
      userName.includes("(") ||
      userName.includes(")") ||
      userName.includes("{") ||
      userName.includes("}") ||
      userName.includes("[") ||
      userName.includes("]") ||
      userName.includes("|") ||
      userName.includes("`") ||
      userName.includes("~")
    ) {
      setNameError("Name should not contain special characters or space");
      return false;
    }

    setNameError("");
    return true;
  }

  function checkEmail() {
    let parts = email.trim().split("@");

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
      setEmailError("Email contains invalid character or extra space");
      return false;
    }

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
      setPasswordError("Password must be 8 to 12 characters");
      return false;
    }

    if (userPassword === userPassword.toLowerCase()) {
      setPasswordError("Password must contain one capital letter");

      return false;
    }

    if (userPassword === userPassword.toUpperCase()) {
      setPasswordError("Password must contain one small letter");
      return false;
    }
    if (userPassword.includes(" ")) {
      setPasswordError("Password should not  contain space");
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
      setPasswordError("Password must contain one special character");
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

  function handleSignup(event) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");
    setNameError("");
    setEmailError("");
    setPasswordError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill all fields");
      return;
    }

    let nameValid = checkName();

    if (!nameValid) {
      return;
    }

    let emailValid = checkEmail();

    if (!emailValid) {
      return;
    }

    let passwordValid = checkPassword();

    if (!passwordValid) {
      return;
    }

    setLoading(true);

    fetch("http://localhost:3000/createAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Your account is created");

          setName("");
          setEmail("");
          setPassword("");

          navigate("/");
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Server error. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className='auth-wrapper'>
      <div className='auth-brand-panel'>
        <div className='auth-logo'>🌿</div>
        <p className='auth-brand-title'>NutriTrack</p>
        <p className='auth-brand-text'>
          Join thousands making smarter food choices every day.
        </p>
      </div>

      <div className='auth-form-panel'>
        <form className='auth-form'>
          <p className='auth-heading'>Create your account</p>
          <p className='auth-subheading'>
            Start your journey to better eating habits.
          </p>

          <label className='input-label'>Full Name</label>
          <input
            type='text'
            placeholder='Your full name'
           value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={loading}
          />
            {nameError && <p>{nameError}</p>}
          <label className='input-label'>Email Address</label>
          <input
            type='email'
            placeholder='you@example.com'
            value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loading}
          />
          {emailError && <p>{emailError}</p>}

          <label className='input-label'>Password</label>
          <input
            type='password'
            placeholder='Create a password'
            value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={loading}
          />

          {/* <label className='input-label'>Confirm Password</label>
          <input
            type='password'
            placeholder='Re-enter password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={loading}
          /> */}
          {passwordError && <p>{passwordError}</p>}

          <button type='submit' className='primary-btn' disabled={loading} onClick={handleSignup}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
          {error && <p>{error}</p>}
          <p className='auth-footer-text'>Already have an account?</p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
