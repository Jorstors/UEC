from flask import Flask, request
import os.path
import flask
import sys

# Add image_to_ascii/ as a module search directory
sys.path.append(os.path.join(os.path.dirname(__file__), "image_to_ascii"))
from image_to_ascii.converter import image_to_ascii

app = Flask(__name__)

@app.route("/get-art")
def getArt():
    s = request.args.get("size", 1, type=int)
    img = image_to_ascii("bookworm-151738_640.png", size=(s,s), charset=' .:-=+*#%@')

    response = '<html>'
    if s < 100:
        response += '<head><script>setTimeout(function() {window.location.replace(window.location.href.split("?")[0] + "?size=' + str(s + 1) + '");}, 100);</script>'
    response += "<body style='background-color: black; color: white'><pre>" + img.replace("\n", "<br />") + "</pre></body></html>"
    return response

@app.route("/")
def m():
    return flask.send_file("../index.html")

@app.route("/public/<path:path>")
def public(path):
    return flask.send_from_directory("../public", path)
