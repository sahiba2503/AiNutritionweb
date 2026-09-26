import { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .refine(
      (value) => value.endsWith("@gmail.com"),
      "Please enter a valid Gmail address",
    ),

  password: z
    .string()
    .min(8, "Password must be 8 to 12 characters")
    .max(12, "Password must be 8 to 12 characters")
    .regex(/[A-Z]/, "Password must contain one capital letter")
    .regex(/[a-z]/, "Password must contain one small letter")
    .regex(/[0-9]/, "Password must contain one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain one special character")
    .regex(/^\S+$/, "Password should not contain space"),
});

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  
  function handleLogin(event) {
    event.preventDefault();

    if (loading) {
      return;
    }
    //clear error .
    setError("");
    setEmailError("");
    setPasswordError("");

    
    const result =loginSchema .safeParse({
      email: email,
      password: password,
    });

    if(!result.success){
       result.error.issues.forEach((issue) => {
          if (issue.path[0] === "email") {
          setEmailError(issue.message);
        }

        if (issue.path[0] === "password") {
          setPasswordError(issue.message);
        }
      });

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
      });
  }

  return (
    <div className='auth-wrapper'>
      <div className='auth-brand-panel'>
        <div className='auth-logo'>🌿</div>
        <p className='auth-brand-title'>NutriTrack</p>
        <p className='auth-brand-text'>
          Understand what's really in your food, one meal at a time.
        </p>
      </div>

      <div className='auth-form-panel'>
        <form className='auth-form'>
          <p className='auth-heading'>Welcome back</p>
          <p className='auth-subheading'>
            Log in to continue tracking your nutrition.
          </p>

          <label className='input-label'>Email</label>
          <input
            type='email'
            placeholder='you@example.com'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={loading}
          />

          {emailError ? emailError : ""}

          <label className='input-label'>Password</label>
          <input
            type='password'
            placeholder='••••••••'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={loading}
          />
          <p> {passwordError ? passwordError : ""}</p>
          <div className='auth-row-between'>
            {/* <label className="checkbox-label"><input type="checkbox" /> Remember me</label> */}
          </div>

          <button
            className='primary-btn'
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error ? error : ""}
          <p
            onClick={() => {
              navigate("/ForgotPassword");
            }}
          >
            Forget password
          </p>
          <p className='auth-footer-text'>
            Don't have an account?{" "}
            <p
              className='signuplink'
              onClick={() => {
                navigate("/Signup");
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
//
//  result={
//   success: false,
//   error: ZodError: [
//     {code: "invalid_format",format: "email", path: ["email"],message: "Invalid email address" },
//     {code: "too_small",minimum: 6,path: ["password"],message: "Password must be at least 6 characters"}
//   ]
// }
//issues = [ {code: "invalid_format",format: "email", path: ["email"],message: "Invalid email address" },
//     {code: "too_small",minimum: 6,path: ["password"],message: "Password must be at least 6 characters"}
//   ]