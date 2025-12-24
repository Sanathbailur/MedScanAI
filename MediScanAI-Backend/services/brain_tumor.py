import tensorflow as tf
import numpy as np
from utils.image_utils import preprocess_image

MODEL_PATH = "model/brain_tumor_model.h5"

CLASS_NAMES = ["Glioma", "Meningioma", "No Tumor", "Pituitary Tumor"]

DESCRIPTIONS = {
    "Glioma": {
        "description": "Gliomas start inside glial cells of the brain.",
        "risk": "May cause seizures, headaches, weakness.",
        "advice": "Consult neurologist or oncologist."
    },
    "Meningioma": {
        "description": "Tumor in brain covering layers.",
        "risk": "May compress brain tissue.",
        "advice": "Medical imaging required."
    },
    "No Tumor": {
        "description": "No tumor detected.",
        "risk": "No visible risk.",
        "advice": "Consult doctor if symptoms persist."
    },
    "Pituitary Tumor": {
        "description": "Affects hormone-regulating gland.",
        "risk": "Hormonal imbalance, vision issues.",
        "advice": "Consult endocrinologist."
    }
}

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Brain tumor model loaded")
except Exception as e:
    print("Model load error:", e)
    model = None


async def predict_brain_tumor(file):
    if model is None:
        return {"error": "Brain tumor model not loaded"}

    image_bytes = await file.read()
    img_array = preprocess_image(image_bytes)

    preds = model.predict(img_array, verbose=0).flatten()
    idx = int(np.argmax(preds))
    confidence = float(preds[idx] * 100)
    label = CLASS_NAMES[idx]

    if confidence < 40:
        final = "Invalid MRI – Cannot Detect"
    else:
        final = label

    return {
        "diagnosis_type": "Brain Tumor",
        "prediction": final,
        "label": label,
        "confidence": round(confidence, 2),
        "details": DESCRIPTIONS.get(label),
        "disclaimer": "For educational purposes only. Not medical diagnosis."
    }
