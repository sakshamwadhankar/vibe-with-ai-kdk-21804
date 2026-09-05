import { Lightbulb, Volume2 } from "lucide-react";

const Questions = ({ mockInterviewQns, activeQnIndex }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech!");
    }
  };

  return (
    mockInterviewQns && (
      <div className="p-6 border border-neutral-800/80 rounded-2xl bg-neutral-900/50 backdrop-blur-md shadow-xl my-6 flex flex-col justify-between">
        <div>
          {/* Question Index Pills */}
          <div className="flex flex-wrap gap-2.5 mb-6">
            {mockInterviewQns.map((qn, index) => (
              <button
                key={index}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                  activeQnIndex === index
                    ? "bg-indigo-600 text-white border border-indigo-500 shadow-md shadow-indigo-600/30 font-bold"
                    : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                Question #{index + 1}
              </button>
            ))}
          </div>

          {/* Current Question Text */}
          <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed mb-6">
            {mockInterviewQns[activeQnIndex]?.Question}
          </h2>

          <button
            onClick={() =>
              textToSpeech(mockInterviewQns[activeQnIndex]?.Question)
            }
            className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            title="Listen to question audio"
          >
            <Volume2 className="size-4" />
            <span>Read Question Aloud</span>
          </button>
        </div>

        {/* Note Box */}
        <div className="border border-indigo-900/50 rounded-2xl p-5 bg-indigo-950/20 mt-10">
          <div className="flex gap-2 items-center text-indigo-300 mb-1.5">
            <Lightbulb className="size-4 text-indigo-400" />
            <strong className="font-mono text-xs uppercase tracking-wider">
              Simulation Note
            </strong>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE ||
              "Click 'Record Answer' when ready. Speak clearly into your microphone. Once finished, click 'Stop Recording' to submit and generate AI analysis."}
          </p>
        </div>
      </div>
    )
  );
};

export default Questions;
