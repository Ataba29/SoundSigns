const BackgroundElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Light mode background elements */}
      <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full blur-3xl animate-pulse transition-colors duration-300"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-sky-200/30 to-blue-200/30 dark:from-sky-900/20 dark:to-blue-900/20 rounded-full blur-3xl animate-pulse delay-1000 transition-colors duration-300"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-blue-100/20 dark:from-indigo-800/10 dark:to-blue-800/10 rounded-full blur-3xl transition-colors duration-300"></div>
      
      {/* Additional dark mode accents */}
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-br from-violet-900/10 to-purple-900/10 dark:from-violet-700/15 dark:to-purple-700/15 rounded-full blur-2xl animate-pulse delay-500 transition-colors duration-300"></div>
      <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-900/10 to-teal-900/10 dark:from-cyan-700/15 dark:to-teal-700/15 rounded-full blur-2xl animate-pulse delay-700 transition-colors duration-300"></div>
    </div>
  );
};

export default BackgroundElements;