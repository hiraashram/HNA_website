from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from extensions import db
from models import Course

courses_bp = Blueprint('courses', __name__)

@courses_bp.route('/', methods=['GET'])
def get_courses():
    affiliation = request.args.get('affiliation')
    query = Course.query.filter_by(is_active=True)
    if affiliation:
        query = query.filter_by(affiliation=affiliation)
    courses = query.order_by(Course.order_index, Course.id).all()
    return jsonify([c.to_dict() for c in courses])

@courses_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all_courses():
    courses = Course.query.order_by(Course.affiliation, Course.order_index).all()
    return jsonify([c.to_dict() for c in courses])

@courses_bp.route('/', methods=['POST'])
@jwt_required()
def create_course():
    data = request.get_json()
    course = Course(
        title=data.get('title'),
        short_name=data.get('short_name', ''),
        description=data.get('description', ''),
        eligibility=data.get('eligibility', ''),
        duration=data.get('duration', ''),
        fee=data.get('fee', ''),
        affiliation=data.get('affiliation', 'ABPCP'),
        order_index=data.get('order_index', 0),
        is_active=data.get('is_active', True),
    )
    db.session.add(course)
    db.session.commit()
    return jsonify(course.to_dict()), 201

@courses_bp.route('/<int:course_id>', methods=['PUT'])
@jwt_required()
def update_course(course_id):
    course = Course.query.get_or_404(course_id)
    data = request.get_json()
    for field in ['title', 'short_name', 'description', 'eligibility', 'duration', 'fee', 'affiliation', 'order_index', 'is_active']:
        if field in data:
            setattr(course, field, data[field])
    db.session.commit()
    return jsonify(course.to_dict())

@courses_bp.route('/<int:course_id>', methods=['DELETE'])
@jwt_required()
def delete_course(course_id):
    course = Course.query.get_or_404(course_id)
    db.session.delete(course)
    db.session.commit()
    return jsonify({'message': 'Course deleted'}), 200

def seed_courses(db):
    """Seed default courses from affiliations"""
    default_courses = [
        # ABPCP Courses
        {
            'title': 'Six Month Certificate Course in Elementary Naturopathy & Yoga',
            'short_name': 'C.E.N.Y.',
            'description': 'Formerly known as Pravesh. This foundational course introduces students to the principles of Naturopathy and Yoga through theoretical and practical training.',
            'eligibility': 'Tenth class or equivalent. Exception can be made for persons with at least 10 years experience in Nature Cure & Yoga and proficiency in reading and writing Hindi & English.',
            'duration': '6 Months',
            'fee': 'Contact Academy',
            'affiliation': 'ABPCP',
            'order_index': 1,
        },
        {
            'title': 'One Year Certificate Course in Naturopathy & Yoga Technique',
            'short_name': 'C.N.Y.T.',
            'description': 'Formerly known as Upcharak. This intermediate course builds on the foundational knowledge and provides comprehensive training in naturopathy techniques.',
            'eligibility': 'Class XIIth (10+2) or equivalent, or C.E.N.Y. Pravesh (examination of the Parishad) Passed.',
            'duration': '1 Year',
            'fee': 'Contact Academy',
            'affiliation': 'ABPCP',
            'order_index': 2,
        },
        {
            'title': 'Diploma in Naturopathy & Yogic Science',
            'short_name': 'DNYS',
            'description': 'Three and Half Years Course including six month\'s House Job. This comprehensive diploma program covers all aspects of Naturopathy and Yogic Science.',
            'eligibility': 'Senior Secondary (10+2) or Intermediate, or C.N.Y.T. (Formerly Upcharak), or One/Two year diploma in Naturopathy & Yoga from state or central Govt. recognised Institution, or Diploma in Naturopathy from Arogya Mandir Gorakpur. Medical Graduates (M.B.B.S., M.D., M.S., B.D.S., B.A.M.S., B.U.M.S., B.Pharma, Nursing degree) recognised by Govt. & registered with respective medical councils may enroll directly for DNYS IInd year course.',
            'duration': '3.5 Years (including 6 months House Job)',
            'fee': 'Contact Academy',
            'affiliation': 'ABPCP',
            'order_index': 3,
        },
        # GNAP Courses
        {
            'title': 'Chikitsa Sahayak Certificate',
            'short_name': 'CS',
            'description': 'This examination aims at training personnel who will assist the Naturopaths in their practice. The examination is held in two parts with a mandatory six-month gap. After passing, three months practical training is compulsory.',
            'eligibility': 'Matriculation/High School Examination or equivalent from a recognised Education Board. Minimum age: 18 years. Exception for persons with at least 10 years experience in Naturopathy with proficiency in Hindi.',
            'duration': 'Two Parts (6 months gap between parts) + 3 months practical training',
            'fee': 'Contact Academy',
            'affiliation': 'GNAP',
            'order_index': 1,
        },
        {
            'title': 'Diploma in Naturopathy and Yoga (NDDY)',
            'short_name': 'NDDY',
            'description': 'This diploma enables personnel to practice Naturopathy and Yoga strictly based on drugless Nature Cure principles. The three-year course is followed by compulsory practical training of six months. Structure: NDDY Previous (1st Year), NDDY Intermediate (2nd year), NDDY Final (3rd year).',
            'eligibility': 'As per Gandhi National Academy of Naturopathy guidelines.',
            'duration': '3 Years + 6 months practical training',
            'fee': 'Contact Academy',
            'affiliation': 'GNAP',
            'order_index': 2,
        },
        # Mess/Residential
        {
            'title': 'Residential Naturopathy Wellness Program',
            'short_name': 'RNWP',
            'description': 'Live-in wellness program at our Ashram where students experience authentic nature cure lifestyle, yoga practice, and naturopathic treatments alongside their studies.',
            'eligibility': 'Open to all enrolled students of the academy.',
            'duration': 'As per course duration',
            'fee': 'Mess + Accommodation charges applicable',
            'affiliation': 'MESS',
            'order_index': 1,
        },
        {
            'title': 'Yoga & Meditation Retreat',
            'short_name': 'YMR',
            'description': 'Short-term residential program focused on Yoga, Pranayama, and Meditation practices for overall wellness and spiritual growth.',
            'eligibility': 'Open to all. No prior experience required.',
            'duration': '7 Days / 15 Days / 1 Month',
            'fee': 'Contact Academy',
            'affiliation': 'MESS',
            'order_index': 2,
        },
        # Computer Courses
        {
            'title': 'Basic Computer Course',
            'short_name': 'BCC',
            'description': 'Foundational computer skills covering MS Office, internet basics, email, and digital literacy for everyday use.',
            'eligibility': 'No prior computer knowledge required.',
            'duration': '3 Months',
            'fee': 'Contact Academy',
            'affiliation': 'COMPUTER',
            'order_index': 1,
        },
        {
            'title': 'Advanced Computer Application',
            'short_name': 'ACA',
            'description': 'Advanced training in computer applications including MS Office suite, internet, email management, and basic accounting software.',
            'eligibility': 'Basic computer knowledge or BCC.',
            'duration': '6 Months',
            'fee': 'Contact Academy',
            'affiliation': 'COMPUTER',
            'order_index': 2,
        },
        {
            'title': 'DTP & Graphic Design',
            'short_name': 'DTP',
            'description': 'Desktop Publishing and basic graphic design using industry-standard tools for creating professional documents and designs.',
            'eligibility': 'Basic computer knowledge.',
            'duration': '3 Months',
            'fee': 'Contact Academy',
            'affiliation': 'COMPUTER',
            'order_index': 3,
        },
    ]
    for c in default_courses:
        if not Course.query.filter_by(title=c['title']).first():
            db.session.add(Course(**c))
    db.session.commit()
