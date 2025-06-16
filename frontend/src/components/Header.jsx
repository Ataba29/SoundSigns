import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-white/20 dark:border-slate-700/20 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          {/* Left spacer for balance on larger screens */}
          <div className="hidden sm:block w-8 md:w-16"></div>
          
          {/* Center content */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 sm:flex-none justify-center sm:justify-start">
            <div className="text-center relative">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 dark:from-blue-400 dark:via-indigo-400 dark:to-sky-400 bg-clip-text text-transparent">
                SoundSigns
                <div className="absolute -right-2 sm:-right-3 top-0 sm:top-1 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-gradient-to-r from-blue-400 to-sky-400 dark:from-blue-300 dark:to-sky-300 rounded-full animate-ping"></div>
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-medium mt-1 sm:mt-2 tracking-wide">
                Voice to Sign Language Bridge
              </p>
            </div>
          </div>

          {/* Right side - Theme Toggle */}
          <div className="flex items-center justify-end w-8 sm:w-12 md:w-16">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;