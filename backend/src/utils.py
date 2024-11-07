from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# get database information from .env file
def get_db_info():
    db_info = {}
    db_info["user"] = os.getenv("POSTGRES_USER")
    db_info["password"] = os.getenv("POSTGRES_PASSWORD")
    db_info["database"] = os.getenv("POSTGRES_DB")
    db_info["host"] = os.getenv("POSTGRES_HOST")
    db_info["port"] = os.getenv("POSTGRES_PORT")
    return db_info

def get_google_info():
    google_info = {}
    google_info["client_id"] = os.getenv("GOOGLE_CLIENT_ID")
    google_info["client_secret"] = os.getenv("GOOGLE_CLIENT_SECRET")
    return google_info
