import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [cardsData, setCardsData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8001/api/cartes', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCardsData(response.data.carts);
            } catch (error) {
                console.error('Error fetching cards:', error);
                setError('Error fetching cards. Please try again later.');
            }
        };

        fetchCards();
    }, []);

    if (error) {
        return <div className="container"><p>{error}</p></div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                {cardsData.map((carte, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                        <div className="card">
                            <img src="/src/assets/img/cr7.jpg" className="card-img-top" alt="Card Image" /> 
                            <div className="card-body">
                                <h5 className="card-title">{carte.titre}</h5>
                                <p className="card-text">Company: {carte.nom_entreprise}</p>
                                <p className="card-text">Created by: {carte.creatorName}</p> 
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
