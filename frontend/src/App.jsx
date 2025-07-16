import { useSpeechRecognition } from "./hooks/useSpeechRecognition.js";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import Header from "./components/Header.jsx";
import BackgroundElements from "./components/BackgroundElements.jsx";
import LiveTranscriptSection from "./components/LiveTranscriptSection.jsx";
import ISLGlossSection from "./components/ISLGlossSection.jsx";
import ISLVideoSection from "./components/ISLVideoSection.jsx";
// FeatureHighlights now integrated into Footer
import Footer from "./components/Footer.jsx";

function AppContent() {
  const { transcript, isl, isRecording, isProcessing, toggleRecording } =
    useSpeechRecognition();

  return (
    <div className="min-h-screen xl:h-screen xl:overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-25 to-sky-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-inter transition-colors duration-300 flex flex-col">
      <BackgroundElements />

      {/* Fixed Header - minimal height with small gap */}
      <div className="flex-shrink-0 mb-2">
        <Header
          isRecording={isRecording}
          toggleRecording={toggleRecording}
          isProcessing={isProcessing}
        />
      </div>

      {/* Main Content - takes remaining space and fits between header and footer */}
      <main className="flex-1 relative container mx-auto px-2 xl:overflow-hidden min-h-0">
        {/* Main Content Grid - responsive width */}
        <div className="xl:h-full h-full mx-auto px-1 max-w-7xl xl:max-w-none xl:w-full">
          {/* Mobile: Stack all sections vertically - scrollable */}
          <div className="xl:hidden flex flex-col space-y-4 overflow-y-auto h-full py-2">
            <div className="min-h-[300px] flex-shrink-0">
              <ISLVideoSection isl={isl} transcript={transcript} />
            </div>
            <div className="min-h-[200px] flex-shrink-0">
              <LiveTranscriptSection transcript={transcript} />
            </div>
            <div className="min-h-[200px] flex-shrink-0">
              <ISLGlossSection isl={isl} />
            </div>
          </div>
          
          {/* Desktop: 50/50 split layout that fits in viewport */}
          <div className="hidden xl:grid xl:grid-cols-2 gap-4 xl:h-full">
            {/* Desktop: Left Half - ISL Video Translation - Full 50% */}
            <div className="h-full w-full">
              <ISLVideoSection isl={isl} transcript={transcript} />
            </div>

            {/* Desktop: Right Half - Live Transcript and ISL Gloss stacked - Full 50% */}
            <div className="flex flex-col xl:h-full w-full gap-4">
              <div className="flex-1 min-h-0 w-full">
                <LiveTranscriptSection transcript={transcript} />
              </div>
              <div className="flex-1 min-h-0 w-full">
                <ISLGlossSection isl={isl} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Compact Footer with small gap */}
      <div className="flex-shrink-0 mt-2">
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}