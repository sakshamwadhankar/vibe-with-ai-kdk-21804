"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle, Plus, Sparkles } from "lucide-react";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import moment from "moment";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [loading, setLoading] = useState(false);

  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(jobPosition, jobDesc, jobExperience, questionCount);
      const count =
        questionCount ||
        process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT ||
        "5";
      const InputPrompt =
        "Job Position: " +
        jobPosition +
        ", Job Description: " +
        jobDesc +
        ", Years Of Experience: " +
        jobExperience +
        ". Based on this information, provide exactly " +
        count +
        " interview questions with answers in valid JSON array format. Each object must have 'Question' and 'Answer' fields.";

      const result = await chatSession.sendMessage(InputPrompt);
      const rawResponse = result.response.text();
      const jsonMatch = rawResponse.match(/\[[\s\S]*\]/);
      const MockJsonResponse = jsonMatch
        ? jsonMatch[0].trim()
        : rawResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .replace(/\*\*Note\:\*\*(.|\n)*/, "")
            .trim();

      console.log("MockJsonResponse", MockJsonResponse);

      if (!MockJsonResponse || MockJsonResponse === "[]") {
        alert("Failed to generate valid interview questions. Please try again.");
        return;
      }

      setJsonResponse(MockJsonResponse);

      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResponse,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress || "anonymous",
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({
          mockId: MockInterview.mockId,
        });

      console.log("inserted id:", resp);
      setOpenDialog(false);
      if (resp && resp[0]?.mockId) {
        router.push(`/dashboard/interview/${resp[0]?.mockId}`);
      }
    } catch (err) {
      console.error("Error generating interview:", err);
      alert("Error: " + (err.message || "Failed to generate interview. Please check AI provider."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Trigger Card Styled like Landing Page */}
      <div
        className="p-8 border-2 border-dashed border-neutral-800 hover:border-indigo-500/60 rounded-2xl bg-neutral-900/40 hover:bg-neutral-900/70 backdrop-blur-md shadow-xl transition-all cursor-pointer group flex flex-col items-center justify-center text-center gap-3.5"
        onClick={() => setOpenDialog(true)}
      >
        <div className="size-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg shadow-indigo-500/10">
          <Plus className="size-6" />
        </div>
        <div>
          <h3 className="font-semibold text-white text-base group-hover:text-indigo-300 transition-colors">
            + Add New Interview
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Generate custom AI questions & evaluation
          </p>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl p-6 sm:p-8 bg-neutral-950 border border-neutral-800 text-neutral-100 shadow-2xl rounded-2xl">
          <DialogHeader>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-[11px] font-mono text-indigo-300 w-fit mb-2">
              <Sparkles className="size-3" />
              <span>CUSTOM SCENARIO GENERATOR</span>
            </div>
            <DialogTitle className="text-2xl font-bold text-white tracking-tight">
              Plan Your Mock Interview
            </DialogTitle>
            <DialogDescription className="text-sm text-neutral-400">
              Provide your target position, technology stack, and years of experience to simulate accurate hiring rounds.
            </DialogDescription>
            <form onSubmit={onSubmit} className="space-y-5 mt-5 text-left">
              <div>
                <label className="block mb-1.5 text-xs font-mono uppercase tracking-wider text-neutral-300">
                  Target Job Role
                </label>
                <Input
                  placeholder="e.g., Senior Full Stack Engineer"
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                  className="bg-neutral-900/80 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-mono uppercase tracking-wider text-neutral-300">
                  Tech Stack / Job Description
                </label>
                <Textarea
                  placeholder="e.g., React, TypeScript, Next.js, Node.js, PostgreSQL, System Design"
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  className="bg-neutral-900/80 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 rounded-xl min-h-[90px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-xs font-mono uppercase tracking-wider text-neutral-300">
                    Years of Experience
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 3"
                    min="0"
                    max="50"
                    value={jobExperience}
                    onChange={(e) => setJobExperience(e.target.value)}
                    className="bg-neutral-900/80 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-indigo-500 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-xs font-mono uppercase tracking-wider text-neutral-300">
                    Question Count
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 5"
                    min="1"
                    max="15"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(e.target.value)}
                    className="bg-neutral-900/80 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-indigo-500 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800/80">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setOpenDialog(false)}
                  className="text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-xl px-6 shadow-lg shadow-indigo-600/30"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                      Generating Simulation...
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
