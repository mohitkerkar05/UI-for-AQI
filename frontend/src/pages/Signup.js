import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputField";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    age: "",
    // gender: "",
    mobile: "",
    respiratoryIssue: '', 
fitnessActivities: [] ,

    // address1: "",
    // address2: "",
    // landmark: "",
    // city: "",
    // state: "",
    // country: "",
    password: "",
  });
  
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });

    if (e.target.name === "dob") {
      const birthDate = new Date(e.target.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      setUser({ ...user, dob: e.target.value, age: age.toString() });
    }
  };
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setUser((prevUser) => {
      const updatedActivities = checked
        ? [...(prevUser.fitnessActivities || []), value]
        : prevUser.fitnessActivities.filter((act) => act !== value);
      return { ...prevUser, fitnessActivities: updatedActivities };
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/signup`, user);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStepIndicator = () => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '30px'
      }}>
        {[1, 2, 3].map((item) => (
          <div key={item} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: step >= item ? 'linear-gradient(45deg, #2dc997, #00acc1)' : '#f0f0f0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: step >= item ? 'white' : '#999',
              fontWeight: 'bold',
              marginBottom: '8px',
              transition: 'all 0.3s ease',
              position: 'relative',
              zIndex: 1
            }}>
              {item}
            </div>
            <div style={{
              fontSize: '12px',
              color: step >= item ? '#00bcd4' : '#999',
              textAlign: 'center',
              fontWeight: step === item ? 'bold' : 'normal'
            }}>
              {item === 1 ? 'Personal Info' : item === 2 ? 'Fitness and Health check' : 'Account Setup'}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div style={{ 
            animation: 'fadeIn 0.5s ease forwards',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}>
            <h3 style={{
              marginBottom: '20px',
              color: '#1f2d3d',
              textAlign: 'center',
              fontSize: '22px'
            }}>Personal Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ gridColumn: '1 / 2' }}>
                <InputField 
                  label="First Name" 
                  type="text" 
                  name="firstName" 
                  value={user.firstName} 
                  onChange={handleChange} 
                  required
                  style={inputStyle}
                  labelStyle={labelStyle}
                  focusStyle={focusStyle}
                />
              </div>
              <div style={{ gridColumn: '2 / 3' }}>
                <InputField 
                  label="Last Name" 
                  type="text" 
                  name="lastName" 
                  value={user.lastName} 
                  onChange={handleChange} 
                  required
                  style={inputStyle}
                  labelStyle={labelStyle}
                  focusStyle={focusStyle}
                />
              </div>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <InputField 
                label="Middle Name (optional)" 
                type="text" 
                name="middleName" 
                value={user.middleName} 
                onChange={handleChange}
                style={inputStyle}
                labelStyle={labelStyle}
                focusStyle={focusStyle}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ gridColumn: '1 / 2' }}>
                <InputField 
                  label="Date of Birth" 
                  type="date" 
                  name="dob" 
                  value={user.dob} 
                  onChange={handleChange} 
                  required
                  style={inputStyle}
                  labelStyle={labelStyle}
                  focusStyle={focusStyle}
                />
              </div>
              <div style={{ gridColumn: '2 / 3' }}>
                <InputField 
                  label="Age" 
                  type="text" 
                  name="age" 
                  value={user.age} 
                  onChange={handleChange} 
                  disabled 
                  style={{
                    ...inputStyle,
                    backgroundColor: '#f5f5f5'
                  }}
                  labelStyle={labelStyle}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
             {/*  <div style={{ gridColumn: '1 / 2' }}>
                <label style={labelStyle}>Gender</label>
                <select 
                  name="gender" 
                  value={user.gender} 
                  onChange={handleChange}
                  required
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23999\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center'
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>*/}
              <div style={{ gridColumn: '2 / 3' }}>
                <InputField 
                  label="Mobile No" 
                  type="text" 
                  name="mobile" 
                  value={user.mobile} 
                  onChange={handleChange} 
                  required
                  style={inputStyle}
                  labelStyle={labelStyle}
                  focusStyle={focusStyle}
                />
              </div>
            </div> 
            <div style={{ textAlign: 'right' }}>
              <button 
                type="button" 
                onClick={nextStep}
                style={buttonStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 188, 212, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 188, 212, 0.3)';
                }}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div style={{ 
            animation: 'fadeIn 0.5s ease forwards',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}>
            <h3 style={{
  marginBottom: '20px',
  color: '#1f2d3d',
  textAlign: 'center',
  fontSize: '22px'
}}>
  Health & Lifestyle Info
</h3>

<div style={{ marginBottom: '20px' }}>
  <label style={labelStyle} htmlFor="respiratoryIssue">Do you have any lung or respiratory problems?</label>
  <select
    id="respiratoryIssue"
    name="respiratoryIssue"
    value={user.respiratoryIssue}
    onChange={handleChange}
    required
    style={{
      ...inputStyle,
      width: '100%',
      padding: '10px',
      marginTop: '5px'
    }}
  >
    <option value="">Select an option</option>
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>
</div>

<div style={{ marginBottom: '20px' }}>
  <label style={labelStyle}>Do you engage in any fitness activities?</label>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
    {['Cycling', 'Running', 'Walking', 'Gym', 'Yoga', 'None'].map((activity) => (
      <label key={activity} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <input
          type="checkbox"
          name="fitnessActivities"
          value={activity}
          checked={user.fitnessActivities?.includes(activity)}
          onChange={handleCheckboxChange}
        />
        {activity}
      </label>
    ))}
  </div>
</div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}> 
              <button 
                type="button" 
                onClick={prevStep}
                style={{
                  ...buttonStyle,
                  background: 'white',
                  color: '#00bcd4',
                  border: '2px solid #00bcd4',
                  boxShadow: 'none'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 188, 212, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                Back
              </button>
              <button 
                type="button" 
                onClick={nextStep}
                style={buttonStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 188, 212, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 188, 212, 0.3)';
                }}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div style={{ 
            animation: 'fadeIn 0.5s ease forwards',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}>
            <h3 style={{
              marginBottom: '20px',
              color: '#1f2d3d',
              textAlign: 'center',
              fontSize: '22px'
            }}>Account Setup</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <InputField 
                label="Password" 
                type="password" 
                name="password" 
                value={user.password} 
                onChange={handleChange} 
                required
                style={inputStyle}
                labelStyle={labelStyle}
                focusStyle={focusStyle}
              />
              <p style={{
                fontSize: '12px',
                color: '#777',
                marginTop: '5px'
              }}>Password must be at least 8 characters long with letters and numbers</p>
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <InputField 
                label="Confirm Password" 
                type="password" 
                name="confirmPassword" 
                required
                style={inputStyle}
                labelStyle={labelStyle}
                focusStyle={focusStyle}
              />
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <input 
                type="checkbox" 
                id="terms" 
                style={{ marginRight: '10px' }} 
                required
              />
              <label htmlFor="terms" style={{
                fontSize: '14px',
                color: '#666'
              }}>
                I agree to the <a href="#" style={{ color: '#00bcd4', textDecoration: 'none' }}>Terms and Conditions</a> and <a href="#" style={{ color: '#00bcd4', textDecoration: 'none' }}>Privacy Policy</a>
              </label>
            </div>
            
            {error && (
              <div style={{
                background: 'rgba(0, 188, 212, 0.1)',
                border: '1px solid #00bcd4',
                borderRadius: '10px',
                padding: '12px 15px',
                marginBottom: '20px',
                color: '#00bcd4',
                fontSize: '14px',
                animation: 'shake 0.5s ease-in-out'
              }}>
                {error}
              </div>
            )}
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <button 
                type="button" 
                onClick={prevStep}
                style={{
                  ...buttonStyle,
                  background: 'white',
                  color: '#00bcd4',
                  border: '2px solid #00bcd4',
                  boxShadow: 'none'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 188, 212, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                Back
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                style={{
                  ...buttonStyle,
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
                onMouseOver={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 188, 212, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 188, 212, 0.3)';
                  }
                }}
              >
                {isSubmitting ? 'Signing Up...' : 'Complete Signup'}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Styles
  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxSizing: 'border-box',
    marginTop: '8px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555'
  };

  const focusStyle = {
    borderColor: '#00bcd4',
    boxShadow: '0 0 0 3px rgba(0, 188, 212, 0.2)'
  };

  const buttonStyle = {
    padding: '14px 25px',
    background: 'linear-gradient(45deg, #2dc997, #00acc1)',
    border: 'none',
    borderRadius: '30px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 188, 212, 0.3)',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #e0f7fa 0%, #d0f0e0 100%)',
      color: '#1f2d3d',
      margin: 0,
      padding: 0,
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
        <Link to="/" style={{ textDecoration: 'none' }}>
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
        </Link>
        <nav style={{
          display: 'flex',
          gap: '30px',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          transitionDelay: '0.2s'
        }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#00bcd4', fontWeight: 'bold' }}>Home</Link>
          <Link to="#" style={{ textDecoration: 'none', color: '#555' }}>Dashboard</Link>
          <Link to="#" style={{ textDecoration: 'none', color: '#555' }}>Insights</Link>
          <Link to="#" style={{ textDecoration: 'none', color: '#555' }}>Contact</Link>
          <Link to="/login" style={{
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
          }}>Login</Link>
        </nav>
      </header>

      {/* Signup Form */}
      <div style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 1s ease',
        transitionDelay: '0.4s'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          width: '100%',
          maxWidth: '650px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          animation: 'fadeIn 0.8s ease forwards'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '28px',
            marginBottom: '15px',
            color: '#1f2d3d',
            background: 'linear-gradient(45deg, #2dc997, #00acc1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Create Your Account</h2>
          
          <p style={{
            textAlign: 'center',
            color: '#777',
            marginBottom: '30px',
            fontSize: '15px'
          }}>
            Join AQI Insight to track air quality in your area
          </p>
          
          {renderStepIndicator()}
          
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
          </form>
          
          <div style={{
            marginTop: '30px',
            textAlign: 'center',
            color: '#777',
            fontSize: '14px',
            borderTop: '1px solid #eee',
            paddingTop: '20px'
          }}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color: '#00bcd4',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
            onMouseOver={(e) => {
              e.target.style.textDecoration = 'underline';
            }}
            onMouseOut={(e) => {
              e.target.style.textDecoration = 'none';
            }}>
              Login here
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default Signup;