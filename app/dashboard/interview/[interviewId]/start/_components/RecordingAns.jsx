"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { useUser } from "@clerk/nextjs";

import {
  AlertTriangleIcon,
  CheckCircleIcon,
  Mic,
  StopCircleIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import moment from "moment";
import { UserAnswer } from "@/utils/schema";

const RecordingAns = ({ mockInterviewQns, activeQnIndex, interviewData }) => {
  const [userAns, setUserAns] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.forEach((result) => {
      setUserAns((prev) => prev + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAns.length > 10) {
      updateUserAns();
    }
  }, [userAns]);

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAns("");
      setResults([]);
      startSpeechToText();
    }
  };

  const updateUserAns = async () => {
    console.log("Submitting User Answer: ", userAns);
    if (!userAns || userAns.trim().length < 5) {
      toast.error("Answer is too short. Please speak or type your answer.");
      return;
    }

    setLoading(true);
    toast.info("Evaluating your answer with AI...");
    try {
      const currentQn = mockInterviewQns?.[activeQnIndex]?.Question || "Interview Question";
      const currentAns = mockInterviewQns?.[activeQnIndex]?.Answer || "";

      const feedbackPrompt =
        "Question: " +
        currentQn +
        ", User Answer: " +
        userAns +
        ". Based on the question and user answer, please provide a rating (out of 10) and construct practical feedback for improvement. " +
        "Provide your response in JSON format with 'rating' and 'feedback' fields. " +
        "Keep the feedback brief (3-5 lines) and focus on areas of improvement.";

      const result = await chatSession.sendMessage(feedbackPrompt);
      const rawFeedback = result.response.text();
      const jsonMatch = rawFeedback.match(/\{[\s\S]*\}/);
      let jsonResponse = {};
      try {
        jsonResponse = JSON.parse(
          jsonMatch
            ? jsonMatch[0]
            : rawFeedback.replace(/```json/g, "").replace(/```/g, "").trim()
        );
      } catch (err) {
        console.error("Failed to parse JSON feedback:", err);
        jsonResponse = { feedback: rawFeedback, rating: "5" };
      }

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: currentQn,
        correctAns: currentAns,
        userAns: userAns,
        feedback: jsonResponse?.feedback || "Answer recorded.",
        rating: String(jsonResponse?.rating || "5"),
        userEmail: user?.primaryEmailAddress?.emailAddress || "anonymous",
        createdAt: moment().format("DD-MM-YYYY"),
      });

      if (resp) {
        toast.success("Your answer and AI feedback have been saved successfully.");
        setUserAns("");
        setResults([]);
      }
    } catch (error) {
      console.error("Error saving user answer feedback:", error);
      toast.error("Failed to evaluate answer. " + (error.message || ""));
    } finally {
      setLoading(false);
      setResults([]);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col my-6">
      <div className="relative w-full max-w-md h-[320px] flex flex-col justify-center items-center bg-neutral-950 border border-neutral-800/80 rounded-3xl overflow-hidden shadow-2xl p-4">
        <Image
          src="/webcam.png"
          width={180}
          height={180}
          className="absolute opacity-40"
          alt="Webcam placeholder"
          priority
        />
        <Webcam
          mirrored={true}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "1rem",
            zIndex: 10,
          }}
        />
        {isRecording && (
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-600/60 text-[10px] font-mono text-rose-300">
            <span className="size-2 rounded-full bg-rose-500 animate-ping" />
            <span>REC</span>
          </div>
        )}
      </div>

      <Button
        disabled={loading}
        className={`my-8 h-12 px-8 rounded-xl font-semibold shadow-lg transition-all ${
          isRecording
            ? "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 animate-pulse"
            : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-indigo-600/30"
        }`}
        onClick={startStopRecording}
      >
        {isRecording ? (
          <span className="flex items-center gap-2">
            <StopCircleIcon className="size-4" />
            Stop Recording Answer
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Mic className="size-4" />
            Record Answer
          </span>
        )}
      </Button>
    </div>
  );
};

export default RecordingAns;
