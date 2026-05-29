from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required
import cloudinary
import cloudinary.uploader
from extensions import db
from models import GalleryImage

gallery_bp = Blueprint('gallery', __name__)

def init_cloudinary():
    cloudinary.config(
        cloud_name=current_app.config['CLOUDINARY_CLOUD_NAME'],
        api_key=current_app.config['CLOUDINARY_API_KEY'],
        api_secret=current_app.config['CLOUDINARY_API_SECRET'],
    )

@gallery_bp.route('/', methods=['GET'])
def get_images():
    category = request.args.get('category')
    query = GalleryImage.query.filter_by(is_active=True)
    if category:
        query = query.filter_by(category=category)
    images = query.order_by(GalleryImage.order_index.desc(), GalleryImage.created_at.desc()).all()
    return jsonify([img.to_dict() for img in images])

@gallery_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all_images():
    images = GalleryImage.query.order_by(GalleryImage.created_at.desc()).all()
    return jsonify([img.to_dict() for img in images])

@gallery_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_image():
    init_cloudinary()
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    title = request.form.get('title', '')
    category = request.form.get('category', 'academy')

    result = cloudinary.uploader.upload(
        file,
        folder='hna_academy',
        transformation=[{'quality': 'auto', 'fetch_format': 'auto'}]
    )

    image = GalleryImage(
        title=title,
        cloudinary_url=result['secure_url'],
        cloudinary_public_id=result['public_id'],
        category=category,
    )
    db.session.add(image)
    db.session.commit()
    return jsonify(image.to_dict()), 201

@gallery_bp.route('/<int:image_id>', methods=['PUT'])
@jwt_required()
def update_image(image_id):
    image = GalleryImage.query.get_or_404(image_id)
    data = request.get_json()
    for field in ['title', 'category', 'is_active', 'order_index']:
        if field in data:
            setattr(image, field, data[field])
    db.session.commit()
    return jsonify(image.to_dict())

@gallery_bp.route('/<int:image_id>', methods=['DELETE'])
@jwt_required()
def delete_image(image_id):
    init_cloudinary()
    image = GalleryImage.query.get_or_404(image_id)
    # Delete from Cloudinary
    if image.cloudinary_public_id:
        cloudinary.uploader.destroy(image.cloudinary_public_id)
    db.session.delete(image)
    db.session.commit()
    return jsonify({'message': 'Image deleted'}), 200
