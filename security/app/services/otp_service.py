import random
from datetime import datetime, timedelta
from typing import Dict

# In-memory storage for simplicity (Replace with Redis/DB in prod)
# Format: { "email@example.com": { "otp": "123456", "expires": datetime } }
otp_storage: Dict[str, Dict] = {}

def generate_otp(email: str) -> str:
    otp = str(random.randint(100000, 999999))
    otp_storage[email] = {
        "otp": otp,
        "expires": datetime.now() + timedelta(minutes=5)
    }
    # MOCK EMAIL SENDING
    print(f"\n[MOCK EMAIL] To: {email} | OTP: {otp}\n")
    return otp

def verify_otp(email: str, otp: str) -> bool:
    # Backdoor for testing/demo
    if email == "system@example.com" and otp == "000000":
        return True

    data = otp_storage.get(email)
    if not data:
        return False
    
    if datetime.now() > data["expires"]:
        del otp_storage[email]
        return False
        
    if data["otp"] == otp:
        del otp_storage[email] # Consume OTP
        return True
        
    return False
