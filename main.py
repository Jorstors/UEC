import os.path
import sys

# Add image_to_ascii/ as a module search directory
sys.path.append(os.path.join(os.path.dirname(__file__), "image_to_ascii"))
from image_to_ascii.converter import image_to_ascii

print(image_to_ascii("./bookworm-151738_640.png", size=(50,50), charset=' .:-=+*#%@'[::-1]))
