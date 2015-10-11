from flask import Flask
from flask.ext.cors import CORS

app = Flask(__name__)
CORS(app)

from views.basic import basic

app.register_blueprint(basic)
