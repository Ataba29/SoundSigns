# Speech to Sign Language Translator

## Overview

A real-time speech-to-sign language translation application that converts spoken words into ISL (International Sign Language) gloss and provides a visual interface.

## Features

- Live audio transcription
- Real-time ISL gloss translation
- Responsive and modern UI design
- Microphone recording controls

## Prerequisites

- Python 3.8+
- Node.js 14+
- OpenAI API Key

## Backend Setup

1. Install Python dependencies:

```bash
pip install sounddevice numpy openai flask flask-cors python-dotenv
```

2. Create a .env file inside the backend/ folder and add your OpenAI API key:

```bash
OPENAI_API_KEY=your_openai_key_here
```

## Frontend Setup

1. Initialize:

```bash
cd frontend
npm install
```

## Running the Application

1. Run the development server in first terminal:

```bash
npm run dev
```

2. Start the Python backend from root in another terminal:

```bash
cd ..
py backend/transcription.py
```

## Technologies Used:

- Frontend: React, Tailwind CSS
- Backend: Python, Flask
- Translation: OpenAI GPT-4
