import ThemeToggle from './ThemeToggle';
import Microphone from './Microphone';

const Header = ({ isRecording, toggleRecording, isProcessing }) => {
  return (
    <header className="relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-white/20 dark:border-slate-700/20 shadow-lg">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-3">
        {/* Mobile Layout - Stacked */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h1 
                className="text-lg font-bold bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 dark:from-blue-400 dark:via-indigo-400 dark:to-sky-400 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => window.location.reload()}
              >
                SoundSigns
              </h1>
            </div>
            <ThemeToggle />
          </div>
          <div className="flex justify-center">
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <p className="text-gray-600 dark:text-slate-300 font-medium text-xs">
                  Processing
                </p>
                <div className="p-2">
                  <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-200">
                  Please wait...
                </p>
              </div>
            ) : (
              <div className="relative">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500 rounded-full opacity-30 blur-lg animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400 rounded-full opacity-20 blur-xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
                {/* Ping animation dots */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-blue-400 to-sky-400 dark:from-blue-300 dark:to-sky-300 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-blue-400 to-sky-400 dark:from-blue-300 dark:to-sky-300 rounded-full animate-ping opacity-75" style={{animationDelay: '1s'}}></div>
                <div className="relative">
                  <Microphone
                    isRecording={isRecording}
                    toggleRecording={toggleRecording}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout - Grid */}
        <div className="hidden sm:grid grid-cols-3 items-center gap-2 lg:gap-4">
          {/* Left - Title */}
          <div className="justify-self-start min-w-0">
            <div className="text-left relative flex items-center gap-2 lg:gap-3">
              <div className="flex-shrink-0">
                <h1 
                  className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 dark:from-blue-400 dark:via-indigo-400 dark:to-sky-400 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => window.location.reload()}
                >
                  SoundSigns
                </h1>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs font-medium tracking-wide whitespace-nowrap hidden md:block">
                Voice to Sign Language Bridge
              </p>
            </div>
          </div>

          {/* Center - Microphone or Processing */}
          <div className="justify-self-center">
            <div className="text-center">
              {isProcessing ? (
                <div className="flex items-center gap-1 sm:gap-2">
                  <p className="text-gray-600 dark:text-slate-300 font-medium text-xs hidden sm:block">
                    Processing
                  </p>
                  <div className="p-2">
                    <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-200 hidden sm:block">
                    Please wait...
                  </p>
                </div>
              ) : (
                <div className="relative">
                  {/* Glowing background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500 rounded-full opacity-30 blur-lg animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400 rounded-full opacity-20 blur-xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  {/* Ping animation dots */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-blue-400 to-sky-400 dark:from-blue-300 dark:to-sky-300 rounded-full animate-ping"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-blue-400 to-sky-400 dark:from-blue-300 dark:to-sky-300 rounded-full animate-ping opacity-75" style={{animationDelay: '1s'}}></div>
                  <div className="relative">
                    <Microphone
                      isRecording={isRecording}
                      toggleRecording={toggleRecording}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right - Theme Toggle */}
          <div className="justify-self-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;