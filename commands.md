Open 4 terminal:
Then activate venv or create one we have requirements.txt

Terminal 1: Backend
cd backend
python main.py

Terminal 2: Security Service
cd security
python main.py

Terminal 3: Frontend
cd frontend
npm run dev

Terminal 4: Cloudflare Tunnel
cloudflared tunnel --url http://localhost:5173


CF commands:

1. curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-amd64.tgz -o cloudflared.tgz
2. tar -xvzf cloudflared.tgz
3. mkdir -p ~/.local/bin  
4. mv cloudflared ~/.local/bin/
5. chmod +x ~/.local/bin/cloudflared
6. echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
7. source ~/.zshrc
8. cloudflared tunnel --url http://localhost:5173