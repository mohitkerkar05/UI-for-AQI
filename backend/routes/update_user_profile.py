from flask import Blueprint, request, jsonify
from models.user_model import mongo
from bson.objectid import ObjectId

update_profile_bp = Blueprint("update_profile", __name__)

@update_profile_bp.route('/update-user-profile', methods=['PUT'])
def update_user_profile():
    data = request.get_json()
    mobile = data.get("mobile")

    if not mobile:
        return jsonify({"error": "Mobile number is required"}), 400

    # ❗ Exclude both 'mobile' and '_id' from update
    update_data = {k: v for k, v in data.items() if k not in ["mobile", "_id"]}

    if not update_data:
        return jsonify({"error": "No update data provided"}), 400

    result = mongo.db.users.find_one_and_update(
        {"mobile": mobile},
        {"$set": update_data},
        return_document=True
    )

    if result:
        result["_id"] = str(result["_id"])
        return jsonify(result), 200
    else:
        return jsonify({"error": "User not found"}), 404
