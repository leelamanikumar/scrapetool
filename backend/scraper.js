const puppeteer = require("puppeteer");

async function scrapeGoogleMaps(query) {
    const browser = await puppeteer.launch({ 
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    try {
        const encodedQuery = encodeURIComponent(query);
        await page.goto(`https://www.google.com/maps/search/${encodedQuery}`, {
            waitUntil: "networkidle2",
            timeout: 60000
        });

        // Wait for the results to load
        await page.waitForSelector('div[jsaction*="mouseover:pane"]', { timeout: 10000 });

        const results = await page.evaluate(() => {
            const items = document.querySelectorAll('div[jsaction*="mouseover:pane"]');
            const data = [];
            
            items.forEach((item) => {
                // Get name from the heading
                const nameElement = item.querySelector('h3, div.fontHeadlineSmall');
                let name = nameElement ? nameElement.textContent.trim() : null;

                // Skip if no valid name found or if it contains interface text
                if (!name || name.includes('Price') || name.includes('Rating') || name.includes('Filter')) {
                    return;
                }

                // Get rating
                const ratingElement = item.querySelector('span[aria-label*="stars"]');
                const rating = ratingElement ? 
                    ratingElement.getAttribute('aria-label').match(/(\d+\.\d+)/)?.[1] : "N/A";

                // Get price range
                const priceElement = item.querySelector('span[aria-label*="Price"]');
                const price = priceElement ? 
                    priceElement.textContent.match(/(₹+)/)?.[1] : "N/A";

                // Get address
                const addressElement = item.querySelector('div[class*="fontBodyMedium"]');
                let address = "N/A";
                if (addressElement) {
                    const addressText = addressElement.textContent.trim();
                    // Remove interface text and clean up the address
                    address = addressText
                        .split('·').pop() // Get the last part after ·
                        .replace(/No-contact delivery|Reserve a table|Update results|Back to top/g, '')
                        .trim();
                }

                if (name && name !== "N/A") {
                    data.push({
                        name,
                        rating,
                        price,
                        address
                    });
                }
            });

            // Remove duplicates based on name
            return data.filter((item, index, self) =>
                index === self.findIndex((t) => t.name === item.name)
            );
        });

        await browser.close();
        return results;

    } catch (error) {
        console.error("Scraping error:", error);
        await browser.close();
        throw error;
    }
}

module.exports = scrapeGoogleMaps;
