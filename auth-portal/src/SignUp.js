import React from "react";
import Swal from 'sweetalert2';

function SignUpForm() {
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
      const response = await fetch("http://localhost:3000/auth/register", {
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
          text: data.message,
          icon: 'success',
        });
        setState({ username: "", password: "" });
      } else {
        Swal.fire({
          title: 'Error',
          text: data.message,
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
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <span><br></br></span>
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;