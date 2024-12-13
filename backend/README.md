# DOER backend
## Running the FastAPI + Uvicorn App

Follow these steps to set up and run the application using FastAPI and Uvicorn:

1. **Install Dependencies**:
   - Ensure you have Python installed and create a virtual environment:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows, use venv\\Scripts\\activate
     ```
   - Install the required dependencies from `requirements.txt`:
     ```bash
     pip install -r requirements.txt
     ```

2. **Run the Development Server**:
   - Start the Uvicorn server to run the FastAPI application:
     ```bash
     uvicorn app.main:app --reload
     ```
   - Replace `app.main:app` with the path to your application if it's different.

