# Subscription Management Dashboard (India)

A full-stack application to detect and manage subscriptions from bank transaction history, tailored for the Indian market.

## Tech Stack
- **Backend**: Python (FastAPI)
- **Frontend**: React (Vite) + Tailwind CSS
- **Database**: SQLite (Simulated via JSON for now)

## Directory Structure
```
/backend
  /app
    /api        # API Endpoints
    /services   # Detection Logic (The Brain)
  main.py       # Entry Point
  mock_data.json # Seed Data
/frontend
  /src
    /components # UI Components
```

## How to Run

### Option 1: The Easy Way (Recommended)
Run the all-in-one startup script:
```bash
./run_services.sh
```
This will start:
- **Backend** (Port 8000)
- **Security Service** (Port 8001)
- **Frontend** (Port 5173) - Exposed on `0.0.0.0` for external access (e.g., ngrok).

### Option 2: Manual Startup
1. **Backend**:
   ```bash
   cd backend
   python main.py
   ```
2. **Security Service**:
   ```bash
   cd security
   python main.py
   ```
3. **Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

## Login Credentials
- **Standard Flow**: Enter any email -> Check terminal for OTP -> Enter OTP.
- **Backdoor (Demo)**:
  - **Email**: `system@example.com`
  - **OTP**: `000000`

## Features
- **Auto-Detection**: Identifies subscriptions based on recurring intervals (Monthly/Yearly) and keywords (UPI-AUTOPAY).
- **Indian Context**: specifically tuned for merchants like Netflix India, Hotstar, Jio, Bescom, etc.
- **Noise Filtering**: Distinguishes between one-off food orders (Swiggy/Zomato) and actual subscriptions.
- **Insights**: Suggests savings by switching to annual plans.
