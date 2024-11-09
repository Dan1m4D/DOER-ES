from sqlalchemy import Boolean, Column, Integer, String, BigInteger
from .database import Base

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    tags = Column(String, default=None)
    description = Column(String)
    timestamp = Column(BigInteger)
    deadline = Column(String, default=None)
    priority = Column(String, default=None)
    status = Column(String, default="To Do")
    completed = Column(Boolean, default=False)
    user_email = Column(String)

    # timestamp on create
    
        

    
