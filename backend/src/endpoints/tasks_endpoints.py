from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth import authenticated, validate_token
from ..repositories.tasks_repo import get_tasks, create_task, get_task
from ..schemas import TaskCreate, TaskUpdate
from ..models import Task
from typing import List


router = APIRouter()


@router.get("")
@authenticated()
def get_all_tasks(request: Request, db: Session = Depends(get_db)):
    # get request access_token
    access_token = request.cookies.get("access_token")

    # validate token
    idinfo = validate_token(access_token)

    # get user email
    user_email = idinfo.get("email")

    # get all tasks
    tasks = get_tasks(db, user_email)
    print("===========================================================")
    print(tasks)
    print("===========================================================")

    return tasks


@router.post("")
@authenticated()
async def create_new_task(
    task: TaskCreate, request: Request, db: Session = Depends(get_db)
):
    # get request access_token
    access_token = request.cookies.get("access_token")

    # validate token
    idinfo = validate_token(access_token)

    # get user email
    user_email = idinfo.get("email")

    # create new task
    new_task = create_task(db, task, user_email)

    return JSONResponse(content=new_task.dict(), status_code=201)
