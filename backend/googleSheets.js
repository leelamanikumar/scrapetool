const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const creds = require('./credentials.json');

const SHEET_ID = process.env.SHEET_ID;

async function saveToGoogleSheets(data) {
  try {
    const serviceAccountAuth = new JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];

    // Clear the sheet first (optional)
    await sheet.clear();

    // Set headers
    await sheet.setHeaderRow(['Name', 'Rating', 'Price Range', 'Address']);
    
    // Convert data to rows format and add them
    const rows = data.map(item => ({
      Name: item.name,
      Rating: item.rating,
      'Price Range': item.price,
      Address: item.address
    }));

    // Add the rows and wait for completion
    const addedRows = await sheet.addRows(rows);
    console.log(`✅ Added ${addedRows.length} rows to Google Sheets successfully`);
    
    return addedRows;
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
}

module.exports = saveToGoogleSheets;

