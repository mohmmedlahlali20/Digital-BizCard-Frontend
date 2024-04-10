import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function AddCardForm() {
    const navigate = useNavigate();
    const [company, setCompany] = useState('');
    const [title, setTitle] = useState('');
    // Define other state variables for email and phone if needed
  
    const handleCompanyChange = (event) => {
      setCompany(event.target.value);
    }
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const token = localStorage.getItem('token');
      console.log(token);
  
      try {
        if (!token) {
          throw new Error('No token found');
        }
  
        const response = await axios.post('http://127.0.0.1:8001/api/cartes', {
          nom_entreprise: company, // Use company instead of nom_entreprise
          titre: title, // Use title instead of titre
          // Add other fields like email and phone if needed
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        console.log('Card added successfully!');
        console.log(response.data);
  
        navigate("/cards");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized: Please check your authentication credentials');
        } else {
          console.error('Error:', error.message);
        }
      }
    }
  
    return (
      <div>
        <h2>Add New Card</h2>
        <form onSubmit={handleSubmit} className='login-form'>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={company}
              onChange={handleCompanyChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          {/* Add other input fields for email and phone if needed */}
          <button type="submit">Add Card</button>
        </form>
      </div>
    );
  }
  

  
export default AddCardForm;
