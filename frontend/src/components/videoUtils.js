// Video utility functions for ISL Video Player

// Check if video exists
export const checkVideoExists = async (src) => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const timeoutId = setTimeout(() => {
      resolve(false);
    }, 2000); // 2 second timeout

    video.onloadedmetadata = () => {
      clearTimeout(timeoutId);
      resolve(true);
    };
    video.onerror = () => {
      clearTimeout(timeoutId);
      resolve(false);
    };
    video.onabort = () => {
      clearTimeout(timeoutId);
      resolve(false);
    };
    video.src = src;
    video.load();
  });
};

// Get video source for a word/letter/number
export const getVideoSource = (item) => {
  const { text, type } = item;

  // Check if it's a number
  if (type === "number" || /^\d+$/.test(text)) {
    return `/videos/numbers/${text}.mp4`;
  }

  // Check if it's a single letter
  if (type === "letter" || (text.length === 1 && /^[a-zA-Z]$/.test(text))) {
    return `/videos/letters/${text.toLowerCase()}.mp4`;
  }

  // Otherwise, it's a word
  return `/videos/words/${text.toLowerCase()}.mp4`;
};

// Process ISL translation into words/letters with pre-checking
export const processISLTranslation = async (translation) => {
  if (!translation) return [];

  const words = translation.split(/\s+/).filter((word) => word.length > 0);
  const processed = [];

  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    const word = words[wordIndex];
    const isLastWord = wordIndex === words.length - 1;

    // Remove punctuation including quotation marks and convert to lowercase
    const cleanWord = word.replace(/[.,!?;"']/g, "").toLowerCase();

    if (!cleanWord) continue; // Skip if word becomes empty after cleaning

    const startIndex = processed.length; // Track where this word starts

    // Check if word contains hyphens (like GO-OUT)
    if (cleanWord.includes("-")) {
      // Split by hyphens and process each part as separate words
      const parts = cleanWord.split("-").filter((part) => part.length > 0);

      for (let partIndex = 0; partIndex < parts.length; partIndex++) {
        const part = parts[partIndex];
        const partStartIndex = processed.length;

        // Check if it's a number
        if (/^\d+$/.test(part)) {
          // Split numbers into individual digits
          const digits = part.split("").map((digit) => ({
            text: digit,
            type: "number",
            original: word,
            display: digit,
            wordIndex: wordIndex,
          }));
          processed.push(...digits);
        } else {
          // Try as a word first
          const wordItem = {
            text: part,
            type: "word",
            original: word,
            display: part,
            wordIndex: wordIndex,
          };

          const wordVideoSrc = getVideoSource(wordItem);

          const wordExists = await checkVideoExists(wordVideoSrc);

          if (wordExists) {
            // Use the word video
            processed.push(wordItem);
          } else {
            // Split into individual letters if word video doesn't exist
            const letters = part.split("").map((letter) => ({
              text: letter.toUpperCase(),
              type: "letter",
              original: word,
              display: letter.toUpperCase(),
              wordIndex: wordIndex,
            }));
            processed.push(...letters);
          }
        }
      }
    } else {
      // Check if it's a number
      if (/^\d+$/.test(cleanWord)) {
        // Split numbers into individual digits
        const digits = cleanWord.split("").map((digit) => ({
          text: digit,
          type: "number",
          original: word,
          display: digit,
          wordIndex: wordIndex,
        }));
        processed.push(...digits);
      } else {
        // Check if word video exists first
        const wordItem = {
          text: cleanWord,
          type: "word",
          original: word,
          display: cleanWord,
          wordIndex: wordIndex,
        };

        const wordVideoSrc = getVideoSource(wordItem);

        const wordExists = await checkVideoExists(wordVideoSrc);

        if (wordExists) {
          // Use the word video
          processed.push(wordItem);
        } else {
          // Split into individual letters if word video doesn't exist
          const letters = cleanWord.split("").map((letter) => ({
            text: letter.toUpperCase(),
            type: "letter",
            original: word,
            display: letter.toUpperCase(),
            wordIndex: wordIndex,
          }));
          processed.push(...letters);
        }
      }
    }
  }

  return processed;
};
