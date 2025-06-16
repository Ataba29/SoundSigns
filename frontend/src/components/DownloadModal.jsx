import React from "react";
import { X } from "lucide-react";

const DownloadModal = ({ 
  showDownloadModal, 
  setShowDownloadModal, 
  customFileName, 
  setCustomFileName, 
  handleDownloadConfirm, 
  isDownloading 
}) => {
  if (!showDownloadModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-200 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Download Video</h3>
          <button
            onClick={() => setShowDownloadModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video filename:
          </label>
          <input
            type="text"
            value={customFileName}
            onChange={(e) => setCustomFileName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter filename"
          />
          <p className="text-xs text-gray-500 mt-1">
            The video will include the ISL Gloss and transcription displayed below the video content
          </p>
        </div>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowDownloadModal(false)}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDownloadConfirm}
            disabled={isDownloading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          >
            {isDownloading ? "Creating..." : "Download"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;