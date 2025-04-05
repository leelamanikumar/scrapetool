require("dotenv").config();
const express = require("express");
const cors = require("cors");
const scrapeGoogleMaps = require("./scraper");
const saveToGoogleSheets = require("./googleSheets");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/scrape-save", async (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query required" });

    try {
        const data = await scrapeGoogleMaps(query);
        await saveToGoogleSheets(data);
        res.json({ message: "Data saved to Google Sheets", data });
    } catch (error) {
        res.status(500).json({ error: "Error saving data", details: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
