import { useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:5000/scrape-save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }
      
      setResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Data Scraper</h1>
      
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query (e.g., 'IT companies in Hyderabad')"
          className="search-input"
          required
        />
        <button type="submit" disabled={loading} className="search-button">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      
      {results && (
        <div className="results-container">
          <h2>Results saved to Google Sheets</h2>
          <p className="results-count">Found {results.data.length} results</p>
          
          <div className="results-grid">
            {results.data.map((item, index) => (
              <div key={index} className="result-card">
                <h3>{item.name}</h3>
                <div className="result-details">
                  <p><strong>Rating:</strong> {item.rating}</p>
                  <p><strong>Price:</strong> {item.price}</p>
                  <p><strong>Address:</strong> {item.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App