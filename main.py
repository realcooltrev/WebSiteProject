from typing import List
from decimal import Decimal

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from fake_db.contacts import Contact, contacts
from fake_db.optometrists import Optometrist, optometrists
from fake_db.states import states

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
