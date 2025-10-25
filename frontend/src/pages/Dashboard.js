// import { useState } from "react";
// import AQIPredictions from './Trial';
// import MyProfile from './MyProfile'; // ✅ import MyProfile
// import './Dashboard.css';
// import './ProfileSlide.css'; // ✅ new CSS file for animation

// const Dashboard = () => {
//   const [showProfile, setShowProfile] = useState(false); // ✅ toggle state

//   return (
//     <>
//       <nav className="navbar">
//         <div className="navbar-logo">AQI Insight</div>
//         <ul className="navbar-links">
//           <li><a href="#about">About</a></li>
//           <li><a href="#predictions">AQI Predictions</a></li>
//           <li><a href="#measures">Suggestions</a></li>
//           <li><button className="profile-link" onClick={() => setShowProfile(true)}>My Profile</button></li> {/* ✅ button to toggle */}
//         </ul>
//       </nav>

//       <section id="about" className="section">
//         <h2>About</h2>
//         <p>This app provides a 7-day AQI forecast for various cities across India using advanced ML models. Stay informed and take action to breathe cleaner air.</p>
//       </section>

//       <section id="predictions" className="section">
//         <h2 className="section-heading">AQI Predictions</h2>
//         <AQIPredictions />
//       </section>

//       <section id="measures" className="section">
//         <h2>Suggestions / Preventive Measures</h2>
//         <ul>
//           <li>✅ Stay indoors when AQI is very unhealthy.</li>
//           <li>😷 Use certified air masks outdoors.</li>
//           <li>🧹 Use air purifiers at home or work.</li>
//           <li>🌳 Support tree plantation drives.</li>
//         </ul>
//       </section>

//       {/* ✅ Slide-in Profile panel */}
//       <div className={`slide-profile ${showProfile ? 'visible' : ''}`}>
//         <button className="close-btn" onClick={() => setShowProfile(false)}>×</button>
//         <MyProfile />
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import { useState } from "react";
import AQIPredictions from './Trial';
import MyProfile from './MyProfile';
import './Dashboard.css';
import './ProfileSlide.css';

const Dashboard = () => {
  const [showProfile, setShowProfile] = useState(false);

  // Helper function for the close button, also used for overlay if needed
  const closeProfile = () => setShowProfile(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">AQI Insight</div>
        <ul className="navbar-links">
          <li><a href="#about">About</a></li>
          <li><a href="#predictions">AQI Predictions</a></li>
          <li><a href="#measures">Suggestions</a></li>
          <li>
            <button
              className="profile-link"
              onClick={() => setShowProfile(true)} // Concise state update
            >
              My Profile
            </button>
          </li>
        </ul>
      </nav>

      <section id="about" className="section">
        <h2>About</h2>
        <p>This app provides a 7-day AQI forecast for various cities across India using advanced ML models. Stay informed and take action to breathe cleaner air.</p>
      </section>

      <section id="predictions" className="section">
        <h2 className="section-heading">AQI Predictions</h2>
        <AQIPredictions />
      </section>

      <section id="measures" className="section">
        <h2>Suggestions / Preventive Measures</h2>
        <ul>
          <li>Stay indoors when AQI is very unhealthy.</li>
          <li>Use certified air masks outdoors.</li>
          <li>Use air purifiers at home or work.</li>
          <li>Support tree plantation drives.</li>
        </ul>
      </section>

      {/* Profile Slide-in Panel */}
      <div className={`slide-profile ${showProfile ? 'visible' : ''}`}>
        <button className="close-btn" onClick={closeProfile}>×</button>
        <MyProfile />
      </div>

      {/* Optional: Add an overlay for better UX */}
      {showProfile && <div className="profile-overlay" onClick={closeProfile} />}
    </>
  );
};

export default Dashboard;