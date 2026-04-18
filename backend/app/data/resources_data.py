"""
Static mental health resource list.
Matches the 6 cards shown on the frontend Resources page.
"""

RESOURCES = [
    {
        "id": "university-counseling",
        "name": "University Counseling",
        "description": "Free confidential sessions with campus therapists",
        "category": "counseling",
        "keywords": ["counseling", "therapist", "therapy", "help", "support", "mental health"],
        "action_type": "call",
        "action_label": "Tap to Call",
        "contact": "tel:+255-000-000-000",   # ← replace with real number
        "url": None,
        "is_pro": False,
        "icon": "graduation-cap"
    },
    {
        "id": "national-crisis-helpline",
        "name": "National Crisis Helpline",
        "description": "24/7 support for mental health emergencies",
        "category": "crisis",
        "keywords": ["crisis", "suicide", "emergency", "danger", "harm", "die", "dying"],
        "action_type": "call",
        "action_label": "Tap to Call",
        "contact": "tel:116",
        "url": None,
        "is_pro": False,
        "icon": "phone"
    },
    {
        "id": "student-support-groups",
        "name": "Student Support Groups",
        "description": "Peer-led support circles every Wednesday",
        "category": "community",
        "keywords": ["lonely", "alone", "isolated", "friends", "community", "group", "belong"],
        "action_type": "learn",
        "action_label": "Learn More",
        "contact": None,
        "url": "/resources/support-groups",
        "is_pro": False,
        "icon": "users"
    },
    {
        "id": "mindfulness-premium",
        "name": "Mindfulness Premium",
        "description": "Guided meditations & sleep stories",
        "category": "premium",
        "keywords": ["sleep", "meditat", "calm", "relax", "breathe", "stress", "anxiety"],
        "action_type": "learn",
        "action_label": "Learn More",
        "contact": None,
        "url": "/resources/mindfulness",
        "is_pro": True,
        "icon": "leaf"
    },
    {
        "id": "therapy-matching",
        "name": "Therapy Matching",
        "description": "Find the right therapist for you",
        "category": "therapy",
        "keywords": ["therapist", "therapy", "professional", "psychiatrist", "counselor"],
        "action_type": "learn",
        "action_label": "Learn More",
        "contact": None,
        "url": "/resources/therapy-matching",
        "is_pro": True,
        "icon": "handshake"
    },
    {
        "id": "emergency-support",
        "name": "Emergency Support",
        "description": "Immediate help — crisis resources",
        "category": "emergency",
        "keywords": ["emergency", "urgent", "now", "immediately", "help me", "sos"],
        "action_type": "learn",
        "action_label": "Get Immediate Help",
        "contact": None,
        "url": "/sos",
        "is_pro": False,
        "icon": "warning"
    }
]


def match_resources(message: str, max_results: int = 2) -> list:
    """
    Return up to `max_results` resources whose keywords appear in the message.
    Called from the chat route to append relevant resources to AI replies.
    """
    message_lower = message.lower()
    matched = []
    for resource in RESOURCES:
        if any(kw in message_lower for kw in resource["keywords"]):
            matched.append(resource)
        if len(matched) == max_results:
            break
    return matched


def public_resource(r: dict) -> dict:
    """Strip internal-only fields before sending to frontend."""
    return {k: v for k, v in r.items() if k != "keywords"}