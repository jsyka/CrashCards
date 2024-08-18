import { useForm } from "react-hook-form";
import axios from "axios";
import "./Sign_Up.css";
import { useState } from "react";

export default function Sign_Up() {
    const [signUpSuccess, setSignUpSuccess]=useState('false');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = () =>{
    setSignUpSuccess(!signUpSuccess);
  }

  const onSubmit = (data) => {
    

    axios
      .post("/api/user/", data)
      .then((response) => {
        console.log("Form submitted successfully", response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="sign-up">
      <div className="sign-up-card">
        <div className="sign-up-content">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <div className="info-prompts"> */}
            <div className="input">
              {/* <label htmlFor="username">Username: </label> */}
              <input
              placeholder="Enter a Username"
                id="username"
                {...register("username", { required: true })}
              />
            </div>
            <div className="input">
              {/* <label htmlFor="email">Email: </label> */}
              <input
              placeholder="Enter your Email"
                type="email"
                id="email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && (
                <p className="error">Please enter a valid email address.</p>
              )}
            </div>
            <div className="input">
              {/* <label htmlFor="password">Password: </label> */}
              <input
              placeholder="Enter a Password"
                id="password"
                {...register("password", { required: true })}
              />
            </div>
            <button onClick={handleSignUp} type="submit" name="button" value="submit">
                {signUpSuccess ? 'Submit':'Success!'}
            </button>
          </form>
        </div>
        {/* {signUpSuccess ? '' : <div><h1>Success</h1></div> } */}
      </div>
    </div>
  );
}
