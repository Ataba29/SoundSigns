import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Download } from "lucide-react";
import { processISLTranslation, getVideoSource } from './videoUtils';
import { createDefaultFilename, downloadCombinedVideo } from './downloadUtils';
import DownloadModal from './DownloadModal';

const ISLVideoPlayer = ({ islTranslation, liveTranscription }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [processedWords, setProcessedWords] = useState([]);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");
  const [videoNotFound, setVideoNotFound] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [customFileName, setCustomFileName] = useState("");
  const videoRef = useRef(null);

  // Handle video loaded
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    setVideoNotFound(false);
  };

  // Handle video error
  const handleVideoError = () => {
    console.error("Error loading video:", currentVideoSrc);
    setVideoNotFound(true);
    setVideoLoaded(false);
    // Move to next word after a short delay
    if (isPlaying) {
      setTimeout(() => {
        setCurrentWordIndex((prev) => prev + 1);
      }, 1000);
    }
  };

  // Handle video playback
  const playCurrentVideo = async () => {
    if (currentWordIndex >= processedWords.length) {
      setIsPlaying(false);
      return;
    }

    const currentItem = processedWords[currentWordIndex];
    const videoSrc = getVideoSource(currentItem);

    setCurrentVideoSrc(videoSrc);
    setVideoNotFound(false);
    setVideoLoaded(false);

    // Wait for video to load and play
    if (videoRef.current) {
      videoRef.current.src = videoSrc;
      videoRef.current.load();

      // Wait for the video to be loaded before trying to play
      videoRef.current.onloadeddata = async () => {
        setVideoLoaded(true);
        if (isPlaying) {
          try {
            await videoRef.current.play();
          } catch (error) {
            console.error("Error playing video:", error);
            handleVideoError();
          }
        }
      };
    }
  };

  // Handle video end
  const handleVideoEnd = () => {
    if (isPlaying) {
      setCurrentWordIndex((prev) => prev + 1);
    }
  };

  // Start playing sequence
  const startPlaying = () => {
    if (processedWords.length === 0) return;
    setIsPlaying(true);
    if (currentWordIndex >= processedWords.length) {
      setCurrentWordIndex(0);
    } else {
      // If we're at a valid index, start playing immediately
      playCurrentVideo();
    }
  };

  // Stop playing
  const stopPlaying = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Reset to beginning
  const resetPlayback = () => {
    setIsPlaying(false);
    setCurrentWordIndex(0);
    setCurrentVideoSrc("");
    setVideoLoaded(false);
    setVideoNotFound(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.src = "";
    }
  };

  // Handle download button click
  const handleDownloadClick = () => {
    const defaultName = createDefaultFilename(processedWords);
    setCustomFileName(defaultName);
    setShowDownloadModal(true);
  };

  // Handle download confirmation
  const handleDownloadConfirm = () => {
    const filename = customFileName.trim() || createDefaultFilename(processedWords);
    downloadCombinedVideo(
      processedWords, 
      liveTranscription, 
      filename, 
      setIsDownloading, 
      setShowDownloadModal
    );
  };

  // Process ISL translation when it changes
  useEffect(() => {
    const processTranslation = async () => {
      const processed = await processISLTranslation(islTranslation);
      setProcessedWords(processed);
      setCurrentWordIndex(0);
      setIsPlaying(false);
      setCurrentVideoSrc("");
      setVideoLoaded(false);
      setVideoNotFound(false);
    };

    processTranslation();
  }, [islTranslation]);

  // Play current video when index changes and we're playing
  useEffect(() => {
    if (isPlaying && processedWords.length > 0) {
      if (currentWordIndex < processedWords.length) {
        playCurrentVideo();
      } else {
        setIsPlaying(false);
      }
    }
  }, [currentWordIndex, isPlaying, processedWords]);

  return (
    <div className="w-full">
      {/* Word Display */}
      <div className="mb-4 p-4 bg-gray-50 dark:bg-slate-600/80 rounded-lg min-h-16">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-slate-300 mb-2">
          Current Sequence:
        </h3>
        <div className="flex flex-wrap gap-2">
          {processedWords.map((item, index) => (
            <React.Fragment key={index}>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  index === currentWordIndex && isPlaying
                    ? "bg-green-500 text-white"
                    : index < currentWordIndex && isPlaying
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {item.display || item.text}
              </span>
              {/* Add space after last item of each word */}
              {index < processedWords.length - 1 &&
                item.wordIndex !== processedWords[index + 1].wordIndex && (
                  <span className="text-gray-400 text-sm self-center">•</span>
                )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Video Player */}
      <div
        className="relative bg-black rounded-lg overflow-hidden mb-4"
        style={{ aspectRatio: "16/9" }}
      >
        {currentVideoSrc ? (
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            onLoadedData={handleVideoLoaded}
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            muted
          >
            <source src={currentVideoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-2">🤟</div>
              <p>Ready to play ISL translation</p>
            </div>
          </div>
        )}

        {videoNotFound && (
          <div className="absolute inset-0 bg-red-100 flex items-center justify-center">
            <div className="text-center text-red-600">
              <div className="text-2xl mb-2">⚠️</div>
              <p>Video not found</p>
            </div>
          </div>
        )}

        {currentVideoSrc && !videoLoaded && !videoNotFound && (
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p>Loading video...</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4">
        <button
          onClick={isPlaying ? stopPlaying : startPlaying}
          disabled={processedWords.length === 0}
          className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-3 sm:px-6 rounded-lg font-medium transition-colors ${
            processedWords.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : isPlaying
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          <span className="whitespace-nowrap">
            {isPlaying ? "Stop" : "Play"}
          </span>
        </button>

        <button
          onClick={resetPlayback}
          disabled={processedWords.length === 0}
          className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-3 sm:px-6 rounded-lg font-medium transition-colors ${
            processedWords.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-500 hover:bg-gray-600 text-white"
          }`}
        >
          <RotateCcw size={20} />
          <span className="whitespace-nowrap">Reset</span>
        </button>

        <button
          onClick={handleDownloadClick}
          disabled={processedWords.length === 0 || isDownloading}
          className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-3 sm:px-6 rounded-lg font-medium transition-colors ${
            processedWords.length === 0 || isDownloading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          <Download size={20} />
          <span className="whitespace-nowrap">
            {isDownloading ? "Creating..." : "Download"}
          </span>
        </button>
      </div>

      {/* Progress */}
      {processedWords.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>
              {currentWordIndex} / {processedWords.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  processedWords.length > 0
                    ? (currentWordIndex / processedWords.length) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Download Modal */}
      <DownloadModal 
        showDownloadModal={showDownloadModal}
        setShowDownloadModal={setShowDownloadModal}
        customFileName={customFileName}
        setCustomFileName={setCustomFileName}
        handleDownloadConfirm={handleDownloadConfirm}
        isDownloading={isDownloading}
      />
    </div>
  );
};

export default ISLVideoPlayer;