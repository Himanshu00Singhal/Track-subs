from pydantic import BaseModel
from typing import List, Optional

class Transaction(BaseModel):
    id: str
    date: str
    description: str
    amount: float
    currency: str

class Subscription(BaseModel):
    merchant: str
    amount: float
    frequency: str
    next_due: Optional[str] = None
    confidence: str = "Manual"
    id: Optional[str] = None
