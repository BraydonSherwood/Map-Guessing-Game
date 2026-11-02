# Around the World

A small React geography game. A random airport is selected and the player clicks its estimated location on the map. The game then reveals the airport and calculates the distance between the guess and the actual location.

## Run locally

You will need [Node.js](https://nodejs.org/) installed.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

The production-ready files are generated in `dist/`.

## Tech used

- React
- Vite
- Leaflet
- OpenStreetMap map tiles

## Airport data

Airport names and coordinates are stored in `src/airports.json`, so the game does not depend on Mimo's API. Map tiles are loaded from OpenStreetMap and therefore require an internet connection.

## Upload to GitHub

Create a new GitHub repository, then run these commands from this project folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your repository's URL. Do not upload `node_modules` or `dist`; both are excluded or generated locally.
