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

def detect_language(message: str) -> str:
    swahili_keywords = [
        "nime", "nina", "nahisi", "maisha", "shida",
        "msongo", "masomo", "chuo", "nimechoka"
    ]

    msg = message.lower()
    if any(word in msg for word in swahili_keywords):
        return "sw"
    return "en"
