import numpy as np
from io import BytesIO
from PIL import Image

def preprocess_image(bytes_data, size=(224, 224)):
    img = Image.open(BytesIO(bytes_data)).convert("RGB")
    img = img.resize(size)
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array
