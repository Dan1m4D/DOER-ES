from pydentic import BaseModel

class Task(BaseModel):
    name: str
    description: str
    date: str
    status: str
    completed: bool
    
