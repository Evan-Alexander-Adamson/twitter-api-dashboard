import { NextResponse } from 'next/server'
import axios from 'axios'

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function POST(req: Request) {
  try {
    const { endpoint, params } = await req.json()
    
    const baseUrl = 'https://api.twitter.com/2'
    const bearerToken = process.env.TWITTER_BEARER_TOKEN

    if (!bearerToken) {
      return NextResponse.json(
        { error: 'Twitter Bearer Token not configured' },
        { status: 500 }
      )
    }

    const response = await axios({
      method: 'get',
      url: `${baseUrl}${endpoint}`,
      params,
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    })

    return NextResponse.json(response.data)
  } catch (error: any) {
    console.error('Twitter API Error:', error.response?.data || error.message)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.response?.status || 500 }
    )
  }
} 