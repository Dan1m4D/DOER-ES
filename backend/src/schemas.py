from pydantic import BaseModel
from typing import Optional

class TaskBase(BaseModel):
    title: str
    description: str
    timestamp: int
    deadline: Optional[int] = None
    priority: Optional[str] = None
    status: Optional[str] = "To Do"
    completed: Optional[bool] = False

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    timestamp: Optional[int] = None
    updated_at: Optional[int] = None
    user_email: Optional[str] = None
    priority: Optional[str] = None
    deadline: Optional[int] = None
    status: Optional[str] = None
    completed: Optional[bool] = None
