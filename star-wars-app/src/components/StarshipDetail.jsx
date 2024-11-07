import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../css/StarshipDetail.css";

const StarshipDetail = () => {
  const { id } = useParams();
  const [starship, setStarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStarshipDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://swapi.dev/api/starships/${id}/`
        );
        setStarship(response.data);
      } catch (error) {
        console.error("Error fetching starship details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStarshipDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!starship) return <p>Starship not found</p>;

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="starship-details">
        <h2>{starship.name}</h2>
        <img
          src="/star-wars.jpg" // Yıldız gemisi görselini buraya ekliyoruz
          alt={starship.name}
        />
        <p>
          <strong>Model:</strong> {starship.model}
        </p>
        <p>
          <strong>Hyperdrive Rating:</strong> {starship.hyperdrive_rating}
        </p>
        <p>
          <strong>Passengers:</strong> {starship.passengers}
        </p>
        <p>
          <strong>Max Atmosphering Speed:</strong>{" "}
          {starship.max_atmosphering_speed || "N/A"}
        </p>
        <p>
          <strong>Manufacturer:</strong> {starship.manufacturer}
        </p>
        <p>
          <strong>Crew:</strong> {starship.crew}
        </p>
        <p>
          <strong>Cargo Capacity:</strong> {starship.cargo_capacity}
        </p>
      </div>
    </div>
  );
};

export default StarshipDetail;
