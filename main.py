from decimal import Decimal
from typing import List

from fastapi import FastAPI, status
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from fake_db import contacts, optometrists, states
from models import Contact, Optometrist, Order, ScheduleType

app = FastAPI()
app.mount("/home", StaticFiles(directory="static", html=True), name="static")


@app.get("/contacts", response_model=List[Contact])
async def get_all_contacts():
    return contacts


@app.get("/contacts/{schedule}", response_model=List[Contact])
async def get_daily_contacts(schedule: ScheduleType):
    return [contact for contact in contacts if contact['schedule'] == schedule]


@app.get("/optometrists", response_model=List[Optometrist])
async def all_optometrists():
    return optometrists


@app.get("/states", response_model=List[str])
async def get_all_states():
    return states


@app.post("/order/submit", status_code=status.HTTP_201_CREATED)
async def submit_order(order: Order):
    return order
