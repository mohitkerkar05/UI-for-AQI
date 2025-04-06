// import React, { useEffect, useState } from 'react';
// import './Suggestions.css';
// import { useUser } from "../context/UserContext";

// const Suggestions = () => {
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { user } = useUser();

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await fetch(
//             `${process.env.REACT_APP_API_URL}/suggestions/${user.mobile}?city=${user.city}`
//           );
          
//         if (!res.ok) throw new Error("Failed to fetch suggestions.");
//         const data = await res.json();
//         setSuggestions(data.suggestions || []);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load personalized suggestions.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.mobile) {
//       fetchSuggestions();
//     } else {
//       setError("User not logged in.");
//       setLoading(false);
//     }
//   }, [user?.mobile]);

//   if (loading) return <p>Loading personalized suggestions...</p>;
//   if (error) return <p className="error">{error}</p>;

//   return (
//     <div className="suggestions-container">
//       {suggestions.length > 0 ? (
//         <ul className="suggestions-list">
//           {suggestions.map((item, index) => (
//             <li key={index}>
//               <strong>Day {item.day}</strong> (AQI: {item.AQI}) - <b>{item.suggestion}</b>
//               <ul>
//                 {item.preventive_measures.map((tip, i) => (
//                   <li key={i}>🛡️ {tip}</li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No personalized suggestions available yet.</p>
//       )}
//     </div>
//   );
// };

// export default Suggestions;
