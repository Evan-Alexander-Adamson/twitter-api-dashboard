# Twitter API Dashboard

A Next.js application that displays trend data from Twitter's API, showing tweet volume and engagement metrics over time for specific keywords.

## Features

- Search for keywords to analyze Twitter trends
- View tweet volume and engagement metrics by date
- Responsive design with Tailwind CSS
- Error handling and loading states
- Rate limit handling for Twitter API

## Prerequisites

- Node.js 18+ installed
- Twitter API Bearer Token (from Twitter Developer Portal)
- Git installed (for deployment)

## Local Development Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd twitter-api-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.sample .env
```

4. Edit `.env` and add your Twitter Bearer Token:
```
TWITTER_BEARER_TOKEN=your_actual_bearer_token_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Connect your GitHub repository to Vercel:
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure the project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: .next

3. Add Environment Variables in Vercel:
   - In project settings, go to "Environment Variables"
   - Add `TWITTER_BEARER_TOKEN` with your actual Twitter Bearer Token
   - Deploy the project

4. Your app will be deployed to a Vercel URL!

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api) - Data source

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 