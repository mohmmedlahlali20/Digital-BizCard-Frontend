import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cards() {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8001/api/cartes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Response data:', response.data);
        
        if (Array.isArray(response.data.carts)) {
          setCardsData(response.data.carts);
        } else {
          console.error('Invalid data format: ', response.data);
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
  
    fetchCards();
  }, []);

  const handleUpdate = (card) => {
    navigate('/update_card', { state: { cardData: card } });
  };

  const handleDelete = async (cardId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8001/api/cartes/${cardId}`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      setCardsData(cardsData.filter(card => card.id !== cardId));
      console.log('Card deleted successfully');
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div className="cards-container">
      <div>
        <Link to="/create_card">
          <button className='btn'>Create</button>
        </Link>
      </div>
      <table className="cards-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cardsData.map((card, index) => (
            <tr key={index}>
              <td>{card.titre}</td>
              <td>{card.nom_entreprise}</td>
              <td>
                <button onClick={() => handleUpdate(card)}>Update</button>
                <button onClick={() => handleDelete(card.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default Cards;
