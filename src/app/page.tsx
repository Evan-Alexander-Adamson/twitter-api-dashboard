'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Card, Title, Text, Grid, Col } from '@tremor/react'
import "react-datepicker/dist/react-datepicker.css"

interface Tweet {
  id: string
  text: string
  author: {
    name: string
    username: string
    profile_image_url: string
  }
  created_at: string
  public_metrics: {
    retweet_count: number
    reply_count: number
    like_count: number
    quote_count: number
  }
  lang: string
}

export default function Dashboard() {
  const [query, setQuery] = useState('')
  const [startDate, setStartDate] = useState<Date | null>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searchTweets = async () => {
    if (!query) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/twitter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: '/tweets/search/recent',
          params: {
            query,
            'tweet.fields': 'created_at,public_metrics,lang',
            'user.fields': 'name,username,profile_image_url',
            'expansions': 'author_id',
            'max_results': 100,
            ...(startDate && { start_time: startDate.toISOString() }),
            ...(endDate && { end_time: endDate.toISOString() }),
          },
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // Transform the data to match our Tweet interface
      const transformedTweets = data.data.map((tweet: any) => {
        const author = data.includes.users.find((user: any) => user.id === tweet.author_id)
        return {
          id: tweet.id,
          text: tweet.text,
          author: {
            name: author.name,
            username: author.username,
            profile_image_url: author.profile_image_url,
          },
          created_at: tweet.created_at,
          public_metrics: tweet.public_metrics,
          lang: tweet.lang,
        }
      })

      setTweets(transformedTweets)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tweets')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Twitter Trends Dashboard</Title>
      <Text>Search for tweets and analyze trends</Text>

      <Card className="mt-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Search Query</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter keywords or hashtags"
            />
          </div>

          <div className="flex space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                maxDate={new Date()}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={setEndDate}
                maxDate={new Date()}
                minDate={startDate}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <button
            onClick={searchTweets}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
        </div>
      </Card>

      {tweets.length > 0 && (
        <div className="mt-6 space-y-4">
          {tweets.map((tweet) => (
            <Card key={tweet.id}>
              <div className="flex items-start space-x-3">
                <img
                  src={tweet.author.profile_image_url}
                  alt={tweet.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{tweet.author.name}</span>
                    <span className="text-gray-500">@{tweet.author.username}</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500">
                      {new Date(tweet.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1">{tweet.text}</p>
                  <div className="mt-2 flex space-x-4 text-gray-500 text-sm">
                    <span>🔄 {tweet.public_metrics.retweet_count}</span>
                    <span>💬 {tweet.public_metrics.reply_count}</span>
                    <span>❤️ {tweet.public_metrics.like_count}</span>
                    <span>🔁 {tweet.public_metrics.quote_count}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
} 