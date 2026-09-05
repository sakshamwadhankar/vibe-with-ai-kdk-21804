"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, Sparkles, Award, ArrowLeft, CheckCircle2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const Feedback = () => {
  const params = useParams();
  const router = useRouter();

  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.interviewId) {
      const getFeedback = async () => {
        try {
          const result = await db
            .select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id);
          setFeedbackList(result);
        } catch (err) {
          console.error("Error fetching feedback:", err);
        } finally {
          setLoading(false);
        }
      };
      getFeedback();
    }
  }, [params.interviewId]);

  const averageRating =
    feedbackList.length > 0
      ? (
          feedbackList.reduce((sum, item) => {
            const rating = parseFloat(item.rating?.split("/")[0]);
            return !isNaN(rating) && rating > 0 ? sum + rating : sum;
          }, 0) / feedbackList.length
        ).toFixed(1)
      : "N/A";

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
      {feedbackList.length === 0 && !loading ? (
        <div className="p-12 rounded-3xl border border-neutral-800/80 bg-neutral-900/50 backdrop-blur-md text-center max-w-lg mx-auto">
          <h2 className="text-xl font-bold text-white mb-2">
            No Interview Feedback Recorded
          </h2>
          <p className="text-neutral-400 text-sm mb-6">
            Answers were not recorded for this interview session yet.
          </p>
          <Button
            onClick={() => router.replace("/dashboard")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl"
          >
            Back to Dashboard
          </Button>
        </div>
      ) : (
        <>
          {/* Top Score Summary Card */}
          <div className="p-8 sm:p-10 rounded-3xl border border-neutral-800/80 bg-neutral-900/50 backdrop-blur-xl shadow-2xl text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-[11px] font-mono text-emerald-300">
              <Award className="size-3.5" />
              <span>INTERVIEW COMPLETED</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Evaluation &{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Diagnostic Feedback
              </span>
            </h1>

            <div className="flex items-center justify-center gap-3 py-3">
              <span className="text-neutral-400 text-sm font-mono uppercase tracking-wider">
                Overall AI Rating:
              </span>
              <span className="text-3xl sm:text-4xl font-black text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-4 py-1 rounded-2xl font-mono">
                {averageRating} / 5
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
              Expand each question below to inspect your transcript, comparison against ideal answers, and concrete suggestions for leveling up.
            </p>
          </div>

          {/* Question Collapsibles */}
          <div className="space-y-4">
            {feedbackList.map((item, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger className="w-full px-5 py-4 bg-neutral-900/70 border border-neutral-800/80 hover:border-neutral-700 rounded-2xl text-left hover:bg-neutral-850 transition flex justify-between items-center text-sm font-semibold text-white group cursor-pointer shadow-md">
                  <div className="flex items-center gap-3 pr-4">
                    <span className="font-mono text-xs text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 px-2 py-0.5 rounded">
                      Q{index + 1}
                    </span>
                    <span className="line-clamp-1">{item.question}</span>
                  </div>
                  <ChevronsUpDown className="size-4 text-neutral-400 group-hover:text-white transition-colors flex-shrink-0" />
                </CollapsibleTrigger>

                <CollapsibleContent className="bg-neutral-950/90 border border-neutral-800/80 rounded-2xl p-5 space-y-3.5 mt-2 shadow-2xl">
                  <div className="text-xs font-mono bg-neutral-900/80 border-l-4 border-amber-400 p-3.5 rounded-xl flex items-center justify-between">
                    <strong className="text-amber-300">📊 QUESTION RATING:</strong>
                    <span className="text-amber-200 font-bold">{item.rating}</span>
                  </div>

                  <div className="text-xs bg-neutral-900/50 border-l-4 border-rose-500/80 p-3.5 rounded-xl space-y-1">
                    <strong className="text-rose-400 block font-mono uppercase text-[11px]">
                      Your Recorded Answer:
                    </strong>
                    <p className="text-neutral-300 leading-relaxed">
                      {item.userAns || "No speech detected."}
                    </p>
                  </div>

                  <div className="text-xs bg-neutral-900/50 border-l-4 border-emerald-500/80 p-3.5 rounded-xl space-y-1">
                    <strong className="text-emerald-400 block font-mono uppercase text-[11px]">
                      Optimal Model Response:
                    </strong>
                    <p className="text-neutral-300 leading-relaxed">
                      {item.correctAns}
                    </p>
                  </div>

                  <div className="text-xs bg-indigo-950/30 border-l-4 border-indigo-500 p-3.5 rounded-xl space-y-1">
                    <strong className="text-indigo-300 block font-mono uppercase text-[11px]">
                      💡 AI Performance Analysis:
                    </strong>
                    <p className="text-indigo-100/90 leading-relaxed">
                      {item.feedback}
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </>
      )}

      {/* Navigation Return */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={() => router.replace("/dashboard")}
          className="h-11 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2"
        >
          <ArrowLeft className="size-4" />
          <span>Return to Dashboard</span>
        </Button>
      </div>
    </div>
  );
};

export default Feedback;
