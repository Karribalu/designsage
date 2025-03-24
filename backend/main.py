import uvicorn
import os
from fastapi import FastAPI
from dotenv import load_dotenv
from openai import OpenAI
from routers import webrtc
load_dotenv()
app = FastAPI(
    title="Design Sage",
    description="Design Sage is a tool that helps you design your website",
    version="0.1.0",
)
app.include_router(webrtc.router)
openai_service = OpenAI(api_key=os.getenv(
    "OPENAI_API_KEY"), base_url="https://api.x.ai/v1")


@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
