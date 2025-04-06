from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Import CORS Middleware
import joblib
import pandas as pd
from datetime import datetime, timedelta
from pathlib import Path

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load all models at startup
models_path = Path(__file__).parent / "models"
cities = [
    'Delhi', 'Ahmedabad', 'Lucknow', 'Bengaluru', 'Chennai',
    'Hyderabad', 'Patna', 'Gurugram', 'Visakhapatnam', 'Amritsar',
    'Jorapokhar', 'Jaipur', 'Thiruvananthapuram', 'Amaravati',
    'Brajrajnagar', 'Talcher', 'Kolkata', 'Mumbai', 'Guwahati',
    'Coimbatore', 'Shillong', 'Chandigarh', 'Bhopal', 'Kochi',
    'Ernakulam', 'Aizawl'
]  # Add all available cities

models = {city: joblib.load(models_path / f"P2__{city}_prophet_model.pkl") for city in cities}

@app.get("/predict")
def predict(city: str):
    if city not in models:
        return {"error": "Model not found for this city"}

    # Generate forecast for next 7 days
    future_dates = [datetime(2025, 3, 4) + timedelta(days=i) for i in range(7)]
    future = pd.DataFrame({'ds': future_dates})

    # Check if the model requires a floor and cap
    if models[city].growth == 'logistic':
        future['floor'] = 0  # Set the minimum value
        future['cap'] = 500  # Adjust this based on your training data

    forecast = models[city].predict(future)
    predictions = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].to_dict(orient="records")

    return {"city": city, "predictions": predictions}
