'use client';

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Bot,
  Video,
  BarChart3,
  CheckCircle2,
  Terminal,
  Star,
  Zap,
  Play,
  Pause,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import KineticMatrix, { KineticMatrixRef } from "@/components/ui/kinetic-matrix";

const userAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
];

export default function Home() {
  const matrixRef = useRef<KineticMatrixRef | null>(null);

  const handleTriggerPulse = () => {
    matrixRef.current?.triggerCentralImpulse();
  };

  const handleToggleFreeze = () => {
    matrixRef.current?.toggleRunning();
  };

  return (
    <div className="relative min-h-screen text-neutral-100 flex flex-col selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden">
      {/* 1. FULL-SCREEN EDGE-TO-EDGE KINETIC MATRIX BACKGROUND (NO BOX) */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <KineticMatrix
          ref={matrixRef}
          title=""
          className="w-full h-full bg-[#06070a]"
          showControls={false}
          interactiveWindow={true}
        />
        {/* Subtle radial vignette gradient to ensure optimal readability while keeping the matrix fully alive */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-neutral-950/80 pointer-events-none" />
      </div>

      {/* 2. Global Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-800/50 bg-neutral-950/60 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <Image
                src="/logo.svg"
                width={22}
                height={22}
                alt="AI Interview Mocker Logo"
                className="brightness-0 invert"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-300 bg-clip-text text-transparent">
                AI Interview Mocker
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-600/40 text-indigo-300">
                LIVE AI
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <Link href="/dashboard/questions" className="hover:text-white transition-colors">
              Questions
            </Link>
            <Link
              href="/demo"
              className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Terminal className="size-3.5" />
              <span>Canvas Demo</span>
            </Link>
          </nav>

          {/* Top Actions: Background Shockwave Trigger + Auth CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 bg-neutral-900/70 border border-neutral-800/80 rounded-lg p-1 backdrop-blur-sm">
              <button
                onClick={handleTriggerPulse}
                className="flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 transition-colors"
                title="Trigger Shockwave Ripple across Background"
              >
                <Sparkles className="size-3 text-indigo-400" />
                <span className="hidden sm:inline">PULSE</span>
              </button>
              <button
                onClick={handleToggleFreeze}
                className="text-[11px] font-mono px-2 py-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
                title="Pause or Run Matrix Physics"
              >
                <Play className="size-3" />
              </button>
            </div>

            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="text-neutral-300 hover:text-white hover:bg-neutral-800/60 text-sm"
              >
                Login
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-600/30 text-sm font-medium px-4 py-2 rounded-lg transition-all">
                Get Started
                <ArrowRight className="size-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Main Hero Stage (Floating Directly on Full Background Matrix) */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 backdrop-blur-md mb-8 shadow-lg shadow-indigo-500/10">
          <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono tracking-wide text-indigo-200 uppercase">
            Interactive Neural Lattice • Click Anywhere to Ripple
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="max-w-5xl font-black tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-6">
          Ace Your Tech Interview with{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
            Real-Time AI Intelligence
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-neutral-300 text-base sm:text-lg md:text-xl leading-relaxed mb-10 font-normal">
          Simulate realistic technical and behavioral interviews with webcam & voice evaluation.
          Receive instantaneous scoring, pinpoint strengths, and review optimal answers.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
          <Link href="/dashboard">
            <Button className="w-full sm:w-auto h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white text-base font-semibold shadow-xl shadow-indigo-600/30 rounded-xl transition-all group">
              Start Mock Interview
              <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            onClick={handleTriggerPulse}
            variant="outline"
            className="w-full sm:w-auto h-12 px-7 border-neutral-700/80 bg-neutral-900/60 hover:bg-neutral-800/80 text-neutral-200 text-base font-medium rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
          >
            <Sparkles className="size-4 text-indigo-400" />
            <span>Trigger Wave</span>
          </Button>
          <Link href="/dashboard/howitworks">
            <Button
              variant="ghost"
              className="w-full sm:w-auto h-12 px-6 text-neutral-300 hover:text-white hover:bg-neutral-800/40 text-base font-medium rounded-xl"
            >
              How It Works
            </Button>
          </Link>
        </div>

        {/* Social Proof Avatars */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-neutral-400 mb-16">
          <div className="flex -space-x-2.5 overflow-hidden">
            {userAvatars.map((url, idx) => (
              <Image
                key={idx}
                src={url}
                alt={`Candidate ${idx + 1}`}
                width={36}
                height={36}
                className="inline-block size-9 rounded-full ring-2 ring-neutral-900 object-cover"
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-neutral-200">4.9/5</span>
            <span className="text-neutral-500">•</span>
            <span>Over 12,000+ candidates trained for Google, Amazon, Meta & Microsoft</span>
          </div>
        </div>

        {/* Floating Live Simulation Card (Translucent over the Matrix) */}
        <div className="w-full max-w-2xl p-6 rounded-3xl bg-neutral-950/75 border border-neutral-800/70 backdrop-blur-xl shadow-2xl shadow-black/50 text-left">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800/60">
            <div className="flex items-center gap-2.5">
              <span className="size-2.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                Live AI Interview Simulation
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-700/50 px-2.5 py-0.5 rounded-full">
                AI Rating: 9.4 / 10
              </span>
            </div>
          </div>

          <p className="text-base sm:text-lg font-medium text-neutral-100 mb-4 leading-snug">
            &ldquo;Can you explain how you design distributed rate limiting to handle 100k requests per second?&rdquo;
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-400" />
              <span>Token Bucket & Redis cluster evaluation validated</span>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Start Practice Session <ChevronRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </main>

      {/* 4. Core Features Section (Glassmorphism Cards over Full Background) */}
      <section id="features" className="relative z-10 py-20 border-t border-neutral-800/40 bg-neutral-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-3">
              Comprehensive Interview Intelligence
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Everything required to ace tough technical rounds
            </p>
            <p className="text-neutral-400 text-sm sm:text-base">
              Engineered with advanced LLM reasoning, audio analysis, and question generation tailored to your domain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-7 rounded-2xl bg-neutral-900/50 border border-neutral-800/70 hover:border-neutral-700 backdrop-blur-lg transition-all hover:-translate-y-1 shadow-lg">
              <div className="size-11 rounded-xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center mb-5 text-indigo-400">
                <Video className="size-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Voice & Webcam Simulation
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Practice answering with your microphone and camera. Experience realistic interview pressure and record your answers seamlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-7 rounded-2xl bg-neutral-900/50 border border-neutral-800/70 hover:border-neutral-700 backdrop-blur-lg transition-all hover:-translate-y-1 shadow-lg">
              <div className="size-11 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center mb-5 text-blue-400">
                <Bot className="size-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Adaptive Role Tailoring
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Configure your job position, tech stack, and seniority. Questions dynamically match real industry requirements.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-7 rounded-2xl bg-neutral-900/50 border border-neutral-800/70 hover:border-neutral-700 backdrop-blur-lg transition-all hover:-translate-y-1 shadow-lg">
              <div className="size-11 rounded-xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center mb-5 text-purple-400">
                <BarChart3 className="size-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Instant Analytical Feedback
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Get an objective rating out of 10 for every question, complete with candidate strengths, missed points, and ideal answers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-20 border-t border-neutral-800/40 bg-neutral-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-3">
              Streamlined Workflow
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Three steps to complete interview confidence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-md">
              <div className="size-12 rounded-full bg-neutral-950 border border-indigo-500/40 text-indigo-400 font-mono font-bold flex items-center justify-center mb-4 text-lg shadow-lg shadow-indigo-500/10">
                01
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Configure Your Target Role</h4>
              <p className="text-sm text-neutral-400">
                Input your role title, tech stack, and experience level to generate targeted questions.
              </p>
            </div>

            <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-md">
              <div className="size-12 rounded-full bg-neutral-950 border border-indigo-500/40 text-indigo-400 font-mono font-bold flex items-center justify-center mb-4 text-lg shadow-lg shadow-indigo-500/10">
                02
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Record Answers with AI</h4>
              <p className="text-sm text-neutral-400">
                Listen to the AI interviewer, speak your answers with speech-to-text, and record seamlessly.
              </p>
            </div>

            <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-md">
              <div className="size-12 rounded-full bg-neutral-950 border border-indigo-500/40 text-indigo-400 font-mono font-bold flex items-center justify-center mb-4 text-lg shadow-lg shadow-indigo-500/10">
                03
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Review Granular Feedback</h4>
              <p className="text-sm text-neutral-400">
                Receive ratings out of 10, compare against recommended answers, and track your progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call To Action Footer Banner */}
      <section className="relative z-10 py-16 border-t border-neutral-800/40 bg-neutral-950/70 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/70 border border-neutral-800/80 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to nail your upcoming interview?
            </h3>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base mb-8">
              Join thousands of candidates who transformed their technical & behavioral skills with AI Interview Mocker.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/dashboard">
                <Button className="h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30">
                  Get Started for Free
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="h-12 px-8 border-neutral-700 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 font-medium rounded-xl"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="relative z-10 border-t border-neutral-800/40 py-8 text-neutral-500 text-xs bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              width={16}
              height={16}
              alt="Logo"
              className="brightness-0 invert opacity-60"
            />
            <span>&copy; {new Date().getFullYear()} AI Interview Mocker. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-neutral-300 transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard/questions" className="hover:text-neutral-300 transition-colors">
              Questions
            </Link>
            <Link href="/dashboard/upgrade" className="hover:text-neutral-300 transition-colors">
              Upgrade
            </Link>
            <Link href="/demo" className="hover:text-neutral-300 transition-colors">
              Canvas Demo
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
