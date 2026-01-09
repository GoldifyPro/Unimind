import requests
import json

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "mistral"

def get_model_response(prompt: str) -> str:
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False   
    }

    res = requests.post(OLLAMA_URL, json=payload, timeout=120)
    res.raise_for_status()

    text = res.json().get("response", "")
    
    # Clean formatting
    text = text.strip()
    text = "\n".join(line.strip() for line in text.splitlines() if line.strip())

    return text