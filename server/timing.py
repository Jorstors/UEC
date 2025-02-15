from flask import Flask, request
import webbrowser
import os.path
import time
import sys

# Add image_to_ascii/ as a module search directory
sys.path.append(os.path.join(os.path.dirname(__file__), "image_to_ascii"))
from image_to_ascii.converter import image_to_ascii

start = time.time()

for s in range(1, 100):
    img = image_to_ascii("bookworm-151738_640.png", size=(s,s), charset=' .:-=+*#%@')

end = time.time()
print(f"Finished in {end - start}s")
