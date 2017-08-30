from flask import Flask
import socket
import os
from routes import api
app = Flask(__name__)

app.config.update(
  PORT = os.environ.get('PORT') or 3000
)
ip = socket.gethostbyname(socket.gethostname())
app.register_blueprint(api, url_prefix = '/')

if __name__ == "__main__":
  app.run(host = ip, port = app.config['PORT'])