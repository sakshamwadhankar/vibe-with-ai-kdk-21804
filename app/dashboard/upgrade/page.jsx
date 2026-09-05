"use client";

import { Button } from "@/components/ui/button";
import { BadgeCheck, Sparkles, Zap, Shield, Crown, ArrowRight, Check } from "lucide-react";

export default function UpgradePage() {
  const features = [
    {
      icon: <BadgeCheck className="size-6 text-emerald-400" />,
      title: "Unlimited Mock Interviews",
      description:
        "Practice as many technical and behavioral interview sessions as you need without limits.",
    },
    {
      icon: <Zap className="size-6 text-indigo-400" />,
      title: "Deep AI Answer Analysis",
      description:
        "Detailed evaluations powered by Gemini with breakdown of strengths, missed edge cases, and model responses.",
    },
    {
      icon: <Crown className="size-6 text-amber-400" />,
      title: "Company-Specific Question Sets",
      description:
        "Access questions curated specifically for Google, Amazon, Meta, Microsoft, and high-growth tech startups.",
    },
    {
      icon: <Shield className="size-6 text-blue-400" />,
      title: "Audio & Speech-to-Text Precision",
      description:
        "High-fidelity real-time transcript capture with speech clarity and pacing analysis.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header Deck */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 backdrop-blur-md">
          <Sparkles className="size-3 text-indigo-400" />
          <span className="text-[11px] font-mono tracking-wide text-indigo-200 uppercase">
            Unlock Full Access
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Upgrade to{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Premium
          </span>
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          Elevate your preparation with unrestricted AI simulations, advanced speech metrics, and company-targeted interview tracks.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="p-6 border border-neutral-800/80 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900/80 backdrop-blur-md shadow-xl hover:border-neutral-700 transition-all flex gap-4 items-start group"
          >
            <div className="size-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-bold text-base text-white mb-1 group-hover:text-indigo-200 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Card Showcase */}
      <div className="p-8 sm:p-10 rounded-3xl border border-indigo-500/40 bg-gradient-to-b from-indigo-950/40 via-neutral-900/60 to-neutral-950/80 backdrop-blur-xl shadow-2xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3">
          <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-indigo-600 text-white font-bold tracking-wider">
            MOST POPULAR
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 font-mono text-sm text-indigo-300 mb-2">
          <span>ALL-INCLUSIVE MEMBERSHIP</span>
        </div>

        <div className="flex items-baseline justify-center gap-2 mb-4">
          <span className="text-4xl sm:text-6xl font-black text-white">₹499</span>
          <span className="text-neutral-400 text-lg">/ month</span>
        </div>

        <p className="text-neutral-400 text-sm max-w-sm mx-auto mb-8">
          Unlimited interviews, instant AI feedback, and lifetime tracking history. Cancel anytime.
        </p>

        <div className="max-w-xs mx-auto space-y-2.5 text-left text-xs text-neutral-300 mb-8 font-mono">
          <div className="flex items-center gap-2">
            <Check className="size-4 text-emerald-400" />
            <span>Unlimited AI Question Generation</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="size-4 text-emerald-400" />
            <span>Audio & Webcam Feedback Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="size-4 text-emerald-400" />
            <span>ATS Question Bank & Answers</span>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full max-w-md h-12 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-xl text-base shadow-xl shadow-indigo-600/30 transition-all"
        >
          <span>Upgrade Now</span>
          <ArrowRight className="size-4 ml-2" />
        </Button>
        <p className="text-xs text-neutral-500 mt-3 font-mono">
          Secured by Razorpay • No Hidden Charges • 7-Day Refund Guarantee
        </p>
      </div>
    </div>
  );
}
