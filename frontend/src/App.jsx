import { useSpeechRecognition } from './hooks/useSpeechRecognition.js';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import Header from './components/Header.jsx';
import BackgroundElements from './components/BackgroundElements.jsx';
import MicrophoneSection from './components/MicrophoneSection.jsx';
import LiveTranscriptSection from './components/LiveTranscriptSection.jsx';
import ISLGlossSection from './components/ISLGlossSection.jsx';
import ISLVideoSection from './components/ISLVideoSection.jsx';
import FeatureHighlights from './components/FeatureHighlights.jsx';
import Footer from './components/Footer.jsx';

function AppContent() {
  const {
    transcript,
    isl,
    isRecording,
    isProcessing,
    toggleRecording
  } = useSpeechRecognition();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-25 to-sky-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-inter transition-colors duration-300">
      <BackgroundElements />
      <Header />

      {/* Main Content */}
      <main className="relative container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <MicrophoneSection 
          isRecording={isRecording}
          isProcessing={isProcessing}
          toggleRecording={toggleRecording}
        />

        {/* Live Results Section */}
        <div className="max-w-6xl mx-auto mb-6 sm:mb-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column: Live Transcript and ISL Gloss */}
            <div className="space-y-4 sm:space-y-6">
              <LiveTranscriptSection transcript={transcript} />
              <ISLGlossSection isl={isl} />
            </div>

            {/* Right Column: ISL Video Translation */}
            <div className="xl:col-span-1">
              <ISLVideoSection isl={isl} transcript={transcript} />
            </div>
          </div>
        </div>

        <FeatureHighlights />
      </main>

      <Footer />
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