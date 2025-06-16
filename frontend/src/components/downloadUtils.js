// Download utility functions for ISL Video Player
import { getVideoSource } from './videoUtils';

// Create meaningful filename from ISL content
export const createDefaultFilename = (processedWords) => {
  if (processedWords.length === 0) return "isl_translation";

  // Take first few words/letters to create a meaningful name
  const maxWords = 5;
  const words = processedWords.slice(0, maxWords).map((item) => {
    if (item.type === "letter") {
      return item.text.toLowerCase();
    }
    return item.text.toLowerCase();
  });

  let filename = words.join("_");

  // Add indication if there are more words
  if (processedWords.length > maxWords) {
    filename += "_and_more";
  }

  // Clean filename - remove special characters and limit length
  filename = filename.replace(/[^a-z0-9_]/g, "").substring(0, 50);

  return `isl_${filename}`;
};

// Draw text overlay below video (not on top)
export const drawTextOverlay = (ctx, canvas, currentIndex, allWords, liveTranscription) => {
  // Video area height (maintain 16:9 aspect ratio)
  const videoHeight = 480;
  const textAreaHeight = canvas.height - videoHeight;
  
  // Start drawing text in the text area below the video
  let currentY = videoHeight + 30; // Start 30px below video
  
  // Helper function to draw text with background for better readability
  const drawTextWithBackground = (text, x, y, textColor = '#ffffff', bgColor = '#000000', padding = 8) => {
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = 20; // Approximate text height
    
    // Draw background rectangle
    ctx.fillStyle = bgColor;
    ctx.fillRect(x - textWidth/2 - padding, y - textHeight/2 - padding/2, 
                 textWidth + padding*2, textHeight + padding);
    
    // Draw text
    ctx.fillStyle = textColor;
    ctx.fillText(text, x, y);
  };
  
  // Set text properties
  ctx.font = 'bold 20px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Draw current word being signed (top of text area)
  const currentWord = allWords[currentIndex];
  if (currentWord) {
    drawTextWithBackground(
      `Current: ${currentWord.display.toUpperCase()}`,
      canvas.width / 2,
      currentY,
      '#00ff00',
      'rgba(0, 0, 0, 0.8)'
    );
    currentY += 40;
  }
  
  // Draw ISL sequence
  ctx.font = '16px Arial';
  
  // Create sequence display with current word highlighted
  const sequenceText = `ISL Gloss: ${allWords.map((word, index) => {
    if (index === currentIndex) {
      return `[${word.display.toUpperCase()}]`;
    }
    return word.display.toUpperCase();
  }).join(' ')}`;
  
  // Wrap ISL text if too long
  const maxWidth = canvas.width - 60;
  const islWords = sequenceText.split(' ');
  let line = '';
  const islLines = [];
  
  // Calculate all ISL lines
  for (let i = 0; i < islWords.length; i++) {
    const testLine = line + islWords[i] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && i > 0) {
      islLines.push(line.trim());
      line = islWords[i] + ' ';
    } else {
      line = testLine;
    }
  }
  if (line.trim()) {
    islLines.push(line.trim());
  }
  
  // Draw ISL lines
  for (let i = 0; i < islLines.length; i++) {
    drawTextWithBackground(
      islLines[i],
      canvas.width / 2,
      currentY,
      '#ffffff',
      'rgba(0, 0, 0, 0.8)'
    );
    currentY += 30;
  }
  
  // Draw live transcription if available
  if (liveTranscription) {
    currentY += 10; // Add some spacing
    
    const transcriptionText = `Transcription: ${liveTranscription}`;
    const transcriptionWords = transcriptionText.split(' ');
    let transcriptionLine = '';
    const lines = [];
    
    // Calculate transcription lines
    for (let i = 0; i < transcriptionWords.length; i++) {
      const testLine = transcriptionLine + transcriptionWords[i] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && i > 0) {
        lines.push(transcriptionLine.trim());
        transcriptionLine = transcriptionWords[i] + ' ';
      } else {
        transcriptionLine = testLine;
      }
    }
    if (transcriptionLine.trim()) {
      lines.push(transcriptionLine.trim());
    }
    
    // Draw transcription lines
    for (let i = 0; i < lines.length; i++) {
      drawTextWithBackground(
        lines[i],
        canvas.width / 2,
        currentY,
        '#ffff00',
        'rgba(0, 0, 0, 0.8)'
      );
      currentY += 30;
    }
  }
};

// Download combined video with text overlay
export const downloadCombinedVideo = async (processedWords, liveTranscription, filename, setIsDownloading, setShowDownloadModal) => {
  if (processedWords.length === 0) return;

  setIsDownloading(true);

  try {
    // Create a canvas for video composition
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions - extended height for text area
    canvas.width = 640;
    canvas.height = 480 + 200; // Original video height + text area height

    // Create MediaRecorder to record the canvas
    const stream = canvas.captureStream(30); // 30 FPS
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
    });

    const chunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);

      // Create download link
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up
      URL.revokeObjectURL(url);
      setIsDownloading(false);
      setShowDownloadModal(false);
    };

    // Start recording
    mediaRecorder.start();

    // Play each video and draw to canvas with text overlay
    for (let i = 0; i < processedWords.length; i++) {
      const item = processedWords[i];
      const videoSrc = getVideoSource(item);

      // Create a temporary video element
      const tempVideo = document.createElement('video');
      tempVideo.crossOrigin = 'anonymous';
      tempVideo.muted = true;

      await new Promise((resolve) => {
        tempVideo.onloadeddata = async () => {
          try {
            await tempVideo.play();

            // Draw video frames to canvas with text overlay
            const drawFrame = () => {
              if (!tempVideo.paused && !tempVideo.ended) {
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw video frame in the top portion (maintain original video size)
                ctx.drawImage(tempVideo, 0, 0, 640, 480);
                
                // Fill the text area with a dark background
                ctx.fillStyle = '#1a1a1a';
                ctx.fillRect(0, 480, canvas.width, 200);
                
                // Draw text overlay in the bottom portion
                drawTextOverlay(ctx, canvas, i, processedWords, liveTranscription);
                
                requestAnimationFrame(drawFrame);
              }
            };

            drawFrame();

            tempVideo.onended = () => {
              resolve();
            };
          } catch (error) {
            console.error('Error playing temp video:', error);
            resolve(); // Continue with next video even if one fails
          }
        };

        tempVideo.onerror = () => {
          console.error('Error loading video:', videoSrc);
          resolve(); // Continue with next video even if one fails
        };

        tempVideo.src = videoSrc;
      });
    }

    // Stop recording after all videos are processed
    mediaRecorder.stop();
  } catch (error) {
    console.error('Error creating combined video:', error);
    setIsDownloading(false);
    setShowDownloadModal(false);
    alert('Error creating combined video. Please try again.');
  }
};