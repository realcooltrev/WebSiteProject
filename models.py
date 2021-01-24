from decimal import Decimal

from pydantic import BaseModel


class Contact(BaseModel):
    schedule: str
    brand: str
    style: str
    price: Decimal


class Optometrist(BaseModel):
    name: str
    phone_number: str
