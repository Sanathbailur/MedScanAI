import requests

HF_API_URL = "https://api-inference.huggingface.co/models/nateraw/skin-cancer-classification"
HF_TOKEN = "PASTE_YOUR_HUGGINGFACE_TOKEN_HERE"

headers = {
    "Authorization": f"Bearer {HF_TOKEN}"
}

async def predict_skin_cancer(file):
    image_bytes = await file.read()

    response = requests.post(
        HF_API_URL,
        headers=headers,
        data=image_bytes
    )

    return {
        "diagnosis_type": "Skin Cancer",
        "prediction_source": "HuggingFace",
        "result": response.json(),
        "disclaimer": "AI-based risk analysis only. Not medical diagnosis."
    }
