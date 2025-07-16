import Transcript from "./Transcript";
import InfoTooltip from "./InfoTooltip";

const LiveTranscriptSection = ({ transcript }) => {
  return (
    <div className="bg-white/80 dark:bg-slate-600/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl p-6 transition-colors duration-300 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 transition-colors duration-300">
            Live Transcript
          </h3>
        </div>
        <InfoTooltip content="This section shows the real-time transcription of your speech as you speak. It captures both final words (confirmed) and interim results (still being processed) to give you immediate feedback on what's being heard." />
      </div>
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-inner transition-colors duration-300 flex-1 min-h-0 overflow-auto">
        <Transcript transcript={transcript} />
      </div>
    </div>
  );
};

export default LiveTranscriptSection;