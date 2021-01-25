from decimal import Decimal
from typing import List

from pydantic import BaseModel, EmailStr, Field


class Address(BaseModel):
    street_line_1: str
    street_line_2: str
    city: str
    state: str
    zip_code: str


class Contact(BaseModel):
    schedule: str
    brand: str
    style: str
    price: Decimal


class Customer(BaseModel):
    first_name: str
    last_name: str
    email_address: EmailStr


class Optometrist(BaseModel):
    name: str
    phone_number: str


class Prescription(BaseModel):
    right_eye: int
    left_eye: int


class Order_Item(BaseModel):
    purchased_item: Contact
    quantity: int
    prescription: Prescription


class Shopping_Cart(BaseModel):
    items: List[Order_Item]


class Order(BaseModel):
    customer: Customer
    address: Address
    purchased_items: Shopping_Cart
