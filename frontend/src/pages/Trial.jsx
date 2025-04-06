import React, { useState, useEffect } from "react";
import "./AQIPredictions.css"; // Import the custom CSS file

const AQIPredictions = () => {
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [aqiData, setAqiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cities = ['Delhi', 'Ahmedabad', 'Lucknow', 'Bengaluru', 'Chennai',
    'Hyderabad', 'Patna', 'Gurugram', 'Visakhapatnam', 'Amritsar',
    'Jorapokhar', 'Jaipur', 'Thiruvananthapuram', 'Amaravati',
    'Brajrajnagar', 'Talcher', 'Kolkata', 'Mumbai', 'Guwahati',
    'Coimbatore', 'Shillong', 'Chandigarh', 'Bhopal', 'Kochi',
    'Ernakulam', 'Aizawl'];

  useEffect(() => {
    const fetchAQIPredictions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://127.0.0.1:8000/predict?city=${selectedCity}`);
        if (!response.ok) throw new Error("Failed to fetch AQI data");

        const data = await response.json();

        if (Array.isArray(data.predictions)) {
          setAqiData(
            data.predictions.map((item) => ({
              day: new Date(item.ds).toLocaleDateString("en-US", {
                weekday: "short", month: "short", day: "numeric",
              }),
              aqi: Math.round(item.yhat),
              category: getAQICategory(item.yhat),
            }))
          );
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError(err.message);
        setAqiData([]);
      }
      setLoading(false);
    };

    fetchAQIPredictions();
  }, [selectedCity]);

  const getAQICategory = (aqi) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  return (
    <div className="aqi-wrapper">
      <div className="aqi-container">
        <div className="city-selector">
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {loading && <p className="info-text">Loading predictions...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && aqiData.length > 0 && (
          <>
            <h2 className="forecast-title">7-Day AQI Forecast for {selectedCity}</h2>
            <div className="aqi-grid">
              {aqiData.map((item, index) => (
                <div key={index} className="aqi-card">
                  <h3 className="aqi-day">{item.day}</h3>
                  <p className="aqi-value">{item.aqi} AQI</p>
                  <p className={`aqi-category ${item.category.replaceAll(" ", "-")}`}>
                    {item.category}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AQIPredictions;
