import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { z } from "zod";

const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name should be at least 3 characters")
    .regex(/^[A-Za-z ]+$/, "Name should contain only letters"),

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

  function handleSignup(event) {
    event.preventDefault();

    // Clear old errors
    setError("");
    setNameError("");
    setEmailError("");
    setPasswordError("");

    const result = signupSchema.safeParse({
      name: name,
      email: email,
      password: password,
    });

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === "name") {
          setNameError(issue.message);
        }

        if (issue.path[0] === "email") {
          setEmailError(issue.message);
        }

        if (issue.path[0] === "password") {
          setPasswordError(issue.message);
        }
      });

      return;
    }

    console.log(result.data);

    setLoading(true);

    fetch("http://localhost:3000/createAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
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
        <form className='auth-form' onSubmit={handleSignup}>
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

          {passwordError && <p>{passwordError}</p>}

          <button type='submit' className='primary-btn' disabled={loading}>
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

//
//zod give us issues is an array object of errors if exist.
//Name → empty ,Email → wrong ,Password → too short ,Zod may give you 3 errors.
// result.error.issues[
//   {
//     path: ["name"],
//     message: "Name is required"
//   },
//   {
//     path: ["email"],
//     message: "Invalid email"
//   },
//   {
//     path: ["password"],
//     message: "Password is too short"
//   }
// ]
//
