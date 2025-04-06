# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# import joblib
# from prophet import Prophet

# app = FastAPI()

# # Your exact city list
# SUPPORTED_CITIES = [
#     'delhi', 'ahmedabad', 'lucknow', 'bengaluru', 'chennai',
#     'hyderabad', 'patna', 'gurugram', 'visakhapatnam', 'amritsar',
#     'jorapokhar', 'jaipur', 'thiruvananthapuram', 'amaravati',
#     'brajrajnagar', 'talcher', 'kolkata', 'mumbai', 'guwahati',
#     'coimbatore', 'shillong', 'chandigarh', 'bhopal', 'kochi',
#     'ernakulam', 'aizawl'
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# def load_model(city: str):
#     try:
#         # Handle city name case insensitivity and special characters
#         normalized_city = city.lower().replace(' ', '')
#         model_path = f"models/P2_{normalized_city}_prophet_model.pkl"
#         return joblib.load(model_path)
#     except FileNotFoundError:
#         raise HTTPException(status_code=404, detail=f"Model for {city} not found")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @app.get("/cities")
# async def list_cities():
#     """Endpoint to list all supported cities"""
#     return {"cities": [city.capitalize() for city in SUPPORTED_CITIES]}

# @app.get("/predict/")
# async def predict(city: str, days: int = 7):
#     if city.lower() not in [c.lower() for c in SUPPORTED_CITIES]:
#         raise HTTPException(status_code=400, detail="Unsupported city")
    
#     if days < 1 or days > 30:
#         raise HTTPException(status_code=400, detail="Days must be between 1-30")
    
#     model = load_model(city)
#     future = model.make_future_dataframe(periods=days)
#     forecast = model.predict(future)
    
#     return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(days).to_dict("records")