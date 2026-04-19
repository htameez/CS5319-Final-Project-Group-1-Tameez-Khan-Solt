# Docs Note

The repository now uses architecture bundles instead of one shared frontend.

- `selected/` contains the selected layered frontend and backend
- `unselected/` contains the unselected blackboard frontend and backend

Use the root [README.md](/Users/hamnatameez/CS%205319/CS5319-Final-Project-Group-1-Tameez-Khan-Solt/README.md) for the current run instructions and folder structure.

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
