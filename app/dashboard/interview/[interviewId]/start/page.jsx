"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import Questions from "./_components/Questions";
import RecordingAns from "./_components/RecordingAns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = () => {
  const params = useParams();

  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQns, setMockInterviewQns] = useState();
  const [activeQnIndex, setActiveQnIndex] = useState(0);

  const GetInterviewDetails = async () => {
    if (!params?.interviewId) return;
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result && result.length > 0 && result[0]?.jsonMockResp) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log("Loaded interview questions:", jsonMockResp);
        setMockInterviewQns(jsonMockResp);
        setInterviewData(result[0]);
      }
    } catch (err) {
      console.error("Failed to load interview details:", err);
    }
  };

  useEffect(() => {
    if (params?.interviewId) {
      GetInterviewDetails();
    }
  }, [params?.interviewId]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <Questions
          mockInterviewQns={mockInterviewQns}
          activeQnIndex={activeQnIndex}
        />

        {/* Video / Audio */}
        <RecordingAns
          mockInterviewQns={mockInterviewQns}
          activeQnIndex={activeQnIndex}
          interviewData={interviewData}
        />
      </div>

      <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-neutral-800/80">
        {activeQnIndex > 0 && (
          <Button
            variant="outline"
            className="border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl h-11 px-6"
            onClick={() => setActiveQnIndex(activeQnIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQnIndex != mockInterviewQns?.length - 1 && (
          <Button
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl h-11 px-6 shadow-md shadow-indigo-600/20"
            onClick={() => setActiveQnIndex(activeQnIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQnIndex == mockInterviewQns?.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button className="bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl h-11 px-7 shadow-lg shadow-rose-600/25">
              End Interview & View Feedback
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
