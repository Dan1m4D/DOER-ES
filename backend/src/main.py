from fastapi import FastAPI, HTTPException, Depends
from pydentic import BaseModel
from typing import List, Annotated

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}