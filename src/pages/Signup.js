import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  console.log(user);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signUp(email, password);
      setIsSignupSuccessful(true);
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      setIsSignupSuccessful(false);
      setErrorMessage("Registration failed!");
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-screen object-cover"
          src="/images/signup.jpg"
          alt="signImage"
        />
        <div className="bg-black/60 absolute fixed-top top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] bg-black/75 mx-auto text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-4xl font-bold">Sign Up</h1>
              <form onSubmit={handleSubmit} className="mt-6">
                <input
                  onChange={handleEmail}
                  value={email}
                  type="email"
                  placeholder="Email"
                  className="w-full  rounded bg-gray-700 p-2 my-2"
                />
                <input
                  value={password}
                  onChange={handlePassword}
                  type="password"
                  placeholder="Password"
                  className="w-full rounded bg-gray-700 p-2 my-2"
                />
                <button className="w-full font-bold bg-red-600 p-2 rounded my-4">
                  Sign Up
                </button>
                <div className="flex justify-between text-gray-300">
                  <p>
                    <input type="checkbox" /> Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8 text-gray-300">
                  Already subscribed to Netflix?{" "}
                  <span className="text-white font-bold">
                    <Link to="/login">Sign In</Link>
                  </span>
                </p>
                <p>{isSignupSuccessful && "Registration is successful!"}</p>
                <p className="text-red-500 font-bold text-2xl">
                  {errorMessage &&
                    "Email already exist! Please try another one."}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
