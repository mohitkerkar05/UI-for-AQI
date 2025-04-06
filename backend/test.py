# import joblib
# from pathlib import Path
# import pandas as pd
# import matplotlib.pyplot as plt
# from datetime import datetime, timedelta

# def load_and_predict(city_name):
#     """Load model and generate predictions for next week with plotting"""
#     try:
#         # 1. Load the model
#         filename = f"P2__{city_name}_prophet_model.pkl"
#         model_path = Path(__file__).parent / "models" / filename
#         model = joblib.load(model_path)
        
#         print(f"[SUCCESS] Loaded {city_name} model")
#         print(f"Model type: {type(model)}")

#         # 2. Generate forecast for specific dates (March 4-11, 2025)
#         start_date = datetime(2025, 3, 4)
#         future_dates = [start_date + timedelta(days=i) for i in range(7)]
#         future = pd.DataFrame({'ds': future_dates})
        
#         # Add floor/cap if needed
#         if model.growth == 'logistic':
#             future['floor'] = 0
#             future['cap'] = 500
        
#         forecast = model.predict(future)
        
#         # 3. Print results
#         print("\nMarch 4-11, 2025 Forecast:")
#         print(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']])
        
#         # 4. Plot results
#         plt.figure(figsize=(12, 6))
#         plt.plot(forecast['ds'], forecast['yhat'], 'b-', label='Predicted AQI')
#         plt.fill_between(forecast['ds'], forecast['yhat_lower'], forecast['yhat_upper'], 
#                          color='blue', alpha=0.2, label='Uncertainty Interval')
        
#         plt.title(f'{city_name} AQI Forecast (March 4-11, 2025)')
#         plt.xlabel('Date')
#         plt.ylabel('AQI')
#         plt.xticks(rotation=45)
#         plt.legend()
#         plt.grid(True)
#         plt.tight_layout()
        
#         # Save and show plot
#         plot_filename = f"{city_name}_aqi_forecast_march2025.png"
#         plt.savefig(plot_filename)
#         print(f"\nPlot saved as {plot_filename}")
#         plt.show()
        
#         return forecast
    
#     except FileNotFoundError:
#         print(f"[ERROR] Model file not found: {filename}")
#         return None
#     except Exception as e:
#         print(f"[ERROR] Prediction failed: {str(e)}")
#         return None

# # Test with Delhi
# forecast = load_and_predict("Delhi")