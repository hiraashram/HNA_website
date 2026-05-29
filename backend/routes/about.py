from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from extensions import db
from models import AboutSection, Testimonial

about_bp = Blueprint('about', __name__)

@about_bp.route('/', methods=['GET'])
def get_sections():
    sections = AboutSection.query.filter_by(is_active=True).order_by(AboutSection.order_index).all()
    return jsonify([s.to_dict() for s in sections])

@about_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all_sections():
    sections = AboutSection.query.order_by(AboutSection.order_index).all()
    return jsonify([s.to_dict() for s in sections])

@about_bp.route('/', methods=['POST'])
@jwt_required()
def create_section():
    data = request.get_json()
    section = AboutSection(
        section_key=data.get('section_key'),
        title=data.get('title'),
        content=data.get('content'),
        order_index=data.get('order_index', 0),
        is_active=data.get('is_active', True),
    )
    db.session.add(section)
    db.session.commit()
    return jsonify(section.to_dict()), 201

@about_bp.route('/<int:section_id>', methods=['PUT'])
@jwt_required()
def update_section(section_id):
    section = AboutSection.query.get_or_404(section_id)
    data = request.get_json()
    for field in ['title', 'content', 'order_index', 'is_active']:
        if field in data:
            setattr(section, field, data[field])
    db.session.commit()
    return jsonify(section.to_dict())

@about_bp.route('/<int:section_id>', methods=['DELETE'])
@jwt_required()
def delete_section(section_id):
    section = AboutSection.query.get_or_404(section_id)
    db.session.delete(section)
    db.session.commit()
    return jsonify({'message': 'Section deleted'}), 200

@about_bp.route('/testimonials', methods=['GET'])
def get_testimonials():
    testimonials = Testimonial.query.filter_by(is_active=True).all()
    return jsonify([t.to_dict() for t in testimonials])

@about_bp.route('/testimonials', methods=['POST'])
@jwt_required()
def add_testimonial():
    data = request.get_json()
    t = Testimonial(name=data['name'], course=data.get('course', ''), message=data['message'])
    db.session.add(t)
    db.session.commit()
    return jsonify(t.to_dict()), 201

@about_bp.route('/testimonials/<int:tid>', methods=['DELETE'])
@jwt_required()
def delete_testimonial(tid):
    t = Testimonial.query.get_or_404(tid)
    db.session.delete(t)
    db.session.commit()
    return jsonify({'message': 'Deleted'})
