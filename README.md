# 🎬 Movie Watchlist App

Welcome to the Movie Watchlist App, a modern web app to search for movies, manage your watchlist, and handle user authentication with a polished UI. Built with Vite, React, TypeScript, and Tailwind CSS, this app uses the TMDB API to deliver a cinematic experience.🍿

## ✨ Features

- **Movie Search**: Search movies via the TMDB API with real-time results.
- **Watchlist Management**: Add or remove movies from your watchlist with toast notifications.
- **User Authentication**:
  - Sign up and log in with email/password.
  - Password visibility toggle (eye icon) for secure input.
- **Responsive Design**: Clean, mobile-friendly UI with Tailwind CSS and Inter font.
- **Toast Notifications**: Feedback for actions (e.g., "Added to watchlist!", "Please log in").
- **Local Storage**: Persist user data and watchlist across sessions.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS, Inter font
- **API**: The Movie Database (TMDB) API
- **Storage**: LocalStorage for user and watchlist data
- **Tools**: Git, GitHub, VS Code

## 🚀 Setup Instructions

Follow these steps to get the app running locally:

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Git
- TMDB API Key: Sign up at TMDB and get an API key.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Zenhar-Prodipto/movie-watchlist.git
   cd movie-watchlist
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the root directory.
   - Add your TMDB API key:
     ```
     VITE_TMDB_API_KEY=your-tmdb-api-key
     ```

4. **Run the App**:

   ```bash
   npm run dev
   ```

   - Open http://localhost:5173 in your browser.

5. **Build for Production** (optional):
   ```bash
   npm run build
   npm run preview
   ```

## 📖 Documentation

### Usage

1. **Sign Up**:

   - Navigate to `/signup`.
   - Enter an email and password, toggle the eye icon to view/hide password.
   - Submit to create an account (stored in LocalStorage).

2. **Log In**:

   - Go to `/login`.
   - Enter credentials, use the eye icon to verify password.
   - Log in to access search and watchlist features.

3. **Search Movies**:

   - Visit `/search`.
   - Enter a query (e.g., "Avengers") to fetch movies from TMDB.
   - Click a movie poster to view details (`/movie/:id`).

4. **Manage Watchlist**:

   - On `/search` or `/movie/:id`, click "Add to Watchlist" (requires login).
   - View watchlist at `/watchlist`.
   - Remove movies with toast feedback.

5. **Logout**:
   - Click "Logout" in the navbar to end the session.

### Key Components

- `Navbar.tsx`: Navigation with login/logout and toast for logout.
- `SearchPage.tsx`: Movie search with TMDB API and watchlist functionality.
- `MovieDetailsPage.tsx`: Movie details with watchlist toggle.
- `WatchlistPage.tsx`: Displays and manages user's watchlist.
- `LoginPage.tsx` / `SignUpPage.tsx`: Authentication with password visibility toggle.
- `AuthContext.tsx`: Manages login state.
- `WatchlistContext.tsx`: Manages watchlist state.

## 🌳 Gitflow

I used a Gitflow-inspired workflow to keep development organized:

- `develop`: Default branch for ongoing development and integration of new features.
- `main`: Production-ready branch with stable, release-ready code.
- `feat/_`: Feature branches for new functionality (e.g., `feat/cosmetic-surgery` for styling and password toggle), created from develop.
- `fix/_`: Bug fix branches created from develop (not used in this project).

### Workflow

1. **Create a Branch**:

   - Branch from develop:
     ```bash
     git checkout develop
     git checkout -b feat/<feature-name>
     ```

2. **Develop and Commit**:

   - Write code and commit with semantic messages:
     ```bash
     git commit -m "feat: Add eye icon toggle for password"
     ```

3. **Push to GitHub**:

   - Push the feature branch:
     ```bash
     git push origin feat/<feature-name>
     ```

4. **Merge to develop**:

   - Create a pull request from `feat/<feature-name>` to `develop`.
   - Merge after review.

5. **Merge to main**:
   - Periodically merge develop to main for production releases:
     ```bash
     git checkout main
     git merge develop
     git push origin main
     ```

### Commits

- Semantic messages (e.g., `feat: Add eye icon toggle`, `fix: Correct Inter font`) for clarity.
