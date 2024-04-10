import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://127.0.0.1:8001/api/login', {
                email: email,
                password: password
            });
            
            const token = response.data.access_token;

            // Store the token in a cookie
            Cookies.set("token", token, { expires: 7 });
            
            // Redirect to the homepage after successful login
            navigate("/");
              
        } catch (error) {
            // Handle login errors
            if (error.response && error.response.status === 401) {
                setError('Invalid email or password.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    }

    return (
       <div>
        <div className="login-form">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={handleEmailChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
        </div>
    );
}

export default Login;
