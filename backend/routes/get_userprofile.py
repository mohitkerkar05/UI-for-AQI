from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
from flask import Blueprint, request, jsonify
from models.user_model import mongo
import logging
logging.basicConfig(level=logging.INFO)
userprofile_bp = Blueprint("user-profile", __name__)


# ✅ GET User Profile route (based on mobile number or other ID)
@userprofile_bp.route("/get-user-profile", methods=["GET"])
def get_user_profile():
    mobile = request.args.get("mobile")
    logging.info(f"Fetching profile for mobile: {mobile}")

    if not mobile:
        return jsonify({"error": "Mobile number is required"}), 400

    user = mongo.db.users.find_one({"mobile": mobile})

    if not user:
        return jsonify({"error": "User not found"}), 404

    user["_id"] = str(user["_id"])  # Convert ObjectId to string for JSON
    return jsonify(user), 200
