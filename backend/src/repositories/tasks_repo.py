from sqlalchemy.orm import Session
from fastapi import HTTPException

from ..models import Task
from ..schemas import TaskCreate, TaskUpdate

def create_task(db: Session, task: TaskCreate, user_email) -> Task:

    new_task = Task(
        title=task.title,
        description=task.description,
        status=task.status,
        priority=task.priority,
        deadline=int(task.deadline),  # Ensure this is an integer
        user_email=user_email,
        timestamp=task.timestamp,
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

def get_task(db: Session, task_id: int) -> Task:
    return db.query(Task).filter(Task.id == task_id).first()

def get_tasks(db: Session, user_email: str):
    return db.query(Task).filter(Task.user_email == user_email).all()

def update_task(db: Session, task_id: int, task: TaskUpdate) -> Task:
    task_to_update = db.query(Task).filter(Task.id == task_id).first()
    for key, value in task.model_dump(exclude_unset=True).items():
        setattr(task_to_update, key, value)
    db.commit()
    db.refresh(task_to_update)
    return task_to_update