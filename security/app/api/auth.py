from fastapi import APIRouter, HTTPException, status
from app.models import EmailRequest, OTPVerifyRequest, Token
from app.services.otp_service import generate_otp, verify_otp
from app.core.jwt_util import create_access_token

router = APIRouter()

@router.post("/send-otp")
async def send_otp(request: EmailRequest):
    generate_otp(request.email)
    return {"message": "OTP sent successfully (Check server console)"}

@router.post("/verify-otp", response_model=Token)
async def verify_otp_endpoint(request: OTPVerifyRequest):
    is_valid = verify_otp(request.email, request.otp)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired OTP",
        )
    
    access_token = create_access_token(data={"sub": request.email})
    return {"access_token": access_token, "token_type": "bearer"}
