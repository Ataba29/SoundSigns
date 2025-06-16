import { useState, useRef } from "react";

// Environment-based API configuration
const API_BASE_URL = import.meta.env.PROD
  ? "https://soundsigns.onrender.com" // Replace with your actual backend URL
  : "http://localhost:5000";

export const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState("");
  const [isl, setIsl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef("");

  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setTranscript("");
      setIsl("");
      setIsRecording(true);
      finalTranscriptRef.current = "";
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
      setIsProcessing(false);
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Update the final transcript ref
      if (finalTranscript) {
        finalTranscriptRef.current += finalTranscript;
      }

      // Update the display with final + interim
      setTranscript(finalTranscriptRef.current + interimTranscript);
    };

    recognition.onend = async () => {
      setIsRecording(false);

      // Use the final transcript from the ref for API call
      const finalText = finalTranscriptRef.current.trim();
      if (finalText) {
        setIsProcessing(true);

        try {
          // Use environment-based URL
          const response = await fetch(`${API_BASE_URL}/translate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: finalText }),
          });

          if (!response.ok) {
            throw new Error(`Backend error: ${response.status}`);
          }

          const data = await response.json();
          data.isl = data.isl.replace(/"/g, ""); // Removes all double quotes
          setIsl(data.isl);
        } catch (err) {
          console.error("Translation error:", err);
          setIsl("Translation failed. Please try again.");
        } finally {
          setIsProcessing(false);
        }
      }
    };

    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return {
    transcript,
    isl,
    isRecording,
    isProcessing,
    toggleRecording,
    startRecording,
    stopRecording,
  };
};
