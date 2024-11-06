from database import get_db
from fastapi import APIRouter, HTTPException, Depends

router = APIRouter()

# dependency
db_dependency = Annotated(Session, default=get_db)