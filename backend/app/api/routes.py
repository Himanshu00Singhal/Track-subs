from fastapi import APIRouter, UploadFile, File, HTTPException, Body
from typing import List
import json
from app.models import Transaction, Subscription
from app.services.detector_logic import SubscriptionDetector
from app.services import store
import os

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"status": "ok"}

@router.post("/analyze", response_model=List[Subscription])
async def analyze_transactions(files: List[UploadFile] = File(...)):
    try:
        all_transactions = []
        for file in files:
            content = await file.read()
            data = json.loads(content)
            # Validate and extend
            transactions = [Transaction(**item).dict() for item in data]
            all_transactions.extend(transactions)
        
        detector = SubscriptionDetector(all_transactions)
        subscriptions = detector.detect()
        
        return subscriptions
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/manual-subscriptions", response_model=List[Subscription])
async def get_manual_subscriptions():
    return store.load_subscriptions()

@router.post("/manual-subscriptions", response_model=Subscription)
async def add_manual_subscription(sub: Subscription):
    return store.add_subscription(sub)

@router.delete("/manual-subscriptions/{merchant}")
async def delete_manual_subscription(merchant: str):
    store.delete_subscription(merchant)
    return {"status": "success"}

@router.get("/seed-data", response_model=List[Transaction])
async def get_seed_data():
    # Helper to serve the mock data for the frontend to use easily
    try:
        with open("mock_data.json", "r") as f:
            data = json.load(f)
        return data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Mock data not found")
