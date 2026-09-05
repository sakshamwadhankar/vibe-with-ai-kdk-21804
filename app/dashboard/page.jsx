import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import { Sparkles, Bot, Target } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-10">
      {/* Header Deck */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/40 backdrop-blur-md mb-3">
            <Sparkles className="size-3 text-indigo-400" />
            <span className="text-[11px] font-mono tracking-wide text-indigo-200 uppercase">
              AI Interview Workspace
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Interview{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
            Configure custom interview personas, simulate live questions with voice & video, and review granular AI feedback.
          </p>
        </div>

        {/* Quick Info Badges */}
        <div className="hidden lg:flex items-center gap-3 text-xs font-mono">
          <div className="px-3.5 py-2 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-2">
            <Bot className="size-4 text-indigo-400" />
            <span className="text-neutral-300">Gemini 1.5 Flash</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-2">
            <Target className="size-4 text-emerald-400" />
            <span className="text-neutral-300">Adaptive Scoring</span>
          </div>
        </div>
      </div>

      {/* Primary Action Section: Create New Interview */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AddNewInterview />
        </div>
      </section>

      {/* History / Interview List */}
      <section className="pt-4">
        <InterviewList />
      </section>
    </div>
  );
};

export default Dashboard;
