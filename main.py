from fastapi import FastAPI, UploadFile
import pandas as pd
from .db import get_connection

app = FastAPI()

@app.get("/weather/{city}")
async def get_weather(city: str):
    conn = get_connection()
    query = "SELECT * FROM weather_data WHERE city = %s"
    df = pd.read_sql(query, conn, params=(city,))
    conn.close()
    return df.to_dict(orient="records")

@app.post("/upload/")
async def upload_weather_data(file: UploadFile):
    df = pd.read_csv(file.file)
    conn = get_connection()
    df.to_sql('weather_data', conn, if_exists='append', index=False)
    conn.close()
    return {"status": "Data ingested!"}
