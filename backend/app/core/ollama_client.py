import requests
from Unimind.backend.app.core.prompts import SYSTEM_PROMPT

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "llama3.2"

def get_model_response(history: list) -> str:
    """
    Improved memory handling:
    - Recent messages = conversation flow
    - Older messages = memory context
    """

    # --- Split memory ---
    recent_history = history[-6:]   # last 6 messages (active convo)
    older_history = history[:-6]    # older messages (memory)

    # --- Build memory text ---
    memory_text = ""
    if older_history:
        memory_lines = [
            f"{'User' if m['role']=='user' else 'Assistant'}: {m['content']}"
            for m in older_history
        ]
        memory_text = "\n".join(memory_lines)

    # --- Inject memory into system prompt ---
    system_with_memory = SYSTEM_PROMPT

    if memory_text:
        system_with_memory += f"""

Relevant past context (use if helpful, do not force):
{memory_text}
"""

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": system_with_memory},
            *recent_history
        ],
        "stream": False,
        "options": {
            "temperature": 0.3,
            "top_p": 0.9,
            "num_predict": 800,
            "num_ctx": 4096
        }
    }

    try:
        res = requests.post(OLLAMA_URL, json=payload, timeout=120)
        res.raise_for_status()
        return res.json()["message"]["content"]

    except requests.exceptions.RequestException as e:
        return f"Error: Could not reach Ollama server ({e})"