import React, { useEffect, useState } from 'react';

export default function AQILanding() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      color: '#1f2d3d',
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f7fa 0%, #d0f0e0 100%)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 50px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        background: 'rgba(255,255,255,0.95)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #2dc997 0%, #00bcd4 100%)',
            marginRight: '15px'
          }}></div>
          <h2 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2dc997, #00acc1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>AQI Insight</h2>
        </div>
        <nav style={{
          display: 'flex',
          gap: '30px',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          transitionDelay: '0.2s'
        }}>
          <a href="#" style={{ textDecoration: 'none', color: '#00bcd4', fontWeight: 'bold' }}>Home</a>
          <a href="#" style={{ textDecoration: 'none', color: '#555' }}>Dashboard</a>
          <a href="#" style={{ textDecoration: 'none', color: '#555' }}>Insights</a>
          <a href="#" style={{ textDecoration: 'none', color: '#555' }}>Contact</a>
          <a href="/login" style={{
            textDecoration: 'none',
            background: 'linear-gradient(45deg, #2dc997, #00acc1)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '25px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(45, 201, 151, 0.3)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }} onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(45, 201, 151, 0.4)';
          }} onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(45, 201, 151, 0.3)';
          }}>Login</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '50px',
        minHeight: '70vh'
      }}>
        <div style={{
          width: '50%',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateX(0)' : 'translateX(-50px)',
          transition: 'opacity 1s ease, transform 1s ease',
          transitionDelay: '0.4s'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
            lineHeight: '1.2',
            color: '#1f2d3d'
          }}>Breathe Easy, <span style={{
            background: 'linear-gradient(45deg, #2dc997, #00acc1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Live Smarter</span></h1>
          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#444',
            marginBottom: '30px'
          }}>
            Track and predict air quality in your city with real-time AQI data, trends, and health insights.
          </p>
          <div style={{
            display: 'flex',
            gap: '20px'
          }}>
            <button style={{
              background: 'linear-gradient(45deg, #2dc997, #00acc1)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 188, 212, 0.3)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }} onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 188, 212, 0.4)';
            }} onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 188, 212, 0.3)';
            }}>Get Started</button>
            <button style={{
              background: 'transparent',
              color: '#00bcd4',
              border: '2px solid #00bcd4',
              padding: '15px 30px',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.3s ease, color 0.3s ease'
            }} onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(0, 188, 212, 0.1)';
            }} onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}>Learn More</button>
          </div>
        </div>
        <div style={{
          width: '40%',
          height: '400px',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateX(0)' : 'translateX(50px)',
          transition: 'opacity 1s ease, transform 1s ease',
          transitionDelay: '0.6s'
        }}>
          <img src="/assets/aqi-visual.png" alt="AQI Dashboard" style={{ width: '100%', borderRadius: '20px' }} />
        </div>
      </section>
      {/* Categories or Insights Section */}
      <section style={{
        padding: '30px 50px 70px',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 1s ease, transform 1s ease',
        transitionDelay: '0.8s'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '32px',
          marginBottom: '40px',
          color: '#1f2d3d'
        }}>Popular <span style={{
          background: 'linear-gradient(45deg, #2dc997, #00acc1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Insights</span></h2>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          {['AQI Trends', 'Pollution Sources', 'Health Tips', 'Forecasts'].map((category, index) => (
            <div key={category} style={{
              background: 'white',
              borderRadius: '15px',
              padding: '30px 20px',
              textAlign: 'center',
              boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
              flex: 1,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${0.8 + (index * 0.2)}s`
            }} onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }} onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: `linear-gradient(45deg, #2dc997 ${index * 10}%, #00acc1 ${100 - (index * 10)}%)`,
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '30px' }}>
                  {index === 0 ? '📊' : index === 1 ? '🏭' : index === 2 ? '💨' : '🌦️'}
                </span>
              </div>
              <h3 style={{ margin: '0 0 10px', color: '#1f2d3d' }}>{category}</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                Stay informed on {category.toLowerCase()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// // AQILanding.js
// import React, { useEffect, useState } from 'react';
// // 🛑 Import the styles object 🛑
// import { styles } from './AQILandingStyles'; 

// const DashboardHeader = ({ isLoaded }) => {
//   const loginBtnHover = (e, isOver) => {
//     e.currentTarget.style.transform = isOver ? 'translateY(-3px)' : 'translateY(0)';
//     e.currentTarget.style.boxShadow = isOver ? '0 6px 20px rgba(45, 201, 151, 0.4)' : '0 4px 15px rgba(45, 201, 151, 0.3)';
//   };

//   const headerStyle = {
//     ...styles.header,
//     opacity: isLoaded ? 1 : 0,
//     transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
//     transition: 'opacity 0.8s ease, transform 0.8s ease',
//   };

//   const navStyle = {
//     ...styles.navContainer,
//     opacity: isLoaded ? 1 : 0,
//     transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
//     transition: 'opacity 0.8s ease, transform 0.8s ease',
//     transitionDelay: '0.2s'
//   };

//   return (
//     <header style={headerStyle}>
//       <div style={styles.logoContainer}>
//         <div style={styles.logoIcon}></div>
//         <h2 style={{ ...styles.logoTitle, ...styles.gradientText }}>AQI Insight</h2>
//       </div>
//       <nav style={navStyle}>
//         <a href="#" style={styles.navLinkActive}>Home</a>
//         <a href="#" style={styles.navLinkBase}>Dashboard</a>
//         <a href="#" style={styles.navLinkBase}>Insights</a>
//         <a href="#" style={styles.navLinkBase}>Contact</a>
//         <a 
//           href="/login" 
//           style={styles.loginButton} 
//           onMouseOver={(e) => loginBtnHover(e, true)} 
//           onMouseOut={(e) => loginBtnHover(e, false)}
//         >
//           Login
//         </a>
//       </nav>
//     </header>
//   );
// };


// export default function AQILanding() {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     // This effect is clean and only runs once on mount
//     setIsLoaded(true);
//   }, []);

//   // Define the common hover logic for the primary button
//   const primaryBtnHover = (e, isOver) => {
//     const shadow = isOver ? '0 6px 20px rgba(0, 188, 212, 0.4)' : '0 4px 15px rgba(0, 188, 212, 0.3)';
//     e.currentTarget.style.transform = isOver ? 'translateY(-3px)' : 'translateY(0)';
//     e.currentTarget.style.boxShadow = shadow;
//   };
  
//   // Define the common hover logic for the secondary button
//   const secondaryBtnHover = (e, isOver) => {
//     e.currentTarget.style.background = isOver ? 'rgba(0, 188, 212, 0.1)' : 'transparent';
//   };

//   // 🛑 Hero section animation style 🛑
//   const heroStyle = {
//     ...styles.heroSection,
//     transform: isLoaded ? 'translateX(0)' : 'translateX(-50px)',
//     transition: 'opacity 1s ease, transform 1s ease',
//     transitionDelay: '0.4s'
//   };

//   return (
//     <div style={styles.container}>
//       {/* 🛑 Use the extracted Header component 🛑 */}
//       <DashboardHeader isLoaded={isLoaded} />

//       {/* Hero Section */}
//       <section style={{ ...heroStyle, opacity: isLoaded ? 1 : 0 }}>
//         <div style={styles.heroTextContainer}>
//           <h1 style={styles.heroTitle}>
//             Breathe Easy, <span style={styles.gradientText}>Live Smarter</span>
//           </h1>

//           <p style={styles.heroSubtitle}>
//             Track and predict air quality in your city with real-time AQI data, trends, and health insights.
//           </p>

//           <div style={styles.heroButtonContainer}>
//             <button 
//               onMouseOver={(e) => primaryBtnHover(e, true)} 
//               onMouseOut={(e) => primaryBtnHover(e, false)}
//               // 🛑 Apply button style from the external object 🛑
//               style={{ 
//                 ...styles.loginButton, 
//                 // Overwrite background and shadow to match the blue theme 
//                 background: 'linear-gradient(45deg, #2dc997, #00acc1)',
//                 boxShadow: '0 4px 15px rgba(0, 188, 212, 0.3)',
//                 padding: '15px 30px', 
//                 borderRadius: '30px',
//                 border: 'none',
//                 // other primary button styles defined in the external object
//               }}
//             >
//               Get Started
//             </button>

//             <button 
//               onMouseOver={(e) => secondaryBtnHover(e, true)} 
//               onMouseOut={(e) => secondaryBtnHover(e, false)}
//               // 🛑 Apply secondary button style 🛑
//               style={{
//                 background: 'transparent',
//                 color: '#00bcd4',
//                 border: '2px solid #00bcd4',
//                 padding: '15px 30px',
//                 borderRadius: '30px',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 cursor: 'pointer',
//                 transition: 'background 0.3s ease, color 0.3s ease'
//               }}
//             >
//               Learn More
//             </button>
//           </div>
//         </div>

//         {/* Hero Image */}
//         <div style={{
//           width: '40%',
//           height: '400px',
//           opacity: isLoaded ? 1 : 0,
//           transform: isLoaded ? 'translateX(0)' : 'translateX(50px)',
//           transition: 'opacity 1s ease, transform 1s ease',
//           transitionDelay: '0.6s'
//         }}>
//           <img src="/assets/aqi-visual.png" alt="AQI Dashboard" style={{ width: '100%', borderRadius: '20px' }} />
//         </div>
//       </section>
      
//       {/* Categories or Insights Section (Rest of the component remains similar) */}
//       <section 
//         style={{
//           padding: '30px 50px 70px',
//           opacity: isLoaded ? 1 : 0,
//           transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
//           transition: 'opacity 1s ease, transform 1s ease',
//           transitionDelay: '0.8s'
//         }}
//       >
//         <h2 style={{
//           textAlign: 'center',
//           fontSize: '32px',
//           marginBottom: '40px',
//           color: '#1f2d3d'
//         }}>Popular <span style={styles.gradientText}>Insights</span></h2>

//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           gap: '20px'
//         }}>
//           {['AQI Trends', 'Pollution Sources', 'Health Tips', 'Forecasts'].map((category, index) => (
//             <div 
//               key={category} 
//               style={{
//                 // 🛑 Inline styles for hover logic are still used here 🛑
//                 background: 'white',
//                 borderRadius: '15px',
//                 padding: '30px 20px',
//                 textAlign: 'center',
//                 boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
//                 flex: 1,
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                 opacity: isLoaded ? 1 : 0,
//                 transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
//                 transitionDelay: `${0.8 + (index * 0.2)}s`
//               }} 
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-10px)';
//                 e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
//               }} 
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
//               }}
//             >
//               {/* Card Content... */}
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }