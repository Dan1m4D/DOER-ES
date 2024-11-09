FROM python:3.12.7-alpine
WORKDIR /backend
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt
COPY ./src .
EXPOSE 8000
CMD ["uvicorn","src.main:app", "--host", "0.0.0.0", "--port", "8000","--reload"]