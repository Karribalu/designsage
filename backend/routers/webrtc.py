from fastapi import APIRouter
import os
import requests
router = APIRouter(
    prefix="/webrtc",
    tags=["webrtc"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def hello_world():
    return {"message": "Hello from WebRTC router"}


@router.get("/ephimeral-token")
async def get_ephimeral_token():
    url = os.getenv("OPEN_AI_BASE_URL") + \
        os.getenv("OPEN_AI_REALTIME_SESSIONS")
    params = {
        "method": "POST",
        "headers": {
            "Authorization": "Bearer " + os.getenv("OPENAI_API_KEY"),
            "Content-Type": "application/json"
        },
        "body": {
            "model": "gpt-4o-realtime-preview",
            "voice": "verse"
        }
    }
    response = requests.post(
        url, headers=params["headers"], json=params["body"])

    return response.json()
