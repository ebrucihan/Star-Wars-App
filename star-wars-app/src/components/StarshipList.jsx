import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/StarshipList.css";

const StarshipList = () => {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStarships();
  }, [searchQuery]);

  const fetchStarships = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://swapi.dev/api/starships/?search=${searchQuery}`
      );
      setStarships(response.data.results);
    } catch (error) {
      console.error("Error fetching starships:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">STAR WARS</div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Name / Model"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={fetchStarships}>Filter</button>
      </div>
      <div className="starship-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          starships.map((ship) => {
            const starshipId = ship.url.split("/").slice(-2, -1)[0]; // ID'yi URL'den çıkarıyoruz
            return (
              <div
                key={starshipId}
                className="starship-card"
                onClick={() => navigate(`/starships/${starshipId}`)}
              >
                <img
                  src="/star-wars.jpg"
                  alt={ship.name}
                  className="starship-image"
                />
                <h3>{ship.name}</h3>
                <p>Model: {ship.model}</p>
                <p>Hyperdrive Rating: {ship.hyperdrive_rating}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default StarshipList;
