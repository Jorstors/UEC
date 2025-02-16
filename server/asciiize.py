import os.path
from PIL import ImageFont
import sys

# Add image_to_ascii/ as a module search directory
sys.path.append(os.path.join(os.path.dirname(__file__), "image_to_ascii"))
from image_to_ascii.converter import image_to_ascii, ascii_to_image

ascii_art = image_to_ascii('logo.png', size=(120,120), charset=' .:-=+*#%@')
ascii_art_image = ascii_to_image(ascii_art, ImageFont.truetype("consola.ttf"))
ascii_art_image.save('logo_ascii.png')

