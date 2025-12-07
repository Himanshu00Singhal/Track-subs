import json
import os
from typing import List, Dict
from app.models import Subscription

DATA_FILE = "manual_subscriptions.json"

def load_subscriptions() -> List[Dict]:
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []

def save_subscriptions(subscriptions: List[Dict]):
    with open(DATA_FILE, "w") as f:
        json.dump(subscriptions, f, indent=2)

def add_subscription(sub: Subscription):
    subs = load_subscriptions()
    # Simple ID generation if not present (though frontend might send one)
    sub_dict = sub.dict()
    if not any(s['merchant'] == sub.merchant for s in subs): # Prevent exact duplicates for simplicity
        subs.append(sub_dict)
        save_subscriptions(subs)
    return sub_dict

def delete_subscription(merchant_name: str):
    subs = load_subscriptions()
    subs = [s for s in subs if s['merchant'] != merchant_name]
    save_subscriptions(subs)
