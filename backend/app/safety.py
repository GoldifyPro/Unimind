CRISIS_KEYWORDS = [
    # Direct statements
    "kill myself",
    "killing myself",
    "suicide",
    "suicidal",
    "end my life",
    "take my life",
    "want to die",
    "wanna die",
    "no reason to live",
    "don't want to live",
    "dont want to live",
    "not worth living",
    "life is not worth",
    "life isn't worth",

    # Indirect / softer phrasing (like the example above)
    "better i die",
    "better to die",
    "better off dead",
    "better if i was dead",
    "better if i weren't here",
    "better if i wasn't here",
    "wish i was dead",
    "wish i were dead",
    "i should just die",
    "i might as well die",
    "i want to disappear",
    "i want to vanish",
    "no point in living",
    "no point being alive",
    "can't go on",
    "cannot go on",
    "can't do this anymore",
    "cannot do this anymore",
    "i give up on life",
    "done with life",
    "done with everything",
    "ready to give up",
    "i'd rather be dead",
    "i would rather be dead",

    # Swahili crisis phrases
    "nataka kufa",
    "ninataka kufa",
    "naumia sana",
    "maisha hayana maana",
    "bora niende",
    "bora niue",
    "nijiue",
    "kujiua",
    "sina sababu ya kuishi",
    "sijui kuendelea",
]

def check_crisis(message: str) -> bool:
    msg = message.lower()
    return any(keyword in msg for keyword in CRISIS_KEYWORDS)


def detect_language(message: str) -> str:
    swahili_keywords = [
        "nime", "nina", "nahisi", "maisha", "shida",
        "msongo", "masomo", "chuo", "nimechoka"
    ]
    msg = message.lower()
    if any(word in msg for word in swahili_keywords):
        return "sw"
    return "en"