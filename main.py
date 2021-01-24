from decimal import Decimal
from typing import List

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from fake_db import contacts, optometrists, states
from models import Contact, Optometrist

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
