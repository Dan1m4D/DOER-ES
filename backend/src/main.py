from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .models import Base
from .database import engine
from .endpoints import tasks_endpoints

# create app
app = FastAPI()

# create all tables
Base.metadata.create_all(bind=engine)


# CORS
origins = ["http://localhost:3000", "https://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include routers
app.include_router(tasks_endpoints.router, tags=["Tasks"], prefix="/task")

@app.get("/")
async def root():
    return {"message": "Hello World"}
