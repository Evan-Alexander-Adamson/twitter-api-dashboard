# Twitter Trends Dashboard

A dashboard for analyzing Twitter trends and engagement metrics using the Twitter API v2.

## Features

- Search for tweets using keywords or hashtags
- Filter tweets by date range
- View engagement metrics (retweets, replies, likes, quotes)
- Responsive design for mobile and desktop
- Modern UI with Tailwind CSS and Tremor components

## Prerequisites

- Node.js 18.x or later
- Twitter API Bearer Token
- npm or yarn

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd twitter-trends-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Twitter API Bearer Token:
   ```
   TWITTER_BEARER_TOKEN=your_bearer_token_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

1. Push your code to GitHub.

2. Create a new project on Vercel and connect it to your GitHub repository.

3. Add the following environment variable in your Vercel project settings:
   - Name: `TWITTER_BEARER_TOKEN`
   - Value: Your Twitter API Bearer Token

4. Deploy the project.

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Tremor](https://www.tremor.so/) - React components for dashboards
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api) - Twitter API

## License

This project is licensed under the MIT License. 