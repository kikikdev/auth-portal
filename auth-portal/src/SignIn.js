import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function SignInForm({ onSignIn }) {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({ ...state, [evt.target.name]: value });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { username, password } = state;

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Success',
          text: 'Login successful',
          icon: 'success',
        });
        onSignIn(username, data.data.uid);
        navigate("/home");
        setState({ username: "", password: "" });
      } else {
        Swal.fire({
          title: 'Error',
          text: data.message || 'Login failed. Please try again.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred. Please try again later.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <span><br></br></span>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={state.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;