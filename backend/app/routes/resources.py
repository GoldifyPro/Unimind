from fastapi import APIRouter, HTTPException
from app.data.resources_data import RESOURCES, public_resource

router = APIRouter(prefix="/api/resources", tags=["Resources"])


@router.get("/")
def get_all():
    return {"resources": [public_resource(r) for r in RESOURCES]}


@router.get("/sos")
def get_sos():
    """Always-available, no auth required."""
    return {
        "message": "You are not alone. Help is available right now.",
        "resources": [
            {"name": "National Crisis Helpline", "contact": "116",          "available": "24/7"},
            {"name": "Crisis Text Line",         "contact": "Text HOME to 741741", "available": "24/7"},
            {"name": "Emergency Services",       "contact": "112",          "available": "24/7"},
        ]
    }


@router.get("/category/{category}")
def get_by_category(category: str):
    filtered = [public_resource(r) for r in RESOURCES if r["category"] == category]
    return {"resources": filtered}


@router.get("/{resource_id}")
def get_one(resource_id: str):
    resource = next((r for r in RESOURCES if r["id"] == resource_id), None)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    return public_resource(resource)