# 🗺️ Data Scraper

A full-stack web application that scrapes business data from **Google Maps** and saves it to **Google Sheets**. Built using **Node.js**, **Express**, **Puppeteer**, and **React**.

---

## ✨ Features

- 🔍 Search for any location or business on Google Maps
- 🤖 Scrapes business details automatically:
  - Name
  - Rating
  - Price Range
  - Address
- 📄 Saves data to Google Sheets
- 💻 Modern, responsive frontend (React + Vite)
- ⚡ Real-time search results display

---

## 📦 Technologies Used

### 🔧 Backend:
- Node.js
- Express.js
- Puppeteer
- Google Sheets API
- dotenv

### 🎨 Frontend:
- React
- Vite
- CSS3

---

## 🚀 Project Structure

```
project/
├── backend/
│   ├── index.js              # Entry point
│   ├── scraper.js            # Puppeteer logic
│   ├── googleSheets.js       # Google Sheets API integration
│   ├── credentials.json      # Google API credentials
│   └── .env                  # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # React component
│   │   └── App.css           # Styling
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🔧 Prerequisites

- Node.js (v14+)
- npm or yarn
- A Google Cloud account with:
  - **Google Sheets API** enabled
  - A **service account** and credentials JSON file

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-project-name>
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```
SHEET_ID=your_google_sheet_id
PORT=5000
```

Place your **Google service account credentials** in:
```
backend/credentials.json
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```

---

## ⚙️ Google Sheets Configuration

1. Create a new **Google Sheet**
2. Share it with your **service account email**
3. Copy the **Sheet ID** from the URL
4. Add the Sheet ID to your `.env` file

---

## ▶️ Usage

### 1. Start Backend Server
```bash
cd backend
npm start
```

### 2. Start Frontend Server
```bash
cd frontend
npm run dev
```

### 3. Open in Browser

Navigate to:  
```
http://localhost:5173
```

- Enter a search query (e.g., `restaurants in Mumbai`)
- Click **Search**
- Data will be displayed and saved to your Google Sheet

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 🙏 Acknowledgments

- [Google Maps](https://maps.google.com)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Puppeteer](https://pptr.dev/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
