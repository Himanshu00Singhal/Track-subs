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

### 1. Backend
Navigate to the `backend` directory:
```bash
cd backend
pip install -r requirements.txt
python main.py
```
The API will start at `http://localhost:8000`.
Docs available at `http://localhost:8000/docs`.

### 2. Frontend
Navigate to the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
The app will start at `http://localhost:5173`.

## Features
- **Auto-Detection**: Identifies subscriptions based on recurring intervals (Monthly/Yearly) and keywords (UPI-AUTOPAY).
- **Indian Context**: specifically tuned for merchants like Netflix India, Hotstar, Jio, Bescom, etc.
- **Noise Filtering**: Distinguishes between one-off food orders (Swiggy/Zomato) and actual subscriptions.
- **Insights**: Suggests savings by switching to annual plans.
