import { useState } from "react";
import { WORD_DATABASE } from "./wordDatabase.js";

const WordDatabaseBrowser = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredWords = WORD_DATABASE.filter(word =>
    word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`relative ${className}`}>
      <button
        className="w-5 h-5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-200"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)} // Add click for mobile
      >
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 top-5 w-72 sm:w-80 max-w-[85vw] bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 z-20 transition-colors duration-300"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Arrow pointer */}
          <div className="absolute -top-1 right-2 w-2 h-2 bg-white dark:bg-slate-800 border-t border-l border-slate-200 dark:border-slate-700 transform rotate-45 transition-colors duration-300"></div>
          
          {/* Header */}
          <div className="p-2 sm:p-3 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-300">
              Word Database ({WORD_DATABASE.length} words)
            </h3>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search words..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-300"
              />
            </div>
          </div>
          
          {/* Words List */}
          <div className="max-h-40 sm:max-h-56 overflow-y-auto p-1.5 sm:p-2">
            {filteredWords.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-0.5 sm:gap-1">
                {filteredWords.map((word, index) => (
                  <div
                    key={index}
                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs text-slate-700 dark:text-slate-300 rounded transition-colors duration-300"
                  >
                    {word}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 sm:py-6 text-slate-500 dark:text-slate-400 text-xs sm:text-sm transition-colors duration-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-slate-300 dark:text-slate-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="px-2">
                  No words found matching "{searchTerm}"
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="p-2 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-b-lg transition-colors duration-300">
            <p className="text-xs text-slate-600 dark:text-slate-400 text-center transition-colors duration-300">
              Browse available words
            </p>
          </div>
          
          {/* Mobile close button */}
          <button
            className="absolute top-2 right-2 sm:hidden w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default WordDatabaseBrowser;