from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from extensions import db
from models import Vacancy

vacancy_bp = Blueprint('vacancy', __name__)

@vacancy_bp.route('/', methods=['GET'])
def get_vacancies():
    vacancies = Vacancy.query.filter_by(is_active=True).order_by(Vacancy.created_at.desc()).all()
    return jsonify([v.to_dict() for v in vacancies])

@vacancy_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all_vacancies():
    vacancies = Vacancy.query.order_by(Vacancy.created_at.desc()).all()
    return jsonify([v.to_dict() for v in vacancies])

@vacancy_bp.route('/', methods=['POST'])
@jwt_required()
def create_vacancy():
    data = request.get_json()
    v = Vacancy(
        title=data.get('title'),
        description=data.get('description', ''),
        location=data.get('location', 'Ghaziabad'),
        is_active=data.get('is_active', True),
    )
    db.session.add(v)
    db.session.commit()
    return jsonify(v.to_dict()), 201

@vacancy_bp.route('/<int:vid>', methods=['PUT'])
@jwt_required()
def update_vacancy(vid):
    v = Vacancy.query.get_or_404(vid)
    data = request.get_json()
    for field in ['title', 'description', 'location', 'is_active']:
        if field in data:
            setattr(v, field, data[field])
    db.session.commit()
    return jsonify(v.to_dict())

@vacancy_bp.route('/<int:vid>', methods=['DELETE'])
@jwt_required()
def delete_vacancy(vid):
    v = Vacancy.query.get_or_404(vid)
    db.session.delete(v)
    db.session.commit()
    return jsonify({'message': 'Deleted'})