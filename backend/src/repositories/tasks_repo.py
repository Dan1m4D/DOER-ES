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

def get_task(db: Session, task_id: int, user_email: str) -> Task:
    query = db.query(Task).filter(Task.id == task_id)
    task = query.first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    if task.user_email != user_email:
        raise HTTPException(status_code=403, detail="Not authorized to access this task")

    return task

def get_tasks(db: Session, user_email: str):
    return db.query(Task).filter(Task.user_email == user_email).all()

def update_task(db: Session, task_id: int, task: TaskUpdate) -> Task:
    task_to_update = db.query(Task).filter(Task.id == task_id).first()

    if task_to_update is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    
    task_to_update.title = task.title
    task_to_update.description = task.description
    task_to_update.status = task.status
    task_to_update.priority = task.priority
    task_to_update.deadline = int(task.deadline)
    task_to_update.timestamp = task.timestamp
    task_to_update.updated_at = task.updated_at
    task_to_update.completed = task.completed

    print("====================================================================================================")
    print(task_to_update)
    print("====================================================================================================")

    db.commit()
    db.refresh(task_to_update)
    return task_to_update

def delete_task(db: Session, task_id: int, user_email: str) -> bool:
    task_to_delete = db.query(Task).filter(Task.id == task_id).first()    
    if task_to_delete is None:
        return False

    if task_to_delete.user_email != user_email:
        return False

    db.delete(task_to_delete)
    db.commit()
    return True