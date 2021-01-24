from pydantic import BaseModel


class Optometrist(BaseModel):
    name: str
    phone_number: str


optometrists = [
    {"name": "Pearle Vision", "phone_number": "8123329014"},
    {"name": "Brinegar Eye Care", "phone_number": "8123397995"},
    {"name": "Hoosier Eye Doctor", "phone_number": "8123332020"},
    {"name": "Precision Eye Group", "phone_number": "8123322020"},
]
