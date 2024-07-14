import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrordMessage, setPasswordErrorMessage] = useState("");
  const [authErrordMessage, setAuthErrorMessage] = useState("");
  const [debouncedEmailValue, setDebouncedEmailValue] = useState("");
  const [debouncedPasswordValue, setDebouncedPasswordValue] = useState("");

  console.log(user, debouncedEmailValue, debouncedPasswordValue);

  const handleEmail = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signUp(email, password);
      setIsSignupSuccessful(true);
      setEmail("");
      setPassword("");
      setAuthErrorMessage("");
    } catch (error) {
      setIsSignupSuccessful(false);
      setAuthErrorMessage("Email already exist! Please try another one.");
      setEmail("");
      setPassword("");
      console.log(error.message);
    }
  };

  useEffect(() => {
    const delayEmailTimeoutId = setTimeout(() => {
      if (email) {
        setDebouncedEmailValue(email);
        if (email.includes("@") && email.includes(".")) {
          setEmailErrorMessage("");
        } else {
          setEmailErrorMessage("Please enter a valid email address!");
        }
      }
    }, 1000);
    return () => clearTimeout(delayEmailTimeoutId);
  }, [email]);

  useEffect(() => {
    const delayPasswordTimeoutId = setTimeout(() => {
      if (password) {
        setDebouncedPasswordValue(password);
        if (
          password.length >= 8 &&
          /[A-Z]/.test(password) &&
          /[a-z]/.test(password) &&
          /[0-9]/.test(password)
        ) {
          setPasswordErrorMessage("");
        } else {
          setPasswordErrorMessage(
            "Password must contain at least 8 characters and include uppercase, lowercase, and a number!"
          );
        }
      }
    }, 1000);
    return () => clearTimeout(delayPasswordTimeoutId);
  }, [password]);

  return (
    <>
      <div className="w-full h-screen relative">
        <img
          className="hidden sm:block absolute w-full h-screen object-cover"
          src="/images/signup.jpg"
          alt="signImage"
        />
        <div className="bg-black/60 absolute fixed-top top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-30">
          <div className="max-w-[450px] h-[600px] bg-black/75 mx-auto text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-4xl font-bold">Sign Up</h1>
              <form onSubmit={handleSubmit} className="mt-6">
                <input
                  onChange={handleEmail}
                  value={email}
                  type="email"
                  placeholder="Email"
                  className={`w-full rounded bg-gray-700 p-2 my-2 ${
                    emailErrorMessage && "border-red-500 border-2"
                  }`}
                />
                {emailErrorMessage && (
                  <p className="text-sm text-red-600 font-bold">
                    Please enter a valid email address!
                  </p>
                )}
                <input
                  value={password}
                  onChange={handlePassword}
                  type="password"
                  placeholder="Password"
                  className={`w-full rounded bg-gray-700 p-2 my-2  ${
                    passwordErrordMessage && "border-red-500 border-2"
                  }`}
                />
                {passwordErrordMessage && (
                  <p className="text-sm text-red-600 font-bold">
                    A minimum 8 characters password contains a combination of{" "}
                    uppercase and lowercase letter and number
                  </p>
                )}
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
                <p className="text-2xl text-green-400 font-bold">
                  {isSignupSuccessful && "Registration is successful!"}
                </p>
                <p className="text-red-500 font-bold text-2xl">
                  {authErrordMessage &&
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
