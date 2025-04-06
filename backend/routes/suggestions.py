# from flask import Blueprint, jsonify, request
# from models.suggestion_model import suggestion_model, map_activity_level, preventive_measures
# from db import user_collection
# import pandas as pd
# import requests

# suggestions_bp = Blueprint('suggestions', __name__)

# @suggestions_bp.route("/suggestions/<user_id>", methods=["GET"])
# def generate_suggestions(user_id):
#     city = request.args.get("city")
#     user = user_collection.find_one({"mobile": user_id})
#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     try:
#         response = requests.get(f"http://127.0.0.1:8000/predict?city={city}")
#         response.raise_for_status()
#         aqi_forecast = response.json()["forecast"]
#     except Exception as e:
#         return jsonify({"error": f"Error fetching AQI data: {str(e)}"}), 500

#     user_age = user.get("age")
#     respiratory_issue = user.get("respiratory_issue", False)
#     fitness_activities = user.get("fitness_activities", [])
#     activity_level = map_activity_level(fitness_activities)

#     is_sensitive = (
#         respiratory_issue or
#         user_age < 12 or user_age > 60 or
#         any(act in ['Walking', 'Cycling', 'Running'] for act in fitness_activities)
#     )

#     input_df = pd.DataFrame({
#         "AQI": aqi_forecast,
#         "HealthImpactClass": [1 if is_sensitive else 0] * len(aqi_forecast)
#     })

#     predictions = suggestion_model.predict(input_df)

#     suggestions = []
#     for i, level in enumerate(predictions):
#         label = preventive_measures[level]["label"]
#         tips = preventive_measures[level]["sensitive" if is_sensitive else "general"]
#         suggestions.append({
#             "day": i + 1,
#             "AQI": aqi_forecast[i],
#             "suggestion": label,
#             "preventive_measures": tips
#         })

#     return jsonify({"suggestions": suggestions})
