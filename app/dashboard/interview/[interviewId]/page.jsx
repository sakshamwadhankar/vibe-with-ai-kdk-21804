"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Webcam from "react-webcam";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Lightbulb, WebcamIcon, Sparkles, ArrowRight, Briefcase, Code2, Clock } from "lucide-react";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";

const Interview = () => {
  const params = useParams();
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };

  useEffect(() => {
    if (params.interviewId) {
      GetInterviewDetails();
    }
  }, [params.interviewId]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Deck */}
      <div className="pb-4 border-b border-neutral-800/80">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-[11px] font-mono text-indigo-300 mb-3">
          <Sparkles className="size-3" />
          <span>SESSION READINESS CHECK</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Ready to Begin Your{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Mock Interview
          </span>
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base mt-2">
          Verify your interview parameters and enable your webcam to create an authentic simulation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Target Role Parameters Card */}
          <div className="p-6 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 backdrop-blur-md shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Briefcase className="size-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Target Role</span>
                <h3 className="text-base font-bold text-white capitalize">
                  {interviewData?.jobPosition || "Loading..."}
                </h3>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-neutral-800/60">
              <div className="size-9 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                <Code2 className="size-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Tech Stack & Scope</span>
                <p className="text-sm font-medium text-neutral-200">
                  {interviewData?.jobDesc || "Loading..."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-neutral-800/60">
              <div className="size-9 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Clock className="size-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Experience Level</span>
                <p className="text-sm font-semibold text-neutral-200">
                  {interviewData?.jobExperience} Year(s) of Experience
                </p>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="p-5 border border-amber-800/50 bg-amber-950/20 rounded-2xl shadow-lg">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Lightbulb className="size-4" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold">
                Important Instructions
              </span>
            </div>
            <p className="text-amber-200/90 text-xs sm:text-sm leading-relaxed">
              {process.env.NEXT_PUBLIC_INFORMATION ||
                "Please enable your microphone and webcam. Answer each question clearly as you would in a real hiring loop. You can record your answer and receive immediate scoring and feedback."}
            </p>
          </div>
        </div>

        {/* Webcam Section */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 backdrop-blur-md shadow-xl">
          {webCamEnabled ? (
            <div className="w-full flex flex-col items-center">
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                mirrored={true}
                className="rounded-2xl border border-neutral-700 shadow-2xl w-full max-w-md h-[280px] object-cover"
              />
              <span className="text-xs font-mono text-emerald-400 mt-3 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                Webcam & Audio Sensor Active
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-full max-w-md h-[260px] flex flex-col items-center justify-center bg-neutral-950/80 border border-neutral-800 rounded-2xl p-6 text-center shadow-inner">
                <WebcamIcon className="size-16 text-neutral-600 mb-3" />
                <p className="text-xs font-mono text-neutral-400">
                  Camera feed currently disabled
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setWebCamEnabled(true)}
                className="w-full max-w-md h-11 border-neutral-700 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white rounded-xl font-medium"
              >
                <span>🎥 Enable Webcam & Audio</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-neutral-800/80">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button className="h-12 px-8 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-xl text-base shadow-lg shadow-indigo-600/30">
            <span>Start Mock Interview</span>
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
