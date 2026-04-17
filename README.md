# CS 5319 Final Project - AI Healthcare Chatbot

This project compares two backend architectures for the same AI healthcare chatbot:

- `Layered Architecture`
- `Blackboard Architecture`

The app uses one shared React frontend and lets the user switch between both backend implementations at runtime. In both modes, the user can:

- enter profile context such as name, health goals, and medications
- ask a health-related wellness question
- get an OpenAI-generated response through the backend
- save assistant messages as favorites

The chatbot is designed for general wellness support and class demonstration purposes. It does not provide diagnosis or replace medical professionals.

## Current Implementation Status

Both architecture paths are implemented and wired into the shared UI.

- `Layered backend`
  Uses API routes, service classes, repositories, and domain models.
- `Blackboard backend`
  Uses a controller, shared blackboard state, and multiple knowledge sources such as the Profile Loader, Context Analyzer, AI Response Generator, Response Composer, and Favorites Manager.

For presentation/demo honesty:

- both architectures are available in the UI
- both support profile-aware chat
- both support favorites
- both support SQL database persistence
- authentication/authorization is not implemented

## Project Structure

```text
CS5319-Final-Project-Group-1-Tameez-Khan-Solt/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   ├── services/
│   │   └── architectureMeta.js
├── backend/
│   ├── layered/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   ├── models/
│   │   │   └── db/
│   └── blackboard/
│       ├── app/
│       │   ├── api/
│       │   ├── core/
│       │   ├── services/
│       │   ├── repositories/
│       │   ├── models/
│       │   └── db/
└── docs/
```

## What To Show In The Demo

This README is written to support the final presentation/demo workflow:

- explain the project as an AI healthcare chatbot
- show two architecture candidates
- honestly state that both backends are implemented
- show that the frontend can toggle between them
- explain how profile data, chat, and favorites move through each architecture
- be clear about what is implemented versus what is only in the diagram

## Requirements

You need:

- `Python 3.9+`
- `Node.js 20+`
- `npm`
- `MySQL` if you want MySQL persistence

Recommended implementation platform for this project:

- `macOS` with `zsh`
- `Python virtual environments` for each backend
- `Node.js` + `npm` for the React frontend
- `MySQL 9.x` or compatible local MySQL server for SQL persistence

You can verify the local toolchain with:

```bash
python3 --version
node -v
npm -v
mysql --version
```

## Implementation Platform, Download, Installation, And Configuration

This section is included to match the final deliverable requirement that the grader be able to install, configure, compile, and run the system.

### Python

- Version used in this project: `Python 3.9+`
- Official download: `https://www.python.org/downloads/`
- Verify install:

```bash
python3 --version
```

### Node.js And npm

- Recommended version: `Node.js 20+`
- Official download: `https://nodejs.org/`
- Verify install:

```bash
node -v
npm -v
```

### MySQL

- Official download: `https://dev.mysql.com/downloads/`
- macOS Homebrew option:

```bash
brew install mysql
brew services start mysql
```

- Verify install:

```bash
mysql --version
```

### React / Vite Frontend Toolchain

The frontend uses:

- `React 19`
- `Vite 5`
- `npm` for dependency management

Install dependencies from `frontend/`:

```bash
npm install
```

### Backend Python Packages

The backends use:

- `FastAPI`
- `Uvicorn`
- `SQLAlchemy`
- `pydantic-settings`
- `openai`
- `pymysql`
- `cryptography`

Each backend should be configured in its own virtual environment.

## Environment Files

Create one `.env` file per backend.

`backend/layered/.env`

```env
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=mysql+pymysql://carebot_user:carebot_password@localhost:3306/carebot_layered
```

`backend/blackboard/.env`

```env
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=mysql+pymysql://carebot_user:carebot_password@localhost:3306/carebot_blackboard
```

Notes:

- You may use the same `OPENAI_API_KEY` in both files.
- Use separate databases for each architecture so the comparison stays clean.
- If you want to use SQLite instead, the built-in defaults are:
  - `sqlite:///./carebot_layered.db`
  - `sqlite:///./carebot_blackboard.db`

## Database Setup With MySQL

If MySQL is not installed yet on macOS with Homebrew:

```bash
brew install mysql
brew services start mysql
```

### 1. Open MySQL

```bash
mysql -u root -p
```

If your local root setup differs, use the account that works on your machine.

### 2. Create The Databases

```sql
CREATE DATABASE carebot_layered;
CREATE DATABASE carebot_blackboard;
```

### 3. Create A Dedicated Project User

```sql
CREATE USER 'carebot_user'@'localhost' IDENTIFIED BY 'carebot_password';
GRANT ALL PRIVILEGES ON carebot_layered.* TO 'carebot_user'@'localhost';
GRANT ALL PRIVILEGES ON carebot_blackboard.* TO 'carebot_user'@'localhost';
FLUSH PRIVILEGES;
```

### 4. Confirm The Databases Exist

```sql
SHOW DATABASES;
```

You should see:

- `carebot_layered`
- `carebot_blackboard`

### 5. Python MySQL Dependencies

Both backends need the MySQL driver packages:

- `pymysql`
- `cryptography`

These are needed because modern MySQL installs commonly use `caching_sha2_password`, which requires `cryptography` when using `pymysql`.

## Backend Setup

Set up each backend in its own virtual environment.

### Layered Backend

```bash
cd backend/layered
python3 -m venv .venv
source .venv/bin/activate
python -m pip install fastapi uvicorn sqlalchemy pydantic-settings openai pymysql cryptography
python -m uvicorn app.main:app --reload --port 8000
```

### Blackboard Backend

```bash
cd backend/blackboard
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python -m pip install pymysql cryptography
python -m uvicorn app.main:app --reload --port 8001
```

Important:

- Start each backend from its own folder so it picks up the correct local `.env`.
- Use `python -m uvicorn`, not just `uvicorn`, to avoid accidentally using a global Anaconda/Homebrew installation.

## How To Compile The Code

This project has a frontend compilation step and backend dependency/setup steps.

### Frontend Compilation

From `frontend/`:

```bash
npm install
npm run build
```

This creates the production frontend build in:

```text
frontend/dist/
```

### Backend Preparation / Compilation-Equivalent Step

The Python backends do not use a separate binary compilation step, but the grader can verify they are ready by:

1. installing dependencies
2. loading `.env`
3. starting each FastAPI server

Optional syntax verification example:

```bash
python3 -m py_compile backend/layered/app/main.py backend/blackboard/app/main.py
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server will print a local URL, usually:

```text
http://localhost:5173
```

## Full Startup Order

Use three terminals.

### Terminal 1: Layered

```bash
cd backend/layered
source .venv/bin/activate
python -m uvicorn app.main:app --reload --port 8000
```

### Terminal 2: Blackboard

```bash
cd backend/blackboard
source .venv/bin/activate
python -m uvicorn app.main:app --reload --port 8001
```

### Terminal 3: Frontend

```bash
cd frontend
npm run dev
```

## How To Execute The System

1. Start the `layered` backend on port `8000`.
2. Start the `blackboard` backend on port `8001`.
3. Start the React frontend.
4. Open the frontend URL in the browser.
5. Use the architecture switcher to choose one backend.
6. Enter profile data and a question.
7. Submit the question and observe the response.
8. Click the heart next to an assistant message to save it as a favorite.
9. Switch architectures and repeat.

## Health Checks

After startup, these URLs should respond:

- Layered root: `http://127.0.0.1:8000/`
- Blackboard root: `http://127.0.0.1:8001/`
- Frontend: `http://localhost:5173`

Expected demo behavior:

1. Open the frontend.
2. Choose `Layered Architecture` or `Blackboard Architecture`.
3. Enter a name, health goals, medications, and a question.
4. Submit the chat request.
5. Confirm a response appears.
6. Click the heart next to an assistant message.
7. Confirm the message appears in the favorites panel.
8. Switch architectures and repeat to show the same UI driving a different backend design.

## How The Architectures Differ

### Layered

- API routes call service classes
- service classes coordinate repositories and OpenAI
- repositories store profiles, chats, and favorites in SQL
- favorites flow through `FavoriteService`

Relevant folders:

- `backend/layered/app/api/`
- `backend/layered/app/services/`
- `backend/layered/app/repositories/`
- `backend/layered/app/models/`

### Blackboard

- FastAPI writes the request into a blackboard workflow
- `BlackboardState` acts as the shared knowledge space
- the controller runs knowledge sources in sequence
- the profile loader reads from shared state and database
- the favorites flow through `FavoritesManager`

Relevant folders:

- `backend/blackboard/app/api/`
- `backend/blackboard/app/core/`
- `backend/blackboard/app/services/`
- `backend/blackboard/app/repositories/`
- `backend/blackboard/app/models/`

## Architecture Comparison For This System

### Layered Architecture Pros

- Easier to explain in terms of API, service, repository, and model responsibilities
- More direct request path from frontend event to database write
- Simpler to debug because orchestration is concentrated in service classes

### Layered Architecture Cons

- Less expressive for incremental reasoning across multiple specialized processing steps
- More responsibility tends to collect inside a few service classes

### Blackboard Architecture Pros

- Better fit for showing AI-oriented coordination through multiple knowledge sources
- Shared knowledge space makes profile loading, context analysis, response composition, and favorites concepts more distinct
- Stronger contrast for presentation when comparing two candidate architectures

### Blackboard Architecture Cons

- Harder to implement and reason about because more moving parts must stay coordinated
- Request flow is less direct than the layered approach

## Rationale For Final Selection

The project compares both candidates because both can support the same healthcare chatbot features, but they emphasize different qualities.

Recommended rationale if `Layered` is selected as the final architecture:

- it is easier to maintain for a course project timeline
- it gives a cleaner mapping between UI actions, services, repositories, and stored data
- it keeps profile, chat, and favorites flows easier to trace and demo

Recommended rationale if `Blackboard` is selected as the final architecture:

- it better demonstrates coordination among specialized reasoning components
- it highlights the AI-style workflow more explicitly through the controller and knowledge sources
- it gives a more distinctive architecture comparison for the final presentation

Before final submission, the team should keep only one of these as the official final-selection rationale in the submitted README/Word document.

## Changes From The Original Proposal

If your final candidate architecture options changed from the proposal, document that here in the final submission.

Current honest project note:

- the codebase now implements both `Layered` and `Blackboard` backend architectures in the same repository
- the frontend is shared across both modes
- the implementation includes profile-aware chat and favorites in both modes
- MySQL can be used for both architectures through separate `DATABASE_URL` values

If the final submission differs from the originally proposed architecture options, add a short justification such as:

- the updated options better matched the implemented chatbot workflow
- one architecture offered a clearer comparison for profile, chat, and favorites
- implementation evidence during prototyping showed one style was easier or riskier for this system

## Required Submission Repository Structure

The instructor guideline says the final public GitHub submission should separate the two implementations into:

- `Selected/`
- `Unselected/`

That means, before final submission, the team should organize the repo so that:

```text
Selected/
  ...source code and executables for the chosen architecture...
Unselected/
  ...source code and executables for the other architecture...
```

Important honest note:

- the current working repository is organized under `backend/layered/` and `backend/blackboard/`
- before final submission, the team should rename/restructure the repository to match the required `Selected` / `Unselected` format and the required GitHub naming convention from the guideline

The README/Word document submitted with the final deliverable should also explicitly explain:

- which architecture is `Selected`
- which architecture is `Unselected`
- how the implementations differ in source code, reusable components/connectors, and runtime flow
- why the selected architecture was chosen

## Compiled Code / Executables

For this project, the most relevant compiled/executable artifacts are:

- frontend production build output in `frontend/dist/`
- runnable FastAPI backends started with `python -m uvicorn`

If the team wants to align more closely with the deliverable language, it is reasonable to include:

- the `frontend/dist/` production build
- the Python source plus exact run commands for each backend
- any screenshots showing successful startup and execution of both architecture styles

## Troubleshooting

### `ModuleNotFoundError: No module named 'openai'`

Install dependencies inside the active backend virtual environment and restart:

```bash
source .venv/bin/activate
python -m pip install openai
```

### `ModuleNotFoundError` or wrong `uvicorn`

Your shell may be using a global `uvicorn`.

Always run:

```bash
python -m uvicorn app.main:app --reload --port 8000
```

or:

```bash
python -m uvicorn app.main:app --reload --port 8001
```

### MySQL auth error mentioning `cryptography`

Install:

```bash
python -m pip install cryptography pymysql
```

### Port `8000` or `8001` already in use

Find and stop the process:

```bash
lsof -i :8000
kill -9 <PID>
```

or:

```bash
lsof -i :8001
kill -9 <PID>
```

### Frontend build check

From `frontend/`:

```bash
npm run lint
npm run build
```

## Honest Notes For Presentation

If you are demonstrating the project live, these are the most important truthful points to keep consistent with the codebase:

- both architecture options are implemented
- the frontend is shared across both modes
- both modes use the backend to call OpenAI
- both modes support saved favorites
- both modes support SQL persistence when configured with MySQL
- diagrams may say `MySQL`, but the code can also run with SQLite by changing `DATABASE_URL`
- authentication is not implemented

## Stop The App

To stop any running dev server:

```text
Ctrl + C
```
