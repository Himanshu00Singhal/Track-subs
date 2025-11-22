from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
import json
from app.models import Transaction, Subscription
from app.services.detector_logic import SubscriptionDetector
import os

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"status": "ok"}

@router.post("/analyze", response_model=List[Subscription])
async def analyze_transactions(file: UploadFile = File(...)):
    try:
        content = await file.read()
        data = json.loads(content)
        
        # Validate input
        transactions = [Transaction(**item).dict() for item in data]
        
        detector = SubscriptionDetector(transactions)
        subscriptions = detector.detect()
        
        return subscriptions
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/seed-data", response_model=List[Transaction])
async def get_seed_data():
    # Helper to serve the mock data for the frontend to use easily
    try:
        with open("mock_data.json", "r") as f:
            data = json.load(f)
        return data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Mock data not found")
