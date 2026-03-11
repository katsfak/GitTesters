const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.disable("x-powered-by");

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use(express.static(path.join(__dirname)));

app.get("/api/movie", async (req, res) => {
    const apiKey = process.env.API_KEY;
    const title = req.query.title;

    if (!apiKey) {
        return res.status(500).json({ error: "Server API key is not configured." });
    }

    if (!title || !title.trim()) {
        return res.status(400).json({ error: "A movie title is required." });
    }

    try {
        const omdbUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(title.trim())}&apikey=${apiKey}`;
        const response = await fetch(omdbUrl);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: data?.Error || "Failed to fetch data from OMDb."
            });
        }

        if (data.Response === "False") {
            return res.status(404).json({ error: data.Error || "Movie not found." });
        }

        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: "Server error while fetching movie data." });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
