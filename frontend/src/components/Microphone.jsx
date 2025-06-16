export default function Microphone({ isRecording, toggleRecording }) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={toggleRecording}
        className={`p-5 rounded-full transition-all duration-300 ${
          isRecording
            ? "bg-red-500 hover:bg-red-600 animate-pulse"
            : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        } text-white shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </button>
      <p className="mt-4 text-gray-600 dark:text-slate-300 font-medium">
        {isRecording ? (
          <span className="flex items-center text-red-600">
            <span className="flex h-3 w-3 mr-2">
              <span className="animate-ping absolute h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
              <span className="relative h-3 w-3 rounded-full bg-red-600"></span>
            </span>
            Recording speech...
          </span>
        ) : (
          "Click microphone to start recording"
        )}
      </p>
      <p className="mt-2 text-sm text-gray-500 dark:text-slate-200">
        {isRecording
          ? "Click again to stop"
          : "Speak clearly into your microphone"}
      </p>
    </div>
  );
}
