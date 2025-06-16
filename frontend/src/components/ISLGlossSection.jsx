import InfoTooltip from "./InfoTooltip";

const ISLGlossSection = ({ isl }) => {
  return (
    <div className="bg-white/80 dark:bg-slate-600/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-xl flex items-center justify-center">
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
                d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-8 14v2a1 1 0 001 1h8a1 1 0 001-1v-2M5 8h14l-1 8H6L5 8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 transition-colors duration-300">
            ISL Gloss
          </h3>
        </div>
        <InfoTooltip content="ISL Gloss is a written notation system for International Sign Language. It represents the structure and grammar of sign language in text form, showing the sequence of signs that would be performed. This is the intermediate step before video translation." />
      </div>
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg p-6 min-h-[220px] border border-blue-200/50 dark:border-blue-700/50 shadow-inner transition-colors duration-300">
        <p className="text-blue-800 dark:text-blue-200 font-mono text-sm leading-relaxed whitespace-pre-wrap font-medium transition-colors duration-300">
          {isl || (
            <span className="text-slate-500 dark:text-slate-400 italic flex items-center space-x-3 font-sans transition-colors duration-300">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 7h14l-1 10H6L5 7z"
                />
              </svg>
              <span>ISL gloss will appear here...</span>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ISLGlossSection;