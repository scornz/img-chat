from flask import jsonify, Blueprint

root = Blueprint("root", __name__, url_prefix="/")


@root.route("/", methods=["GET"])
def _health_check():
    return jsonify(msg="Server is healthy.")
