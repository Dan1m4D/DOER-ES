from sqlalchemy import Boolean, Column, Integer, String, BigInteger
from .database import Base


class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    timestamp = Column(BigInteger)
    deadline = Column(BigInteger)
    priority = Column(String, default=None)
    status = Column(String, default="To Do")
    completed = Column(Boolean, default=False)
    user_email = Column(String)

    # string representation of the object
    def __repr__(self):
        return f"<Task: {self.title}, {self.timestamp}, {self.deadline}, {self.priority}, {self.status}, {self.completed}, {self.user_email}>"
