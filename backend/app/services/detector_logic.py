import json
from datetime import datetime, timedelta
from typing import List, Dict, Any
import re

class SubscriptionDetector:
    def __init__(self, transactions: List[Dict[str, Any]]):
        self.transactions = transactions
        self.subscriptions = []

    def normalize_merchant(self, description: str) -> str:
        """
        Normalizes transaction descriptions to identify the merchant.
        Removes common noise words and numbers.
        """
        desc = description.upper()
        
        # Specific overrides for known Indian merchants
        if "NETFLIX" in desc: return "Netflix"
        if "SPOTIFY" in desc: return "Spotify"
        if "HOTSTAR" in desc: return "Hotstar"
        if "JIO" in desc: return "Jio"
        if "BESCOM" in desc: return "Bescom"
        if "SWIGGY" in desc: return "Swiggy"
        if "ZOMATO" in desc: return "Zomato"
        if "UBER" in desc: return "Uber"
        
        # General cleanup if not matched above
        # Remove "UPI", "AUTOPAY", numbers, special chars
        clean = re.sub(r'UPI|AUTOPAY|MANDATE|\d+|[^\w\s]', '', desc).strip()
        return clean if clean else desc

    def detect(self) -> List[Dict[str, Any]]:
        """
        Main logic to detect subscriptions.
        """
        grouped = {}
        
        # 1. Group by Merchant
        for tx in self.transactions:
            merchant = self.normalize_merchant(tx['description'])
            if merchant not in grouped:
                grouped[merchant] = []
            grouped[merchant].append(tx)

        # 2. Analyze each group
        for merchant, txs in grouped.items():
            # Sort by date
            txs.sort(key=lambda x: datetime.strptime(x['date'], "%Y-%m-%d"))
            
            is_subscription = False
            frequency = "Unknown"
            amount = txs[-1]['amount'] # Take latest amount
            next_due = None

            # Rule: Explicit Keywords
            # Check if ANY transaction for this merchant has keywords
            if any(re.search(r'AUTOPAY|MANDATE', t['description'].upper()) for t in txs):
                is_subscription = True
                frequency = "Auto-Pay"
                # Estimate next due date based on last tx
                last_date = datetime.strptime(txs[-1]['date'], "%Y-%m-%d")
                next_due = (last_date + timedelta(days=30)).strftime("%Y-%m-%d") # Assume monthly for autopay default

            # Rule: Time Delta Analysis
            if len(txs) >= 2:
                dates = [datetime.strptime(t['date'], "%Y-%m-%d") for t in txs]
                intervals = []
                for i in range(len(dates) - 1):
                    diff = (dates[i+1] - dates[i]).days
                    intervals.append(diff)
                
                # Check for Monthly (28-31 days)
                is_monthly = all(28 <= i <= 32 for i in intervals)
                
                # Check for Yearly (360-370 days)
                is_yearly = all(360 <= i <= 370 for i in intervals)

                if is_monthly:
                    is_subscription = True
                    frequency = "Monthly"
                    next_due = (dates[-1] + timedelta(days=30)).strftime("%Y-%m-%d")
                elif is_yearly:
                    is_subscription = True
                    frequency = "Yearly"
                    next_due = (dates[-1] + timedelta(days=365)).strftime("%Y-%m-%d")

            # Filter out known noise if not strictly periodic
            # Swiggy/Zomato/Uber are usually noise unless they match strict monthly intervals (e.g. Swiggy One)
            if merchant in ["Swiggy", "Zomato", "Uber"] and not is_subscription:
                continue

            if is_subscription:
                self.subscriptions.append({
                    "merchant": merchant,
                    "amount": amount,
                    "frequency": frequency,
                    "next_due": next_due,
                    "confidence": "High" if "Auto-Pay" in frequency or len(txs) > 2 else "Medium"
                })

        return self.subscriptions
