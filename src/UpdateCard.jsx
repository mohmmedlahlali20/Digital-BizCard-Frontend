import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import Cookies from 'js-cookie';
import axios from 'axios'; 

function UpdateCard() {
  const { state } = useLocation();
  const cardData = state ? state.cardData : null;
  const navigate = useNavigate(); // Import useNavigate and use it to get the navigate function

  const [formData, setFormData] = useState({
    company: cardData ? cardData.nom_entreprise : '',
    title: cardData ? cardData.titre : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = Cookies.get('token');
    const { id } = cardData; 
    axios.patch(`http://127.0.0.1:8001/api/cartes/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      navigate('/Cards', response);
    })
    .catch(error => {
      console.error('Error updating card:', error);
    });
  };


  return (
    <div className="update-card-container">
      <h2>Update Card</h2>
      <form onSubmit={handleSubmit}>
       
        <div>
          <label>Company:</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} />
        </div>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
      
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateCard;
