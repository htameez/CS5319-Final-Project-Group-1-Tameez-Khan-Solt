# CS 5319 Final Project - AI Healthcare Chatbot

This repository now groups each full architectural option into its own top-level folder, including both frontend and backend.

- `selected/` contains the selected `Layered Architecture`
- `unselected/` contains the unselected `Blackboard Architecture`

Both bundles support:

- profile-aware chat
- OpenAI-backed wellness responses
- favorites
- SQL persistence

The chatbot is for course demonstration and general wellness support. It does not diagnose conditions or replace medical professionals.

## Project Structure

```text
CS5319-Final-Project-Group-1-Tameez-Khan-Solt/
├── selected/
│   ├── frontend/
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   └── backend/
│       ├── app/
│       │   ├── api/
│       │   ├── services/
│       │   ├── repositories/
│       │   ├── models/
│       │   └── db/
│       └── requirements.txt
├── unselected/
│   ├── frontend/
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   └── backend/
│       ├── app/
│       │   ├── api/
│       │   ├── core/
│       │   ├── services/
│       │   ├── repositories/
│       │   ├── models/
│       │   └── db/
│       └── requirements.txt
└── docs/
```

This matches the professor feedback by keeping each architecture self-contained, including its own UI.

## Architecture Mapping

- `selected/backend` is the layered backend
- `selected/frontend` is the dedicated layered UI
- `unselected/backend` is the blackboard backend
- `unselected/frontend` is the dedicated blackboard UI

## Requirements

- `Python 3.9+`
- `Node.js 20+`
- `npm`
- `MySQL` if you want MySQL persistence

Verify the toolchain with:

```bash
python3 --version
node -v
npm -v
mysql --version
```

## Before You Start

There are two separate runnable apps in this repo:

- `selected/frontend` + `selected/backend`
- `unselected/frontend` + `unselected/backend`

Each backend reads its own `.env` file from its own backend folder.

- put the selected architecture env file at `selected/backend/.env`
- put the unselected architecture env file at `unselected/backend/.env`

The frontend does not require a `.env` file to run in the default setup.

## Environment Files

Create one `.env` file per backend.

`selected/backend/.env`

```env
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=mysql+pymysql://carebot_user:carebot_password@localhost:3306/carebot_layered
```

`unselected/backend/.env`

```env
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=mysql+pymysql://carebot_user:carebot_password@localhost:3306/carebot_blackboard
```

What the variables mean:

- `OPENAI_API_KEY` is your OpenAI API key used by the backend when generating responses
- `DATABASE_URL` tells SQLAlchemy where to store profiles, chats, and favorites

If you prefer SQLite, you can use these values instead:

`selected/backend/.env`

```env
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=sqlite:///./carebot_layered.db
```

`unselected/backend/.env`

```env
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=sqlite:///./carebot_blackboard.db
```

The current backend defaults remain:

- `sqlite:///./carebot_layered.db`
- `sqlite:///./carebot_blackboard.db`

Important notes:

- create the `.env` file inside the backend folder, not at the project root
- the selected backend looks for `.env` in `selected/backend/`
- the unselected backend looks for `.env` in `unselected/backend/`
- if you leave out `DATABASE_URL`, SQLite is used by default
- if you leave out `OPENAI_API_KEY`, the selected backend will fail on startup because that key is required there

## Install Dependencies

### Selected Architecture

Backend:

```bash
cd selected/backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

Frontend:

```bash
cd selected/frontend
npm install
```

### Unselected Architecture

Backend:

```bash
cd unselected/backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

Frontend:

```bash
cd unselected/frontend
npm install
```

If `source .venv/bin/activate` still leaves you on Anaconda, use the venv interpreter directly:

```bash
./.venv/bin/python -m pip install -r requirements.txt
./.venv/bin/python -m uvicorn app.main:app --reload --port 8000
```

## Running The Selected Architecture

1. Create `selected/backend/.env`
2. Start the selected backend
3. Start the selected frontend in a second terminal

Backend terminal:

```bash
cd selected/backend
source .venv/bin/activate
python -m uvicorn app.main:app --reload --port 8000
```

If activation does not point to the venv correctly, use:

```bash
cd selected/backend
./.venv/bin/python -m uvicorn app.main:app --reload --port 8000
```

Frontend terminal:

```bash
cd selected/frontend
npm run dev
```

Then open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

The selected frontend talks to `http://127.0.0.1:8000/api` by default.

Optional frontend API override:

```bash
VITE_API_URL=http://127.0.0.1:8000/api npm run dev
```

## Running The Unselected Architecture

1. Create `unselected/backend/.env`
2. Start the unselected backend
3. Start the unselected frontend in a second terminal

Backend terminal:

```bash
cd unselected/backend
source .venv/bin/activate
python -m uvicorn app.main:app --reload --port 8001
```

If activation does not point to the venv correctly, use:

```bash
cd unselected/backend
./.venv/bin/python -m uvicorn app.main:app --reload --port 8001
```

Frontend terminal:

```bash
cd unselected/frontend
npm run dev
```

Then open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

The unselected frontend talks to `http://127.0.0.1:8001` by default.

Optional frontend API override:

```bash
VITE_API_URL=http://127.0.0.1:8001 npm run dev
```

## Quick Start

If everything is already installed, the shortest path is:

Selected architecture:

```bash
cd selected/backend
./.venv/bin/python -m uvicorn app.main:app --reload --port 8000
```

Open a second terminal:

```bash
cd selected/frontend
npm run dev
```

Unselected architecture:

```bash
cd unselected/backend
./.venv/bin/python -m uvicorn app.main:app --reload --port 8001
```

Open a second terminal:

```bash
cd unselected/frontend
npm run dev
```

## Troubleshooting

- `ModuleNotFoundError: No module named 'pymysql'`
  This usually means `uvicorn` is running from Anaconda or global Python instead of the project venv. Run `./.venv/bin/python -m uvicorn ...` instead.
- `OPENAI_API_KEY` error on startup
  Make sure the `.env` file exists in the backend folder and contains a real key.
- frontend starts but chat requests fail
  Check that the matching backend is running on the expected port: `8000` for selected, `8001` for unselected.
- MySQL connection errors
  Double-check the username, password, host, port, and database name inside `DATABASE_URL`.

## What Changed

- the old shared `frontend/` was split into `selected/frontend/` and `unselected/frontend/`
- the layered backend moved from `backend/Selected/` to `selected/backend/`
- the blackboard backend moved from `backend/Unselected/` to `unselected/backend/`
- each frontend now targets only its matching backend instead of switching architectures at runtime

## Verification Commands

```bash
python3 -m py_compile selected/backend/app/main.py unselected/backend/app/main.py
cd selected/frontend && npm run build
cd unselected/frontend && npm run build
```
