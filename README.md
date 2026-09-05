# 🎯 AI Mock Interview Platform

An intelligent, full-stack AI-driven mock interview preparation platform built to simulate real-world technical and behavioral interviews. Practice customized interviews, answer via speech or video in real-time, and receive detailed AI feedback, ratings, and actionable improvement recommendations.

---

## 🌟 Key Features

- 🎙️ **Speech-to-Text & Webcam Interaction**: Practice answering questions aloud with real-time speech recognition and webcam integration to simulate an authentic interview atmosphere.
- 🤖 **AI-Generated Questions & Dynamic Scenarios**: Generate tailored interview questions based on job role, tech stack, and years of experience.
- 📊 **Instant Feedback & Scoring**: Receive comprehensive evaluation with correct sample answers, ratings, and actionable tips to improve your answers.
- 🔐 **Secure Authentication**: Complete user authentication and session management powered by Clerk.
- ⚡ **Modern Relational Database**: Serverless PostgreSQL database management powered by Neon and Drizzle ORM.
- 🎨 **Responsive & Clean UI**: Built with Next.js 15, Tailwind CSS, and Radix UI components for an ultra-smooth experience on desktop and mobile.

---

## 🛠️ Tech Stack

| Technology | Role |
| :--- | :--- |
| **Next.js 15** (App Router) | Full-stack React framework & routing |
| **React 18** | Interactive UI components & hooks |
| **Tailwind CSS & Radix UI** | Modern responsive styling and accessible primitives |
| **Google Gemini AI / Ollama** | Large Language Model for question generation & response evaluation |
| **Drizzle ORM** | Type-safe SQL ORM for PostgreSQL |
| **Neon Database** | Serverless PostgreSQL database |
| **Clerk** | Secure authentication and user management |
| **Webcam & Speech-to-Text API** | Real-time audio transcription & video feed |

---

## 📁 Project Structure

```
├── app/                  # Next.js App Router (pages, layouts, API routes)
│   ├── (auth)/           # Sign-in & Sign-up authentication routes
│   └── dashboard/        # Main dashboard & interview workflows
│       ├── interview/    # Dynamic interview session & feedback screens
│       ├── howitworks/   # Guides & instructions
│       ├── questions/    # Question repository
│       └── upgrade/      # Upgrade plans
├── components/           # Reusable UI components (Radix / Tailwind)
├── utils/                # Database connection, schemas, and AI models
│   ├── db.js             # Neon database client
│   ├── schema.js         # Drizzle database tables & schema definition
│   └── GeminiAIModel.jsx # AI model configuration
├── public/               # Static assets, logos, and illustrations
└── drizzle.config.js     # Drizzle ORM configuration
```

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Prerequisites

- **Node.js** (v18.0 or later)
- **npm** or **yarn** / **pnpm**
- A [Clerk](https://clerk.com) account (for authentication)
- A [Neon](https://neon.tech) account (for PostgreSQL database)
- A [Google AI Studio](https://aistudio.google.com) API Key (or local [Ollama](https://ollama.com) setup)

---

### 2. Clone the Repository

```bash
git clone https://github.com/sakshamwadhankar/vibe-with-ai-kdk-21804.git
cd vibe-with-ai-kdk-21804
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Fill in your configuration keys:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Neon PostgreSQL Database
NEXT_PUBLIC_DRIZZLE_DB_URL=postgresql://...

# AI Model Configuration
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT=5

# Optional Notes
NEXT_PUBLIC_INFORMATION=Welcome to the AI Mock Interview.
NEXT_PUBLIC_QUESTION_NOTE=Ensure your microphone and camera are enabled.
```

---

### 5. Setup Database Schema

Push the Drizzle ORM schema to your Neon PostgreSQL database:

```bash
npm run db:push
```

---

### 6. Run the Development Server

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🔮 Roadmap

- [ ] 📄 **AI Resume Parser**: Upload resumes to generate personalized role-specific interviews.
- [ ] 📈 **Performance Dashboard**: Long-term progress tracking and skill benchmark graphs.
- [ ] 🎧 **Audio Playback**: AI interviewer voice synthesis (Text-to-Speech) for realistic dialog.
- [ ] 🎯 **Custom Interview Creator**: Custom company-specific and difficulty-tuned question sets.

---

## 📄 License

This project is licensed under the [MIT License](./License).

---

## 👤 Author

**Saksham Wadhankar**
- GitHub: [@sakshamwadhankar](https://github.com/sakshamwadhankar)
