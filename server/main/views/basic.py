from flask import Blueprint, request, jsonify
from flask.ext.cors import CORS
from main.api_connectors.dropbox_connect import DropboxConnect

basic = Blueprint('basic', __name__)
CORS(basic)


@basic.route("/course_content")
def get_course_content():
	name = request.args.get("username")
	dropbox = DropboxConnect()
	course = "Full Week"

	return jsonify(data=dropbox.get_content_hierarchy("/"+course))

@basic.route("/get_file")
def get_file():
	filepath = request.args.get("filepath")
	dropbox = DropboxConnect()
	return jsonify(data={"filepath": dropbox.get_file(filepath)})
