import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { forgetSchema } from "../dataSchemas/schema";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleUpdate(event) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");
    setEmailError("");
    setPasswordError("");

    const result = forgetSchema.safeParse({
      email: email,
      password: password,
    });
    if (!result.success) {
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

    setLoading(true);

    fetch("http://localhost:3000/changePassword", {
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
          setEmail("");
          setPassword("");
          navigate("/");
        } else {
          setError(data.message || "Please enter correct email");
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
    <div className='centered-wrapper'>
      <div className='small-card'>
        <div className='small-card-icon'>🔑</div>
        <p className='auth-heading'>Forgot password?</p>
        <p className='auth-subheading'>
          No worries, we'll send reset instructions to your email.
        </p>

        <form onSubmit={handleUpdate}>
          <label className='input-label'>Email</label>
          <input
            type='email'
            placeholder='you@example.com'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={loading}
          />

          {emailError && <p>{emailError}</p>}

          <input
            type='password'
            placeholder='Enter your new password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={loading}
          />
          {passwordError && <p>{passwordError}</p>}
          <button type='submit' className='primary-btn' disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          {error && <p>{error}</p>}
        </form>

        <p onClick={() => navigate("/")} className='link-text back-link'>
          ← Back to log in
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
