from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import tensorflow as tf
import numpy as np
from io import BytesIO
from PIL import Image

app = FastAPI()

# ---------- CORS ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Model Path ----------
MODEL_PATH = "model/brain_tumor_model.h5"

# ---------- Load Model ----------
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully!")
except Exception as e:
    print("Error loading model:", e)
    model = None

# ---------- CLASS ORDER (IMPORTANT) ----------
# NOTE: this must exactly match your training label order
CLASS_NAMES = ["Glioma", "Meningioma", "No Tumor", "Pituitary Tumor"]


# ---------- Preprocessing ----------
def preprocess_image(bytes_data):
    img = Image.open(BytesIO(bytes_data)).convert("RGB")
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array


# ---------- Prediction API ----------
@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    if model is None:
        return {"error": "Model failed to load. Fix MODEL_PATH."}

    try:
        bytes_data = await file.read()
        img_array = preprocess_image(bytes_data)

        preds = model.predict(img_array, verbose=0)
        preds = preds.flatten()

        idx = int(np.argmax(preds))
        confidence = float(preds[idx] * 100)
        label = CLASS_NAMES[idx]

        # ---------- Core Protection Logic ----------
        if confidence < 40:
            final = "Invalid MRI – Cannot Detect"
        
        # elif label == "No Tumor" and confidence < 75:
        #     final = "Uncertain — Please upload clearer MRI"
        
        else:
            final = label

        print(f"Prediction: {label}  |  Confidence: {confidence:.2f}%")

        return {
            "prediction": final,
            "label": label,
            "confidence": round(confidence, 2),
            "raw_output": preds.tolist(),
            "class_names": CLASS_NAMES
        }
    
    except Exception as e:
        return {"error": str(e)}


# ---------- Home ----------
@app.get("/")
def home():
    return {"message": "MediScan AI Backend Running Successfully!"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import tensorflow as tf
import numpy as np
from io import BytesIO
from PIL import Image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "model/brain_tumor_model.h5"

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully!")
except Exception as e:
    print("Error loading model:", e)
    model = None

CLASS_NAMES = ["Glioma", "Meningioma", "No Tumor", "Pituitary Tumor"]

DESCRIPTIONS = {
    "Glioma": {
        "description": "Gliomas start inside glial cells of the brain.",
        "risk": "May cause seizures, headaches, weakness.",
        "advice": "Meet neurologist or oncologist for proper diagnosis."
    },
    "Meningioma": {
        "description": "Meningiomas grow in brain covering layers.",
        "risk": "Can compress brain tissue if large.",
        "advice": "Requires medical assessment & imaging."
    },
    "No Tumor": {
        "description": "No tumor detected in your MRI.",
        "risk": "No visible risk.",
        "advice": "If symptoms persist, contact a doctor."
    },
    "Pituitary Tumor": {
        "description": "Pituitary regulating hormones is affected.",
        "risk": "Can affect hormones, vision, weight.",
        "advice": "Consult a specialist for further evaluation."
    }
}

def preprocess_image(bytes_data):
    img = Image.open(BytesIO(bytes_data)).convert("RGB")
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    if model is None:
        return {"error": "Model failed to load"}

    bytes_data = await file.read()
    img_array = preprocess_image(bytes_data)

    preds = model.predict(img_array, verbose=0).flatten()

    idx = int(np.argmax(preds))
    confidence = float(preds[idx] * 100)
    label = CLASS_NAMES[idx]

    if confidence < 40:
        final = "Invalid MRI – Cannot Detect"
    else:
        final = label

    return {
        "prediction": final,
        "label": label,
        "confidence": round(confidence, 2),
        "details": DESCRIPTIONS.get(label, {}),
        "raw_output": preds.tolist()
    }

@app.get("/")
def home():
    return {"message": "MediScan AI Backend Running Successfully!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
