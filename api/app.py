from flask import jsonify
import os

from api import create_app

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

app = create_app(ENVIRONMENT)


@app.route("/status", methods=["GET"])
def index():
    return jsonify(status="API is Up!")


