import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cards() {
  const navigate = useNavigate();
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
    <div className="container">
    <div className="cards-container">
      <div>
        <Link to="/create_card">
          <button className='btn btn-primary mb-3'>Create</button>
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Company</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cardsData.map((card, index) => (
            <tr key={index}>
              <td>{card.titre}</td>
              <td>{card.nom_entreprise}</td>
              <td>
                <button className="btn btn-info btn-sm me-2" onClick={() => handleUpdate(card)}><i className='fas fa-terminal'></i></button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(card.id)}><i className='fas fa-trash'></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

export default Cards;
