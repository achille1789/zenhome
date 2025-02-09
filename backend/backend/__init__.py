# Create App
import uvicorn
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.responses import PlainTextResponse

from backend.backend import routes

app = FastAPI(
    title="Zenhome Authentication Service",
    description="Authentication Service for Zenhome",
    contact={"name": "Zenhome Team", "email": "zenhome@gmail.com"},
    version="v0.0.1-dev",
)

app.include_router(router=routes.router)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return PlainTextResponse(str(exc), status_code=400)

if __name__ == "__main__":
    uvicorn.run(app)