from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "FloodWatch ML API is running"}