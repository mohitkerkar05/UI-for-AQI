# app.py
from flask import Flask
from flask_cors import CORS
from config import Config
from models.user_model import init_db
from routes.auth_routes import auth_bp
from routes.login_routes import login_bp
from routes.get_userprofile import userprofile_bp
from routes.update_user_profile import update_profile_bp  # ✅ Add this line
from routes.delete_user_profile import delete_profile_bp
# from routes.suggestions import suggestions_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, resources={r"/*": {"origins": "*"}})
init_db(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(login_bp)
app.register_blueprint(userprofile_bp)
app.register_blueprint(update_profile_bp)  # ✅ Register the update profile route
app.register_blueprint(delete_profile_bp)
# app.register_blueprint(suggestions_bp)

if __name__ == "__main__":
    app.run(debug=True)
