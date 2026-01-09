from fastapi import FastAPI
from app.ollama_client import get_model_response
from app.safety import check_crisis
from app.prompts import SYSTEM_PROMPT

app=FastAPI(title='UniMind Chat API')

@app.get('/health')
def health():
    return {'status': 'ok'}

@app.post('/chat')
def chat(message:str):
    criss=check_crisis(message)
    if criss:
        return{
            "reply": "I'm really sorry you're feeling this way. Please reach out to a trusted friend, family member, or campus counselor. Your safety matters."
        }
    
    prompt=f'{SYSTEM_PROMPT}\nStudent: {message}\nUniMind:'
    response=get_model_response(prompt)
    return {'reply': response}