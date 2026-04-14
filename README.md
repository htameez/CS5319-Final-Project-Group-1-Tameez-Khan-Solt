# AI Healthcare Chatbot

This project is a class demo app for `CS 5319`.

It is set up to support two architecture paths:

- `Layered Architecture`
- `Blackboard Architecture`

The app lets you switch between both views in the UI, so the team can compare them during the presentation and also build code for each one in separate folders.

## What This Project Is

The project is based on the proposal for an `AI Healthcare Chatbot`.

Right now, the codebase is organized so the team can:

- show the project idea and requirements
- compare two architecture options
- work on the `layered` section without breaking the `blackboard` section
- work on the `blackboard` section without breaking the `layered` section

## Project Structure

These are the most important files and folders:

```text
src/
  App.jsx
  App.css
  index.css
  main.jsx
  data/
    architectureMeta.js
  architectures/
    layered/
      LayeredDemo.jsx
      model.js
    blackboard/
      BlackboardDemo.jsx
      model.js
```

What each part does:

- `src/App.jsx`
  This is the main page. It shows the project overview and lets you switch between the layered and blackboard workspaces.

- `src/data/architectureMeta.js`
  This stores the high-level labels and descriptions for each architecture.

- `src/architectures/layered/`
  This is where the layered architecture code should go.

- `src/architectures/blackboard/`
  This is where the blackboard architecture code should go.

## Before You Run The App

You need:

- `Node.js`
- `npm`

To check if they are installed, run:

```bash
node -v
npm -v
```

## Important Note About Node Version

This project currently uses a Vite setup that may require a newer version of Node.

If you see errors mentioning:

- `rolldown`
- `Cannot find module '@rolldown/binding-darwin-x64'`
- `Vite requires Node.js version 20.19+ or 22.12+`

then your Node version is too old for the current toolchain.

### Best Fix

Install a newer version of Node, then reinstall the project dependencies.

If you use Homebrew on Mac:

```bash
brew install node@22
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
hash -r
node -v
npm -v
```

After that, reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

## How To Run The App

From the project folder, run:

```bash
npm install
npm run dev
```

Then open the local address shown in the terminal. It is usually:

```text
http://localhost:5173
```

To stop the app, press:

```text
Ctrl + C
```

## How To Update The Layered Section

If your job is to work on the layered architecture, focus on these files:

- [src/architectures/layered/LayeredDemo.jsx](/Users/hamnatameez/CS5319-Final-Project-Group-1-Tameez-Khan-Solt/src/architectures/layered/LayeredDemo.jsx)
- [src/architectures/layered/model.js](/Users/hamnatameez/CS5319-Final-Project-Group-1-Tameez-Khan-Solt/src/architectures/layered/model.js)

What to edit there:

- UI and display ideas for the layered architecture
- sample layered workflow
- class names and service names
- healthcare chatbot logic for the layered path

Good beginner rule:

- If your change is only for layered architecture, only edit files inside `src/architectures/layered/`

Examples of layered parts you might add:

- `HealthProfileForm`
- `ProfileService`
- `RecommendationService`
- `ProfileRepository`
- `UserProfile`

## How To Update The Blackboard Section

If your job is to work on the blackboard architecture, focus on these files:

- [src/architectures/blackboard/BlackboardDemo.jsx](/Users/hamnatameez/CS5319-Final-Project-Group-1-Tameez-Khan-Solt/src/architectures/blackboard/BlackboardDemo.jsx)
- [src/architectures/blackboard/model.js](/Users/hamnatameez/CS5319-Final-Project-Group-1-Tameez-Khan-Solt/src/architectures/blackboard/model.js)

What to edit there:

- UI and display ideas for the blackboard architecture
- blackboard state flow
- knowledge-source logic
- controller behavior
- healthcare chatbot reasoning for the blackboard path

Good beginner rule:

- If your change is only for blackboard architecture, only edit files inside `src/architectures/blackboard/`

Examples of blackboard parts you might add:

- `BlackboardState`
- `BlackboardController`
- `ProfileKnowledgeSource`
- `SafetyKnowledgeSource`
- `WellnessPlannerKnowledgeSource`

## How To Update Shared Project Content

If you need to update text or labels for the whole app, use these files:

- [src/App.jsx](/Users/hamnatameez/CS5319-Final-Project-Group-1-Tameez-Khan-Solt/src/App.jsx)
- [src/data/architectureMeta.js](/Users/hamnatameez/CS5319-Final-Project-Group-1-Tameez-Khan-Solt/src/data/architectureMeta.js)

Use `src/App.jsx` for:

- overview text
- project sections
- shared requirements text
- architecture switch behavior

Use `src/data/architectureMeta.js` for:

- architecture names
- labels like `Option 1` and `Option 2`
- pros and cons
- short descriptions

## Safe Workflow For Beginners

If you are new to coding, use this workflow:

1. Open the project folder.
2. Run `npm run dev`.
3. Open the app in your browser.
4. Change only the files for your section.
5. Save the file.
6. Refresh the browser if needed.
7. Make sure the other architecture section still opens.

## If The App Stops Working

Try these steps in order:

1. Check your Node version:

```bash
node -v
```

2. Reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

3. Start again:

```bash
npm run dev
```

If the error mentions `rolldown` or Node version requirements, fix the Node version first.

## Team Reminder

- Keep `layered` changes inside `src/architectures/layered/`
- Keep `blackboard` changes inside `src/architectures/blackboard/`
- Put shared changes in `src/App.jsx` or `src/data/architectureMeta.js`
- Do not remove the architecture switcher, because it helps with the final presentation
