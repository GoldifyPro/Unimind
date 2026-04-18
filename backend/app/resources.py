import json

with open("app/resources.json") as f:
    resources = json.load(f)

def get_resources(user_message: str):
    msg = user_message.lower()

    if "food" in msg:
        return [r for r in resources if r["type"] == "food"]

    elif "fee" in msg or "money" in msg:
        return [r for r in resources if r["type"] == "financial"]

    elif "stress" in msg or "depressed" in msg:
        return [r for r in resources if r["type"] == "mental_health"]

    return []