from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth import authenticated, validate_token
from ..repositories.tasks_repo import (
    get_tasks,
    create_task,
    get_task,
    delete_task,
    update_task,
)
from ..schemas import TaskCreate, TaskUpdate
from ..models import Task
from typing import List


router = APIRouter()


@router.get("")
@authenticated()
def get_all_tasks(
    request: Request,
    db: Session = Depends(get_db),
    sort_by: str = "Creation",
    order_by: str = "asc",
    status_by: str = "",
    priority_by: str = "",
):
    """
    Retrieve a list of tasks for the authenticated user, with sorting and filtering options.

    - **sort_by**: The field to sort tasks by. Possible values: "Creation", "Deadline", "Priority", "Status", "Name".
    - **order_by**: The order of sorting. Possible values: "asc" or "desc".
    - **status_by**: Filter tasks by status (e.g., "Completed", "To Do", "In Progress", "Done").
    - **priority_by**: Filter tasks by priority (e.g., "Low", "Medium", "High", "Highest").

    Returns a list of tasks sorted and filtered as per the given criteria.
    """
    # get request access_token
    #access_token = request.cookies.get("access_token")
    access_token = request.headers.get("Credential")

    # validate token
    idinfo = validate_token(access_token)

    # get user email
    user_email = idinfo.get("email")

    # get all tasks
    tasks = get_tasks(db, user_email)

    # sort tasks
    if sort_by == "Creation":
        tasks = sorted(
            tasks,
            key=lambda x: x.timestamp,
            reverse=True if order_by == "desc" else False,
        )
    elif sort_by == "Deadline":
        tasks = sorted(
            tasks,
            key=lambda x: x.deadline,
            reverse=True if order_by == "desc" else False,
        )
    elif sort_by == "Priority":
        priority_order = {"Low": 1, "Medium": 2, "High": 3, "Highest": 4}
        tasks = sorted(
            tasks,
            key=lambda x: priority_order.get(x.priority, 0),
            reverse=True if order_by == "desc" else False,
        )
    elif sort_by == "Status":
        status_order = {"To Do": 1, "In Progress": 2, "Done": 3}
        tasks = sorted(
            tasks,
            key=lambda x: (status_order.get(x.status, 0), x.completed or False),
            reverse=True if order_by == "desc" else False,
        )
    elif sort_by == "Name":
        tasks = sorted(
            tasks,
            key=lambda x: x.title,
            reverse=False if order_by == "desc" else True,
        )


    # filter tasks
    if status_by == "Completed":
        tasks = [task for task in tasks if task.completed]
    elif status_by:
        tasks = [task for task in tasks if task.status == status_by]
    
    if priority_by:
        tasks = [task for task in tasks if task.priority == priority_by]

    return tasks


@router.post("")
@authenticated()
def create_new_task(task: TaskCreate, request: Request, db: Session = Depends(get_db)):
    """
    Create a new task for the authenticated user.

    - **task**: A task creation schema containing the task's title, description, deadline, priority, etc.

    Returns a success message upon successful task creation.
    """
    # get request access_token
    #access_token = request.cookies.get("access_token")
    access_token = request.headers.get("Credential")
    # validate token
    idinfo = validate_token(access_token)
    # get user email
    user_email = idinfo.get("email")

    # create new task
    create_task(db, task, user_email)

    return JSONResponse(content="Task created succesfully", status_code=201)


@router.delete("/{task_id}")
@authenticated()
def delete_task_(task_id: int, request: Request, db: Session = Depends(get_db)):
    """
    Delete a specific task by its ID for the authenticated user.

    - **task_id**: The ID of the task to delete.

    Returns a success message if the task is successfully deleted, or a 403 error if the user is not authorized to delete the task.
    """
    # get request access_token
    #access_token = request.cookies.get("access_token")
    access_token = request.headers.get("Credential")
    # validate token
    idinfo = validate_token(access_token)

    # get user email
    user_email = idinfo.get("email")

    # get task
    task = get_task(db, task_id, user_email)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if delete_task(db, task_id, user_email):
        return JSONResponse(content="Task deleted succesfully", status_code=200)
    else:
        return HTTPException(
            status_code=403, detail="Not authorized to delete this task"
        )


@router.put("/{task_id}")
@authenticated()
def update_task_(
    task_id: int, task: TaskUpdate, request: Request, db: Session = Depends(get_db)
):
    """
    Update an existing task by its ID for the authenticated user.

    - **task_id**: The ID of the task to update.
    - **task**: A task update schema containing the updated information for the task.

    Returns a success message upon successful task update.
    """
    # get request access_token
    #access_token = request.cookies.get("access_token")
    access_token = request.headers.get("Credential")

    # validate token
    idinfo = validate_token(access_token)

    # get user email
    user_email = idinfo.get("email")

    # get task
    old_task = get_task(db, task_id, user_email)

    if not old_task:
        raise HTTPException(status_code=404, detail="Task not found")

    # update task
    update_task(db, task_id, task)
    return JSONResponse(content="Task updated succesfully", status_code=200)

@router.get("/status")
@authenticated()
def get_status_list(request: Request):
    """
    Retrieve the list of possible task statuses.

    Returns a list of statuses: ["To Do", "In Progress", "Done"].
    """
    return JSONResponse(content=["To Do", "In Progress", "Done"], status_code=200)


@router.get("/priority")
@authenticated()
def get_priority_list(request: Request):
    """
    Retrieve the list of possible task priorities.

    Returns a list of priorities: ["Low", "Medium", "High", "Highest"].
    """
    return JSONResponse(content=["Low", "Medium", "High", "Highest"], status_code=200)
