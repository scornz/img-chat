from flask import Flask, Blueprint

# This will register all routes
def register_routes(app: Flask):
    from .root import root
    from .generate import generate_bp

    # Register all API routes under this blueprint
    api = Blueprint("api", __name__)

    app.register_blueprint(root)
    app.register_blueprint(api)
    app.register_blueprint(generate_bp)
