from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, jwt
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)
    jwt.init_app(app)

    from routes.auth import auth_bp
    from routes.courses import courses_bp
    from routes.gallery import gallery_bp
    from routes.about import about_bp
    from routes.contact import contact_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(courses_bp, url_prefix='/api/courses')
    app.register_blueprint(gallery_bp, url_prefix='/api/gallery')
    app.register_blueprint(about_bp, url_prefix='/api/about')
    app.register_blueprint(contact_bp, url_prefix='/api/contact')

    with app.app_context():
        db.create_all()
        from models import Admin
        import bcrypt
        if not Admin.query.filter_by(username='admin').first():
            hashed = bcrypt.hashpw('admin123'.encode(), bcrypt.gensalt())
            admin = Admin(username='admin', password=hashed.decode())
            db.session.add(admin)
            db.session.commit()
            print("Default admin created: admin / admin123")

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5000)