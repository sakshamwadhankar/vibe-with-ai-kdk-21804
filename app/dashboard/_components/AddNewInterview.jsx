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
import { LoaderCircle } from "lucide-react";

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
      <div
        className="p-10 border-2 border-dashed rounded-xl bg-white hover:bg-gray-100 hover:shadow-lg transition-all text-center cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-medium text-gray-700">+ Add New Interview</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              Plan Your Mock Interview
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Fill in the job role, tech stack, experience, and preferred number of questions.
            </DialogDescription>
            <form onSubmit={onSubmit} className="space-y-6 mt-6">
              <div>
                <label className="block mb-2 font-medium">Job Role</label>
                <Input
                  placeholder="e.g., Frontend Developer"
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Tech Stack</label>
                <Textarea
                  placeholder="e.g., React, TypeScript, TailwindCSS"
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium">
                    Years of Experience
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 2"
                    min="0"
                    max="50"
                    value={jobExperience}
                    onChange={(e) => setJobExperience(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">
                    Number of Questions
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 3 or 5"
                    min="1"
                    max="15"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Button variant="ghost" type="button" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                      Generating...
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
