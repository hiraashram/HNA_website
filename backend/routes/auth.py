from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import bcrypt
from extensions import db
from models import Admin

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400

    admin = Admin.query.filter_by(username=username).first()
    if not admin:
        return jsonify({'error': 'Invalid credentials'}), 401

    if not bcrypt.checkpw(password.encode('utf-8'), admin.password.encode('utf-8')):
        return jsonify({'error': 'Invalid credentials'}), 401

    token = create_access_token(identity=str(admin.id))
    return jsonify({'token': token, 'username': admin.username}), 200

@auth_bp.route('/verify', methods=['GET'])
@jwt_required()
def verify():
    admin_id = get_jwt_identity()
    admin = Admin.query.get(int(admin_id))
    if not admin:
        return jsonify({'error': 'Admin not found'}), 404
    return jsonify({'username': admin.username, 'id': admin.id}), 200

@auth_bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    admin_id = get_jwt_identity()
    data = request.get_json()
    new_password = data.get('new_password')
    if not new_password or len(new_password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters'}), 400
    admin = Admin.query.get(int(admin_id))
    hashed = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
    admin.password = hashed.decode('utf-8')
    db.session.commit()
    return jsonify({'message': 'Password updated'}), 200