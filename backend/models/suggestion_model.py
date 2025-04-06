# import joblib
# from pathlib import Path

# model_path = Path(__file__).resolve().parent / "aqi_suggestion_model.pkl"
# suggestion_model = joblib.load(model_path)

# def map_activity_level(fitness_activities):
#     if not fitness_activities or 'None' in fitness_activities:
#         return 'low'
#     elif len(fitness_activities) >= 2:
#         return 'high'
#     else:
#         return 'moderate'

# # Updated Preventive measures dictionary
# preventive_measures = {
#     0: {
#         "label": "Safe",
#         "general": [
#             "Enjoy outdoor activities freely.",
#             "Keep windows open to ventilate indoor air.",
#             "No special precautions needed."
#         ],
#         "sensitive": [
#             "Continue regular activities.",
#             "Maintain your medication routine if applicable."
#         ]
#     },
#     1: {
#         "label": "Caution",
#         "general": [
#             "Avoid strenuous outdoor exercise.",
#             "Keep track of local air quality reports.",
#             "Use air purifiers indoors if possible."
#         ],
#         "sensitive": [
#             "Reduce outdoor exposure.",
#             "Wear an N95 mask if going outside.",
#             "Keep emergency inhalers or meds ready."
#         ]
#     },
#     2: {
#         "label": "Dangerous",
#         "general": [
#             "Stay indoors as much as possible.",
#             "Keep doors and windows shut.",
#             "Avoid all outdoor physical activities.",
#             "Use air purifiers and stay hydrated."
#         ],
#         "sensitive": [
#             "Strictly avoid going out.",
#             "Use prescribed medication as per doctor’s advice.",
#             "Consult your physician if symptoms worsen.",
#             "Avoid smoking or exposure to smoke indoors."
#         ]
#     },
#     3: {
#         "label": "Very Dangerous",
#         "general": [
#             "Avoid going outside under any circumstances.",
#             "Use HEPA air purifiers indoors.",
#             "Prepare for possible health emergencies."
#         ],
#         "sensitive": [
#             "Seek immediate medical advice if unwell.",
#             "Relocate to a safer environment if possible.",
#             "Avoid physical exertion entirely.",
#             "Stay in sealed environments with filtered air."
#         ]
#     }
# }
