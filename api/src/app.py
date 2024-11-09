from contextlib import asynccontextmanager
from datetime import datetime, timedelta

from typing import AsyncIterator
from typing_extensions import TypedDict

from fastapi import FastAPI, Form, status, Query
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

from services.database import JSONDatabase


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)

    # You may modify the return value as needed to support other functionality
    return status.HTTP_200_OK


# TODO: add another API route with a query parameter to retrieve quotes based on max age
@app.get("/quotebook")
def get_messages(max_age: str = Query("all")):
    """
    Retrieve quotes from the database with optional filtering by age.

    Args:
        max_age (str): Filter for the maximum age of quotes to retrieve. 
                       Options are "all", "week", "month", or "year".
                       Defaults to "all", which retrieves all quotes.

    Returns:
        dict: A list of quotes from the database. If max_age is specified, only
              quotes from within the specified timeframe are returned.
              The timeframes are:
              - "week": Past 7 days
              - "month": Past 30 days
              - "year": Past 365 days
    """

    time_now = datetime.now()

    age_map = {
        "week": timedelta(weeks=1),
        "month": timedelta(days=30),
        "year": timedelta(days=365),
    }

    if max_age != "all" and max_age in age_map:
        max_date = time_now - age_map[max_age]
        return [quote for quote in database["quotes"] if datetime.fromisoformat(quote["time"]) >= max_date]

    return database["quotes"]