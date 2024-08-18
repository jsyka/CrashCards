import { useState, useEffect } from 'react'
import axios from 'axios'
import './Sign_Up.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); // Initialize useNavigate

    const getData = async (data) => {
        try {
            const response = await axios.get("/api/user/", {
                username: data.username,
                password: data.password,
            });

            if (response.data) { // Adjust based on your backend response
                navigate('/home'); // Redirect to home page on successful login
            } else {
                console.error('Invalid credentials');
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit(getData)}> 
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                    id="username"
                    {...register("username", { required: true })}
                    />
                </div>

                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    {...register("password", { required: true })}
                />
                <button type="submit" name="button" value="submit">Submit</button>
            </form> 
        </div>
    )
}