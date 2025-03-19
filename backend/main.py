import uvicorn
from fastapi import FastAPI


app = FastAPI(
    title="Design Sage",
    description="Design Sage is a tool that helps you design your website",
    version="0.1.0",
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
