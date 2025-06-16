import ISLVideoPlayer from "./ISLVideoPlayer";
import WordDatabaseBrowser from "./WordDatabaseBrowser";
import InfoTooltip from "./InfoTooltip";

const ISLVideoSection = ({ isl, transcript }) => {
  return (
    <div className="bg-white/80 dark:bg-slate-600/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl p-6 transition-colors duration-300">
      <div className="text-center mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center justify-center space-x-3 flex-1">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-300 dark:to-teal-300 bg-clip-text text-transparent transition-colors duration-300">
              ISL Video Translation
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <WordDatabaseBrowser />
            <InfoTooltip content="This section displays the final video translation of your speech into International Sign Language. The avatar performs the actual signs corresponding to your spoken words, providing a visual representation that deaf and hard-of-hearing individuals can understand." />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-inner min-h-[520px] transition-colors duration-300">
        <ISLVideoPlayer islTranslation={isl} liveTranscription={transcript} />
      </div>
    </div>
  );
};

export default ISLVideoSection;