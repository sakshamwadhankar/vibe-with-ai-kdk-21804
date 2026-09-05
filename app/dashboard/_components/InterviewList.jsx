"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";
import { History, Bot, Sparkles } from "lucide-react";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInterviewList = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(MockInterview.id));

      setInterviewList(result);
    } catch (err) {
      console.error("Error fetching interviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getInterviewList();
    }
  }, [user]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <History className="size-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white tracking-tight">
            Previous Interviews
          </h2>
        </div>
        {interviewList.length > 0 && (
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
            {interviewList.length} Sessions
          </span>
        )}
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-44 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 animate-pulse"
            />
          ))}
        </div>
      ) : interviewList.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {interviewList.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-3xl border border-neutral-800/60 bg-neutral-900/30 backdrop-blur-md text-center max-w-xl mx-auto flex flex-col items-center justify-center">
          <div className="size-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mb-4 shadow-inner">
            <Bot className="size-7 text-indigo-400/60" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">
            No Previous Interviews Found
          </h3>
          <p className="text-sm text-neutral-400 max-w-sm mb-6">
            You haven&apos;t created any mock interviews yet. Click &ldquo;Add New Interview&rdquo; above to generate your first technical practice session.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-900/50 px-3 py-1 rounded-full">
            <Sparkles className="size-3" />
            <span>Ready for your first session</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewList;
