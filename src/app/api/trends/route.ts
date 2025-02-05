import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const keyword = searchParams.get("keyword")

  if (!keyword) {
    return NextResponse.json({ error: "Keyword is required" }, { status: 400 })
  }

  const bearerToken = process.env.TWITTER_BEARER_TOKEN

  if (!bearerToken) {
    return NextResponse.json(
      { error: "Twitter Bearer Token is not configured" },
      { status: 500 }
    )
  }

  try {
    const searchUrl = new URL("https://api.twitter.com/2/tweets/search/recent")
    searchUrl.searchParams.append("query", keyword)
    searchUrl.searchParams.append("tweet.fields", "created_at,public_metrics")
    searchUrl.searchParams.append("max_results", "100")

    console.log("Fetching from URL:", searchUrl.toString())

    const response = await fetch(searchUrl.toString(), {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error("Twitter API Error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorBody,
      })

      if (response.status === 429) {
        const retryAfter =
          Number.parseInt(response.headers.get("retry-after") || "60", 10)
        return NextResponse.json(
          {
            error: "Twitter API rate limit exceeded. Please try again later.",
            retryAfter,
          },
          {
            status: 429,
            headers: { "Retry-After": retryAfter.toString() },
          }
        )
      }

      return NextResponse.json(
        {
          error: `Twitter API Error: ${response.status} ${response.statusText}`,
          details: errorBody,
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log("Twitter API Response:", JSON.stringify(data, null, 2))

    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      console.log("No tweets found for keyword:", keyword)
      return NextResponse.json({ data: [] })
    }

    // Process the data to create trend information
    const trendData = data.data.map((tweet: any) => ({
      date: new Date(tweet.created_at).toLocaleDateString(),
      volume: 1,
      engagement:
        (tweet.public_metrics?.like_count || 0) +
        (tweet.public_metrics?.retweet_count || 0) +
        (tweet.public_metrics?.reply_count || 0) +
        (tweet.public_metrics?.quote_count || 0),
    }))

    // Aggregate the data by date
    const aggregatedData = trendData.reduce((acc: any, curr: any) => {
      const key = curr.date
      if (!acc[key]) {
        acc[key] = {
          date: curr.date,
          volume: 0,
          engagement: 0,
        }
      }
      acc[key].volume += curr.volume
      acc[key].engagement += curr.engagement
      return acc
    }, {})

    // Convert to array and sort by date
    const result = Object.values(aggregatedData).sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    return NextResponse.json({ data: result })
  } catch (error) {
    console.error("Error in trends API:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch trend data from Twitter",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
} 