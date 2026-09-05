"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, ArrowRight } from "lucide-react";

const mockQuestions = [
  {
    id: 1,
    question: "Explain the concept of closures in JavaScript and how they affect memory management.",
    category: "Frontend",
    difficulty: "Medium",
  },
  {
    id: 2,
    question: "What is database normalization, and when would you intentionally denormalize a schema?",
    category: "Backend",
    difficulty: "Easy",
  },
  {
    id: 3,
    question: "What happens during an operating system context switch, and what registers are saved?",
    category: "CS Fundamentals",
    difficulty: "Hard",
  },
  {
    id: 4,
    question: "Design a URL shortening service like Bit.ly that handles 100M redirects per day.",
    category: "System Design",
    difficulty: "Hard",
  },
  {
    id: 5,
    question: "Explain how React's Virtual DOM diffing algorithm achieves O(n) heuristic complexity.",
    category: "Frontend",
    difficulty: "Medium",
  },
  {
    id: 6,
    question: "Describe a time when you had a technical disagreement with a teammate and how you resolved it.",
    category: "HR",
    difficulty: "Easy",
  },
  {
    id: 7,
    question: "Implement an LRU Cache with O(1) get and put operations using a doubly linked list and hash map.",
    category: "DSA",
    difficulty: "Medium",
  },
  {
    id: 8,
    question: "How does optimistic locking differ from pessimistic locking in high-concurrency systems?",
    category: "Backend",
    difficulty: "Medium",
  },
];

export default function QuestionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "DSA",
    "System Design",
    "CS Fundamentals",
    "HR",
  ];

  const filteredQuestions =
    selectedCategory === "All"
      ? mockQuestions
      : mockQuestions.filter((q) => q.category === selectedCategory);

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-950/60 border-emerald-800/50 text-emerald-400";
      case "Medium":
        return "bg-amber-950/60 border-amber-800/50 text-amber-400";
      case "Hard":
        return "bg-rose-950/60 border-rose-800/50 text-rose-400";
      default:
        return "bg-neutral-800 border-neutral-700 text-neutral-300";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Deck */}
      <div className="pb-6 border-b border-neutral-800/80">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/40 backdrop-blur-md mb-3">
          <Sparkles className="size-3 text-indigo-400" />
          <span className="text-[11px] font-mono tracking-wide text-indigo-200 uppercase">
            Curated Question Bank
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
          <Brain className="size-8 text-indigo-400" />
          Practice Interview{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Questions
          </span>
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
          Browse real interview questions curated from top tech companies. Filter by domain and launch custom mock simulations.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white border border-indigo-500 shadow-md shadow-indigo-600/30 font-semibold"
                : "bg-neutral-900/60 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Questions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="p-6 border border-neutral-800/80 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900/80 backdrop-blur-md shadow-xl hover:border-neutral-700 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-800/80 border border-neutral-700/60 text-neutral-300">
                  {q.category}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase ${getDifficultyBadge(
                    q.difficulty
                  )}`}
                >
                  {q.difficulty}
                </span>
              </div>
              <h3 className="font-semibold text-white text-base leading-snug group-hover:text-indigo-200 transition-colors">
                {q.question}
              </h3>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/60">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-9 rounded-xl border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-medium group-hover:border-indigo-500/40"
                >
                  <span>Practice In Simulator</span>
                  <ArrowRight className="size-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="p-12 text-center text-neutral-500 italic rounded-2xl border border-neutral-800/60 bg-neutral-900/30">
          No questions found for this category.
        </div>
      )}
    </div>
  );
}
