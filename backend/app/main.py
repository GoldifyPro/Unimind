
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.ollama_client import get_model_response
from app.safety import check_crisis
from app.prompts import SYSTEM_PROMPT

app = FastAPI(title="UniMind Chat API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # For development, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    # Check if user is in crisis
    if check_crisis(req.message):
        return {
            "reply": (
                "I'm really sorry you're feeling this way. "
                "Please reach out to a trusted friend, family member, or campus counselor. "
                "Your safety matters."
            )
        }

    # Build prompt for the AI
    prompt = f"{SYSTEM_PROMPT}\nStudent: {req.message}\nUniMind:"

    # Get AI response
    response = get_model_response(prompt)

    # Return structured reply
    return {"reply": response}
