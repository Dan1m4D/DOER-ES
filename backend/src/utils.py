from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()


def get_db_info():
    db_info = {}
    db_info['user'] = os.getenv('POSTGRES_USER')
    db_info['password'] = os.getenv('POSTGRES_PASSWORD')
    db_info['database'] = os.getenv('POSTGRES_DB')
    db_info['host'] = os.getenv('POSTGRES_HOST')
    db_info['port'] = os.getenv('POSTGRES_PORT')
    return db_info