# Marvel Rivals Hub

**The ultimate community platform for Marvel Rivals players to connect, strategize, and track their progress.**

Marvel Rivals Hub is a comprehensive web application designed to enhance the Marvel Rivals gaming experience. It provides players with tools to find teammates, communicate in real-time, track detailed statistics, view leaderboards, and stay updated with the latest game news, balance changes, and developer updates.

---

## 🚀 Key Features

- **🔐 Multi-Provider Authentication**
  - Secure login via GitHub and Google OAuth
  - Session management with NextAuth v5
  - Protected routes and middleware-based access control

- **💬 Real-Time Messaging System**
  - Instant messaging between players
  - Friend request management (send, accept, deny)
  - Real-time notifications using Pusher
  - Chat history and conversation management

- **📊 Player Statistics & Tracking**
  - Search players by username or UID
  - Comprehensive player profiles with match history
  - Visual statistics charts and analytics
  - Top heroes, roles, and teammates tracking
  - Player rank information and progression

- **🏆 Interactive Leaderboards**
  - Top 500 players across all platforms (PC, PlayStation, Xbox)
  - Filterable by season and platform
  - Real-time leaderboard updates
  - Hero-specific leaderboard views

- **📰 Game News & Updates**
  - Latest balance changes and patch notes
  - Developer diaries and game updates
  - Categorized news feed (All, Balances, Patch Notes, Dev Diaries)
  - Rich content display with images and full articles

- **👥 Social Features**
  - Friend management system
  - Player profile creation and management
  - Community engagement tools

---

## 🛠️ Tech Stack

### Core Framework

- **Next.js 15.3.0** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5** - Type-safe development

### Authentication & Database

- **NextAuth v5 (beta)** - Authentication framework
- **Upstash Redis** - Serverless Redis database
- **@auth/upstash-redis-adapter** - Session storage adapter

### Real-Time Communication

- **Pusher** - Real-time messaging infrastructure
- **pusher-js** - Client-side Pusher integration

### UI & Styling

- **Tailwind CSS 4.1.4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
  - Dropdown Menu
  - Select
  - Progress
  - Slot
- **Lucide React** - Icon library
- **next-themes** - Dark/light theme support

### Data Visualization & Forms

- **Recharts 2.15.2** - Chart library for statistics
- **React Hook Form 7.56.0** - Form management
- **Zod 3.24.3** - Schema validation
- **@hookform/resolvers** - Form validation resolvers

### Utilities

- **Axios** - HTTP client
- **date-fns** - Date manipulation
- **nanoid** - Unique ID generation
- **sonner** - Toast notifications
- **class-variance-authority** - Component variant management
- **clsx & tailwind-merge** - Conditional class utilities

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Git** for version control

---

## 🚦 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd marvel-rivals-hub
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-key-here
# Generate a secure random string for production

# Google OAuth
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

# GitHub OAuth
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret

# Upstash Redis (Database)
UPSTASH_REDIS_REST_URL=your-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token

# Pusher (Real-time Messaging)
PUSHER_APP_ID=your-pusher-app-id
NEXT_PUBLIC_PUSHER_APP_KEY=your-pusher-app-key
PUSHER_APP_SECRET=your-pusher-app-secret

# Marvel Rivals API
API_KEY=your-marvel-rivals-api-key
NEXT_PUBLIC_API_KEY=your-marvel-rivals-api-key  # Optional: for client-side usage
```

#### Setting Up OAuth Providers

**Google OAuth:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

**GitHub OAuth:**

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret

**Upstash Redis:**

1. Sign up at [Upstash](https://upstash.com/)
2. Create a Redis database
3. Copy the REST URL and token from the dashboard

**Pusher:**

1. Sign up at [Pusher](https://pusher.com/)
2. Create a new app (cluster: us3)
3. Copy App ID, Key, and Secret from the dashboard

**Marvel Rivals API:**

1. Obtain API key from the Marvel Rivals API provider
2. Add the key to your environment variables

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 💻 Usage

### Development Mode

The development server runs with Turbopack for faster builds:

```bash
npm run dev
```

### Accessing Features

1. **Homepage**: Navigate to `/` to see the welcome page and main features
2. **Login**: Visit `/login` to authenticate with GitHub or Google
3. **Player Stats**: Go to `/player-stats` to search for player statistics
4. **Leaderboards**: Visit `/leaderboards` to view top players
5. **News**: Navigate to `/news` to see game updates and patch notes
6. **Messages**: Access `/messages` (requires authentication) to chat with friends

### API Routes

The application includes several API endpoints:

- `/api/auth/[...nextauth]` - Authentication handlers
- `/api/seasons` - Fetch available seasons
- `/api/update-player` - Update player data
- `/api/friends/add` - Send friend requests
- `/api/friends/accept` - Accept friend requests
- `/api/friends/deny` - Deny friend requests
- `/api/message/send` - Send messages

---

## 📁 Project Structure

```
marvel-rivals-hub/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   └── login/
│   ├── (main)/                   # Main application routes
│   │   ├── leaderboards/         # Leaderboard pages
│   │   ├── messages/             # Messaging system
│   │   ├── news/                 # News and updates
│   │   ├── player-stats/         # Player statistics
│   │   └── page.tsx              # Homepage
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication API
│   │   ├── friends/              # Friend management API
│   │   ├── message/              # Messaging API
│   │   ├── seasons/              # Seasons API
│   │   └── update-player/        # Player update API
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── buttons/                  # Button components
│   ├── cards/                    # Card components
│   ├── home/                     # Homepage components
│   ├── leaderboard/              # Leaderboard components
│   ├── loaders/                  # Loading components
│   ├── messages/                 # Messaging components
│   ├── navbars/                  # Navigation components
│   ├── news/                     # News components
│   ├── player-stats/             # Player stats components
│   └── ui/                       # Reusable UI components
├── helpers/                      # Helper functions
│   ├── get-friends-by-user-id.ts
│   └── redis.ts
├── lib/                          # Library utilities
│   ├── actions.ts                # Server actions
│   ├── db.ts                     # Database connection
│   ├── pusher.ts                 # Pusher configuration
│   ├── utils.ts                  # Utility functions
│   └── validations/              # Zod validation schemas
├── types/                        # TypeScript type definitions
├── public/                       # Static assets
│   ├── fonts/                    # Custom fonts
│   ├── images/                   # Image assets
│   └── sounds/                   # Audio files
├── auth.ts                       # NextAuth configuration
├── middleware.ts                 # Next.js middleware
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
└── tailwind.config.js            # Tailwind CSS configuration
```

### Key Directories

- **`app/`**: Contains all routes and pages using Next.js App Router
- **`components/`**: Reusable React components organized by feature
- **`lib/`**: Core utilities, database connections, and server actions
- **`types/`**: TypeScript type definitions for type safety
- **`helpers/`**: Helper functions for common operations
- **`public/`**: Static assets served directly

---

## 🤝 Contributing

Contributions are welcome! To contribute to this project:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** following the existing code style
4. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Code Style Guidelines

- Use TypeScript for all new code
- Follow the existing component structure
- Use Tailwind CSS for styling
- Ensure components are accessible (follow Radix UI patterns)
- Add proper error handling and loading states
- Write clear, descriptive commit messages

### Reporting Issues

If you encounter any bugs or have feature requests, please open an issue on the GitHub repository with:

- A clear description of the problem
- Steps to reproduce the issue
- Expected vs. actual behavior
- Screenshots (if applicable)

---

## 📝 License

This project is private and proprietary. All rights reserved.

---

---

\*_Built with ❤️ for the Marvel Rivals community_
