import { registerUser } from "../services/authServices";
import { useGlobalState } from "../config/store";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSleigh } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles/pages/loginRegister.scss";

const SignUp = ({ history }) => {
  const initialFormState = {
    username: "",
    email: "",
    password: "",
  };

  const [userDetails, setUserDetails] = useState(initialFormState);
  const { dispatch } = useGlobalState();

  const detailsChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const signUpSubmit = (event) => {
    event.preventDefault();

    console.log(userDetails);

    registerUser(userDetails)
      .then((data) => {
        dispatch({
          type: "setLoggedInUser",
          data: data._id,
        });
        history.push("/");
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
      });
  };

  return (
    <div>
      <div className="loginBorder d-flex align-items-center flex-column justify-content-center">
        <div className="d-flex flex-column align-items-center">
          <FontAwesomeIcon className="loginLogo my-4" icon={faSleigh} />
          <p className="m-0 loginLogoText">North Pole Post</p>
        </div>

        <form
          className="signup login d-flex flex-column align-items-center"
          onSubmit={signUpSubmit}
        >
          <label>Username</label>
          <input
            className="username mb-2"
            required
            type="text"
            name="username"
            placeholder="Enter a username"
            onChange={detailsChange}
          ></input>

          <label>Email</label>
          <input
            className="email mb-2"
            required
            type="Email"
            name="email"
            placeholder="Enter your Email"
            onChange={detailsChange}
          ></input>

          <label>Password</label>
          <input
            className="password mb-2"
            required
            type="password"
            name="password"
            placeholder="Enter a password"
            onChange={detailsChange}
          ></input>
          <input
            className="christmasInputButton m-2"
            type="submit"
            value="Sign Up"
          ></input>
        </form>
      </div>
      <p className="m-2">
        Dont have an account?{" "}
        <Link to="/login">
          <u>Login</u>
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
