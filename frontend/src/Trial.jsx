import React, { useState, useEffect } from "react";

const AQIPredictions = () => {
  const [selectedCity, setSelectedCity] = useState("Delhi"); // Default city
  const [aqiData, setAqiData] = useState([]); // Ensure it's an array
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

        // Ensure predictions exist and are an array
        if (Array.isArray(data.predictions)) {
          setAqiData(
            data.predictions.map((item) => ({
              day: new Date(item.ds).toLocaleDateString("en-US", {
                weekday: "short", month: "short", day: "numeric",
              }),
              aqi: Math.round(item.yhat), // Round predicted AQI
              category: getAQICategory(item.yhat),
            }))
          );
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError(err.message);
        setAqiData([]); // Reset AQI data on error
      }
      setLoading(false);
    };

    fetchAQIPredictions();
  }, [selectedCity]);

  // Function to determine AQI category
  const getAQICategory = (aqi) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center min-h-screen p-6">
      <div className="container mx-auto">
        {/* City Selector */}
        <div className="flex justify-center mb-6">
          <select
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Display Loading or Error */}
        {loading && <p className="text-center text-blue-500">Loading predictions...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* AQI Forecast */}
        {!loading && !error && aqiData.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
              7-Day AQI Forecast for {selectedCity}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {aqiData.map((item, index) => (
                <div key={index} className="bg-white rounded-lg border p-4 shadow-lg text-center">
                  <h3 className="text-lg font-semibold text-gray-800">{item.day}</h3>
                  <p className="text-xl font-bold text-green-600">{item.aqi} AQI</p>
                  <p
                    className={`text-sm font-medium ${
                      item.category === "Good"
                        ? "text-green-500"
                        : item.category === "Moderate"
                        ? "text-yellow-500"
                        : item.category === "Unhealthy for Sensitive Groups"
                        ? "text-orange-400"
                        : item.category === "Unhealthy"
                        ? "text-orange-600"
                        : item.category === "Very Unhealthy"
                        ? "text-red-500"
                        : "text-purple-600"
                    }`}
                  >
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
