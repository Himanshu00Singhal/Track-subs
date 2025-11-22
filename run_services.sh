#!/bin/bash

# Function to kill all background processes on exit
cleanup() {
    echo "Stopping all services..."
    kill $BACKEND_PID
    kill $SECURITY_PID
    kill $FRONTEND_PID
    exit
}

# Trap SIGINT (Ctrl+C)
trap cleanup SIGINT

# Activate Virtual Environment
source venv/bin/activate

echo "🚀 Starting Backend Service (Port 8000)..."
cd backend
python main.py &
BACKEND_PID=$!
cd ..

echo "🛡️ Starting Security Service (Port 8001)..."
cd security
python main.py &
SECURITY_PID=$!
cd ..

echo "🎨 Starting Frontend (Port 5173)..."
cd frontend
# --host 0.0.0.0 allows external access (e.g. via ngrok)
npm run dev -- --host 0.0.0.0 &
FRONTEND_PID=$!
cd ..

echo "✅ All services are running!"
echo "   - Backend: http://localhost:8000"
echo "   - Security: http://localhost:8001"
echo "   - Frontend: http://localhost:5173"
echo "Press Ctrl+C to stop everything."

# Wait for all processes
wait
