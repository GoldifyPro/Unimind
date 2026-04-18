import requests
from app.core.prompts import SYSTEM_PROMPT

OLLAMA_URL  = "http://localhost:11434/api/chat"
MODEL_NAME  = "llama3.2"


def get_model_response(history: list) -> str:
    """
    Send conversation history to Ollama and return the AI reply.

    Memory strategy:
    - Last 6 messages  → active conversation (full context)
    - Older messages   → summarised into system prompt as memory
    """

    recent_history = history[-6:]
    older_history  = history[:-6]

    # Build memory block from older messages
    memory_text = ""
    if older_history:
        memory_lines = [
            f"{'User' if m['role'] == 'user' else 'Assistant'}: {m['content']}"
            for m in older_history
        ]
        memory_text = "\n".join(memory_lines)

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

    except requests.exceptions.ConnectionError:
        return (
            "I'm having a moment of quiet — my thinking engine isn't reachable right now. "
            "Please try again in a few seconds. "
            "If you're in distress, please reach out to a crisis line."
        )
    except requests.exceptions.RequestException as e:
        return f"Something went wrong on my end. Please try again. ({str(e)[:60]})"


def check_ollama_health() -> bool:
    """Returns True if Ollama is running and reachable."""
    try:
        res = requests.get("http://localhost:11434/api/tags", timeout=5)
        return res.status_code == 200
    except Exception:
        return False