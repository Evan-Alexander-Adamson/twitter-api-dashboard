import React, { useState, useEffect } from "react"

interface TrendData {
  date: string
  volume: number
  engagement: number
}

export default function TrendsDashboard() {
  const [trends, setTrends] = useState<TrendData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>("")

  const fetchTrends = async (searchKeyword: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/trends?keyword=${encodeURIComponent(searchKeyword)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Error fetching trends: ${response.statusText}`)
      }

      setTrends(data.data)
    } catch (err) {
      console.error("Dashboard error:", err)
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (keyword.trim()) {
      fetchTrends(keyword.trim())
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Search Trends
        </button>
      </form>

      {loading && <p>Loading trends...</p>}

      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && trends.length === 0 && keyword && (
        <p>No trends found for "{keyword}".</p>
      )}

      {!loading && trends.length > 0 && (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Volume</th>
              <th className="border p-2">Engagement</th>
            </tr>
          </thead>
          <tbody>
            {trends.map((trend) => (
              <tr key={trend.date}>
                <td className="border p-2">{trend.date}</td>
                <td className="border p-2">{trend.volume}</td>
                <td className="border p-2">{trend.engagement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
} 