from extensions import db
from datetime import datetime

class Admin(db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Course(db.Model):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    short_name = db.Column(db.String(50))
    description = db.Column(db.Text)
    eligibility = db.Column(db.Text)
    duration = db.Column(db.String(100))
    fee = db.Column(db.String(100))
    affiliation = db.Column(db.String(100))  # 'ABPCP', 'GNAP', 'MESS', 'COMPUTER'
    is_active = db.Column(db.Boolean, default=True)
    order_index = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'short_name': self.short_name,
            'description': self.description,
            'eligibility': self.eligibility,
            'duration': self.duration,
            'fee': self.fee,
            'affiliation': self.affiliation,
            'is_active': self.is_active,
            'order_index': self.order_index,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }

class GalleryImage(db.Model):
    __tablename__ = 'gallery_images'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    cloudinary_url = db.Column(db.String(500), nullable=False)
    cloudinary_public_id = db.Column(db.String(255))
    category = db.Column(db.String(50))  # 'academy', 'ashram', 'events', 'students'
    is_active = db.Column(db.Boolean, default=True)
    order_index = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'cloudinary_url': self.cloudinary_url,
            'cloudinary_public_id': self.cloudinary_public_id,
            'category': self.category,
            'is_active': self.is_active,
            'order_index': self.order_index,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }

class AboutSection(db.Model):
    __tablename__ = 'about_sections'
    id = db.Column(db.Integer, primary_key=True)
    section_key = db.Column(db.String(100), unique=True, nullable=False)
    title = db.Column(db.String(255))
    content = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True)
    order_index = db.Column(db.Integer, default=0)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'section_key': self.section_key,
            'title': self.title,
            'content': self.content,
            'is_active': self.is_active,
            'order_index': self.order_index,
        }

class Testimonial(db.Model):
    __tablename__ = 'testimonials'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    course = db.Column(db.String(100))
    message = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'course': self.course,
            'message': self.message,
            'is_active': self.is_active,
        }
