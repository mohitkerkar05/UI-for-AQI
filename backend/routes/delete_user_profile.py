from flask import Blueprint, request, jsonify
from models.user_model import mongo
from bson.objectid import ObjectId

delete_profile_bp = Blueprint("delete_profile", __name__)

# In your update_profile_bp file

@delete_profile_bp.route('/delete-user-profile', methods=['DELETE'])
def delete_user_profile():
    mobile = request.args.get("mobile")

    if not mobile:
        return jsonify({"error": "Mobile number is required"}), 400

    result = mongo.db.users.delete_one({"mobile": mobile})

    if result.deleted_count == 1:
        return jsonify({"message": "User profile deleted successfully"}), 200
    else:
        return jsonify({"error": "User not found"}), 404
