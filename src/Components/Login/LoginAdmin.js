import React, { useState } from 'react';
import axios from 'axios';
import './LoginAdmin.css';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        setError(''); // Reset any previous errors

        // Basic validation
        if (!adminId || !password) {
            setError('Please enter both Admin ID and Password.');
            return;
        }

        try {
            // Replace 'YOUR_BACKEND_API_ENDPOINT' with your actual backend URL
            const response = await axios.post('', {
                adminId,
                password
            });

            // Assuming the backend returns a success status and possibly a token
            if (response.data.success) {
                // Handle successful login (e.g., save token, redirect)
                // Example: localStorage.setItem('token', response.data.token);
                navigate('/adminpage'); // Redirect to admin dashboard or another page
            } else {
                setError('Invalid Admin ID or Password.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while logging in. Please try again.');
        }
    };

    return (
        <div className='loginAdminpage-box'>
            <div className='loginAdminpage-blue-box'>
                <div className='loginAdminpage-logo'></div>
                <h2 className='loginAdminpage-seamsh2'>SEAMS</h2>
                <h4 className='loginAdminpage-welcomeh4'>
                    Welcome to Students Engagement <br />
                    and Activity Management System
                </h4>
                <div className='loginAdminpage-lionlogo'></div>
            </div>
            <div className='loginAdminpage-white-box'>
                <div className='loginAdminpage-lccblogo'></div>
                <h2 className='loginAdminpage-loginh2'>Let’s get started.</h2>
                <h4 className='loginAdminpage-loginh4'>Please enter credentials to proceed</h4>

                <form className="loginAdminpage-container" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="adminId"
                        className="loginAdminpage-input-id"
                        placeholder="Enter Admin ID"
                        value={adminId}
                        onChange={(e) => setAdminId(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        className="loginAdminpage-input-password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="loginAdminpage-button-1">Login</button>
                    <div className='forgot-create-box'>
                        <button type="button" className="loginAdminpage-forgot-btn">Forgot password</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginAdmin;
