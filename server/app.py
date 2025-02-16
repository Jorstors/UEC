#!/usr/bin/python3

from flask import Flask, request
from PIL import Image
import requests
import os.path
import flask
import sys
import io

POSITIVE_CHARSET = ' .:-=+*#%@'
NEGATIVE_CHARSET = POSITIVE_CHARSET[::-1]

# Add image_to_ascii/ as a module search directory
try:
    sys.path.append(os.path.join(os.path.dirname(__file__), "image_to_ascii"))
    from converter import image_to_ascii
except ImportError as e:
    print("Failed to import image_to_ascii", e.with_traceback())
    sys.exit(1)

# Function to call the text-to-image generation endpoint
# Adapted from Janus demo code
def generate_images(prompt, seed=None, guidance=5.0):
    data = {
        'prompt': prompt,
        'seed': seed,
        'guidance': guidance
    }
    response = requests.post(generate_images_url, data=data, stream=True)
    
    if not response.ok:
        raise RuntimeError("Server returned an error")

    try:
        buffer = io.BytesIO()
        for chunk in response.iter_content(chunk_size=128*1024): # 128KiB
            if chunk:
                buffer.write(chunk)

        buffer.seek(0)
        image = Image.open(buffer)
        image.save(prompt + ".png")

    except Exception as e:
        raise RuntimeError("Error processing image", e)

app = Flask(__name__)

@app.route("/get-art")
def getArt():
    filename = request.args.get("prompt") + ".png"
    if filename is None:
        return "Invalid request: prompt is required"
    if not os.path.isfile(filename):
        generate_images(request.args["prompt"])

    s = request.args.get("size", 1, type=int)
    asc = image_to_ascii(filename, size=(s,s), charset=NEGATIVE_CHARSET)

    return asc

@app.route("/")
def m():
    return flask.send_file("../index.html")

@app.route("/public/<path:path>")
def public(path):
    return flask.send_from_directory("../public", path)

# Endpoint URL
generate_images_url = "http://localhost:8000/generate_images/"

# Example usage
if __name__ == "__main__":
    # Call the image generation API
    generate_images("A beautiful sunset over a mountain range, digital art.")
