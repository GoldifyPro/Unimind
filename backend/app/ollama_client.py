import requests
from app.prompts import SYSTEM_PROMPT
from app.formatter import format_response

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "llama3.2"

def get_model_response(user_message: str) -> str:
    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message}
        ],
        "stream": False,
        "options": {
            "temperature": 0.3,
            "top_p": 0.9,
            "num_predict": 220
        }
    }

    try:
        res = requests.post(OLLAMA_URL, json=payload, timeout=120)
        res.raise_for_status()
        reply = res.json()["message"]["content"]
        # Format ONCE here, not again in main.py
        return format_response(reply)

    except requests.exceptions.RequestException as e:
        return f"Error: Could not reach Ollama server ({e})"