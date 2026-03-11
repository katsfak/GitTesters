# Movies_Information

A movie search app that now uses a server-side proxy so your OMDb API key stays in `.env` and is not exposed in browser code.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add your key to `.env`:

   ```env
   API_KEY=your_real_omdb_api_key
   PORT=3000
   ```

3. Start the app:

   ```bash
   npm start
   ```

   For production mode:

   ```bash
   npm run start:prod
   ```

4. Open `http://localhost:3000`.

## Security

- `.env` is ignored by Git via `.gitignore`.
- The browser calls `/api/movie`; only the backend talks to OMDb with your key.
- Health endpoint: `GET /health`

## Technologies

- HTML/CSS
- JavaScript
- Node.js + Express
- OMDb API
