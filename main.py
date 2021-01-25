from decimal import Decimal
from typing import List

from fastapi import FastAPI, status
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from fake_db import contacts, optometrists, states
from models import Contact, Optometrist, Order

app = FastAPI()
app.mount("/home", StaticFiles(directory="static", html=True), name="static")


@app.get("/contacts", response_model=List[Contact])
async def all_contacts():
    return contacts


@app.get("/optometrists", response_model=List[Optometrist])
async def all_optometrists():
    return optometrists


@app.get("/states", response_model=List[str])
async def all_states():
    return states


@app.post("/order/submit", status_code=status.HTTP_201_CREATED)
async def submit_order(order: Order):
    return order
