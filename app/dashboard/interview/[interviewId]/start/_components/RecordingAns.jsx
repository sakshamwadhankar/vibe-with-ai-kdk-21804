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
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src="/webcam.png"
          width={200}
          height={200}
          className="absolute"
          alt="Webcam"
          priority
        />
        <Webcam
          mirrored={true}
          style={{
            width: "100%",
            height: 300,
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10 "
        onClick={startStopRecording}
      >
        {isRecording ? (
          <>
            <h2 className="flex items-center gap-x-2 text-red-500 animate-pulse">
              <StopCircleIcon />
              Stop Recording
            </h2>
          </>
        ) : (
          <h2 className="flex items-center gap-x-2 text-primary">
            <Mic />
            Record Answer...
          </h2>
        )}
      </Button>
    </div>
  );
};

export default RecordingAns;
