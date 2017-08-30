from flask import Blueprint, request, Response, stream_with_context
import words

api = Blueprint('textGenerator', __name__)

@api.route("/", methods=['POST'])
def generate():
  # print(words.generateText())
  result = words.generateText()
  return ' '.join(result)

@api.route("/", methods=['GET'])
def hello():
  return "Hello World!"
