from flask import Blueprint, jsonify
import os

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/info', methods=['GET'])
def get_contact_info():
    return jsonify({
        'whatsapp': os.environ.get('WHATSAPP_NUMBER', '918796309503'),
        'address': '121 new Gandhi Nagar, Nehru Nagar 3, Ghaziabad - 201001, Uttar Pradesh',
        'email': 'info@hnaacademy.com',
        'phone': '+91-8796309503',
    })
