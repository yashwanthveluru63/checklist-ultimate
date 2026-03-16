# ⚡ INSTANT SETUP - Copy Paste These Commands!

## Clone & Merge in 10 Minutes

```bash
# Step 1: Clone all repos
cd ~/Desktop
git clone https://github.com/yashwanthveluru63/checklist-ultimate.git
git clone https://github.com/yashwanthveluru63/checklist.git  
git clone https://github.com/yashwanthveluru63/eme-CheckList.git

# Step 2: Copy frontend code
cd checklist-ultimate
mkdir -p frontend/src backend/tests
cp -r ../checklist/src/* frontend/src/
cp ../checklist/package.json frontend/
cp -r ../checklist/public frontend/ 2>/dev/null || true

# Step 3: Copy backend code
cp ../eme-CheckList/backend/server.py backend/
cp ../eme-CheckList/backend/requirements.txt backend/
cp -r ../eme-CheckList/backend/tests/* backend/tests/ 2>/dev/null || true

# Step 4: Copy AI components
cp -r ../eme-CheckList/.emergent . 2>/dev/null || true
cp -r ../eme-CheckList/memory . 2>/dev/null || true

# Step 5: Install & Run
cd frontend && npm install && npm start &
cd ../backend && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt && python server.py
```

## Done! 
Frontend: http://localhost:3000
Backend: http://localhost:5000
