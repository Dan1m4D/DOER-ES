from .utils import get_google_info
from fastapi import HTTPException
from functools import wraps
import google.oauth2.id_token
from google.auth.transport import requests

def validate_token(access_token):
    google_client_id = get_google_info().get("client_id")
    try:
        idinfo = google.oauth2.id_token.verify_oauth2_token(
            access_token, requests.Request(), google_client_id
        )
        return idinfo
    except ValueError:
        raise HTTPException(status_code=401, detail=f"Invalid token -> {access_token}")


def authenticated():
    """Decorator to check if a user is authenticated"""

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):

            request = kwargs.get("request", None)
            #access_token = request.cookies.get("access_token")
            access_token = request.headers.get("Credential")
            print("====================================================================================================")
            print("request ",request)
            print("access_token ",access_token)
            print("====================================================================================================")

            if not access_token:
                raise HTTPException(
                    status_code=401,
                    detail={
                        "message": "Unauthorized, you must be logged in to access this resource"
                    },
                )

            return func(*args, **kwargs)
        
        return wrapper
    
    return decorator