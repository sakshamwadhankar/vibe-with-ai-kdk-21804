"use client";

import Link from "next/link";
import { Brain, Video, MessageSquare, Star, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: "01",
    icon: <Brain className="size-6 text-indigo-400" />,
    title: "Configure Role & Tech Stack",
    description:
      "Specify your target job position (e.g. Frontend, Backend, DevOps, System Design) and years of experience. Our AI dynamically prepares tailored technical and behavioral prompts.",
  },
  {
    step: "02",
    icon: <Video className="size-6 text-blue-400" />,
    title: "Interactive Voice & Video Session",
    description:
      "Experience realistic interview pressure. Listen to audio questions read by the AI, and speak your answers using real-time speech recognition while maintaining eye contact.",
  },
  {
    step: "03",
    icon: <MessageSquare className="size-6 text-purple-400" />,
    title: "Instant Scoring & Diagnostic Feedback",
    description:
      "Gemini AI evaluates each response out of 10, highlighting your technical strengths, missing core concepts, and displaying optimal model answers.",
  },
  {
    step: "04",
    icon: <Star className="size-6 text-amber-400" />,
    title: "Iterate, Track & Ace the Real Round",
    description:
      "Review past interview sessions in your dashboard, monitor performance improvements over time, and build unshakeable confidence before your actual interview.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header Deck */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 backdrop-blur-md">
          <Sparkles className="size-3 text-indigo-400" />
          <span className="text-[11px] font-mono tracking-wide text-indigo-200 uppercase">
            Step-By-Step Workflow
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          How It{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Works
          </span>
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          Here&apos;s a quick guide to help you understand how our AI interview simulator replicates real-world hiring loops.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-7 border border-neutral-800/80 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900/80 backdrop-blur-md shadow-xl hover:border-neutral-700 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="size-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  {step.icon}
                </div>
                <span className="font-mono text-sm font-bold text-indigo-400 bg-indigo-950/50 border border-indigo-800/50 px-3 py-1 rounded-full">
                  STEP {step.step}
                </span>
              </div>
              <h3 className="font-bold text-lg text-white mb-2 group-hover:text-indigo-200 transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center p-8 rounded-3xl border border-neutral-800/70 bg-neutral-900/40 backdrop-blur-xl">
        <h3 className="text-xl font-bold text-white mb-2">
          Ready to test your readiness?
        </h3>
        <p className="text-neutral-400 text-sm mb-6 max-w-md mx-auto">
          Start a 5-question technical session now and get graded by our AI evaluator.
        </p>
        <Link href="/dashboard">
          <Button className="h-11 px-7 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30">
            <span>Launch Mock Interview</span>
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
