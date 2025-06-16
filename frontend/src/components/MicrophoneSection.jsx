import Microphone from "./Microphone";

const MicrophoneSection = ({ isRecording, toggleRecording, isProcessing }) => {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="text-center">
        <Microphone
          isRecording={isRecording}
          toggleRecording={toggleRecording}
        />

        {isProcessing && (
          <div className="mt-4">
            <div className="relative inline-block mb-3">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-blue-700 font-semibold">Processing...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MicrophoneSection;