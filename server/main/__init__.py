from flask import Flask

app = Flask(__name__)

from views.basic import basic

app.register_blueprint(basic)
