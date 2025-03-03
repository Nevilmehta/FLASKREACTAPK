from flask import Blueprint, request, jsonify
from app import db
from app.models import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/", methods=["GET"])
def home():
    return jsonify(message="Welcome to the API"), 200

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    user = User(username=data["username"], email=data["email"])
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit()
    return jsonify(message="User created successfully"), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data or "email" not in data or "password" not in data:
        return jsonify(message="Email and password are required"), 400
    print("Received login data:", data)  # Debugging

    user = User.query.filter_by(email=data["email"]).first()
    if user and user.check_password(data["password"]):
        token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(days=1))
        return jsonify(access_token=token, user={"id": user.id, "email": user.email, "username": user.username}), 200  # Include user data

    return jsonify(message="Invalid credentials"), 401
    
# for user authorization verification
@auth_bp.route("/user", methods=["GET"])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        return jsonify({"id": user.id, "email": user.email, "username": user.username}), 200
    return jsonify({"message": "User not found"}), 404