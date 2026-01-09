CRISIS_KEYWORD=[
    "kill myself",
    "suicide",
    "end my life",
    "want to die",
    "no reason to live"
]

def check_crisis(message: str)-> bool:
    msg=message.lower()
    return any(keyword in msg for keyword in CRISIS_KEYWORD)