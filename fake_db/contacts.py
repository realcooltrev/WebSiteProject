from decimal import Decimal

from pydantic import BaseModel


class Contact(BaseModel):
    schedule: str
    brand: str
    style: str
    price: Decimal


contacts = [
    {
        "schedule": "daily", "brand": "Acuvue", "style": "Moist", "price": 56
    },
    {
        "schedule": "daily", "brand": "Alcon", "style": "AquaComfort Plus", "price": 52
    },
    {
        "schedule": "daily", "brand": "Bausch + Lomb", "style": "ONEDay", "price": 45
    },
    {
        "schedule": "daily", "brand": "CooperVision", "style": "Clarity", "price": 60
    },
    {
        "schedule": "weekly", "brand": "Acuvue", "style": "Oasys", "price": 60
    },
    {
        "schedule": "weekly", "brand": "Bausch + Lomb", "style": "SofLens", "price": 58
    },
    {
        "schedule": "weekly", "brand": "CooperVision", "style": "Avaira", "price": 56
    },
    {
        "schedule": "monthly", "brand": "Acuvue", "style": "Vita", "price": 52
    },
    {
        "schedule": "monthly", "brand": "Alcon", "style": "Air Optix", "price": 48
    },
    {
        "schedule": "monthly", "brand": "Bausch + Lomb", "style": "Ultra", "price": 42
    },
    {
        "schedule": "monthly", "brand": "CooperVision", "style": "Biofininity", "price": 52
    }
]
