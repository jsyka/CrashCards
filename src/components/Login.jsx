import { useState, useEffect } from 'react'
import axios from 'axios'
import './Sign_Up.css'

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}> 
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                    id="username"
                    {...register("username", { required: true })}
                    />
                </div>

                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email && (
                    <p className="error">Please enter a valid email address.</p>
                )}
                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    {...register("password", { required: true })}
                />
                <button className={styles.conButton} type="submit" name="button" value="submit">Submit</button>
            </form> 
        </div>
    )
}