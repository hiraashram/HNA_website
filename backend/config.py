import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()  # ← load .env here too

class Config:
    DATABASE_URL = os.environ.get('DATABASE_URL', '')
    
    # Fix: Railway uses 'postgres://' but SQLAlchemy needs 'postgresql://'
    if DATABASE_URL.startswith('postgres://'):
        DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)
    
    SQLALCHEMY_DATABASE_URI = DATABASE_URL or 'postgresql://localhost/hna_academy'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'hna-secret-change-this')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)

    CLOUDINARY_CLOUD_NAME = os.environ.get('CLOUDINARY_CLOUD_NAME', '')
    CLOUDINARY_API_KEY = os.environ.get('CLOUDINARY_API_KEY', '')
    CLOUDINARY_API_SECRET = os.environ.get('CLOUDINARY_API_SECRET', '')
    WHATSAPP_NUMBER = os.environ.get('WHATSAPP_NUMBER', '918796309503')