import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { Calendar, Briefcase, Play, MessageSquareQuote } from "lucide-react";

const InterviewCard = ({ interview }) => {
  const router = useRouter();

  const onStart = () => {
    router.push(`/dashboard/interview/${interview.mockId}`);
  };

  const onFeedback = () => {
    router.push(`/dashboard/interview/${interview.mockId}/feedback`);
  };

  return (
    <div className="border border-neutral-800/80 bg-neutral-900/50 hover:bg-neutral-900/80 backdrop-blur-md rounded-2xl p-5 shadow-xl hover:border-neutral-700 transition-all hover:-translate-y-1 flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="size-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
            <Briefcase className="size-4" />
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-800/80 border border-neutral-700/60 text-neutral-300">
            {interview?.jobExperience} Yrs Exp
          </span>
        </div>

        <h3 className="font-bold text-lg text-white capitalize tracking-tight group-hover:text-indigo-300 transition-colors line-clamp-1">
          {interview?.jobPosition}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-2 font-mono">
          <Calendar className="size-3 text-neutral-600" />
          <span>Created on {interview?.createdAt}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-neutral-800/70">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 h-9 rounded-xl border-neutral-800 bg-neutral-900/70 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-medium"
          onClick={onFeedback}
        >
          <MessageSquareQuote className="size-3.5 mr-1.5 text-neutral-400" />
          Feedback
        </Button>
        <Button
          size="sm"
          className="flex-1 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20"
          onClick={onStart}
        >
          <Play className="size-3 mr-1.5 fill-white" />
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewCard;
