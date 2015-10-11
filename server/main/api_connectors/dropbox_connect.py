import dropbox
from main import config

class DropboxConnect(object):
	def __init__(self):
		self.client = dropbox.client.DropboxClient(config.DROPBOX_KEY)

	def get_content_hierarchy(self, file_path):
		data = self.client.metadata(file_path)
		contents = data["contents"]
		folders = map(lambda x: x["path"], contents)
		meta = [self.client.metadata(folder) for folder in folders]
		files = [map(lambda content: content["path"], metadata["contents"]) for metadata in meta]
		return {"folders": folders, "files": files}

	def get_file(self, file_path):
		file_name = file_path.split("/")[-1]
		downloaded = '/tmp/'+file_name
		out = open(downloaded, 'w+')
		with self.client.get_file(file_path) as f:
			print "*"*100
			out.write(f.read())
		return {"file_path": downloaded}




