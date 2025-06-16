import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler()],
)

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load environment variables
load_dotenv()

# Initialize OpenAI client
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)


def text_to_isl_gloss(text):
    """Convert English text to ISL gloss notation"""
    if not text.strip():
        return ""

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": """
You are an expert ISL gloss translator. Follow these rules:
1. Use UPPERCASE for signs
2. Fingerspell names with hyphens (e.g., J-O-H-N)
3. Omit English words like 'is', 'the', 'a'
4. Use classifiers for spatial relationships
5. Maintain ISL grammar structure (time-topic-comment)

Example Translations:
English: "Hello, my name is John."
ISL Gloss: "HELLO, ME NAME J-O-H-N."

English: "I have two cats at home."
ISL Gloss: "HOME, TWO CAT HAVE-ME."

English: "Where is the nearest restaurant?"
ISL Gloss: "NEAREST RESTAURANT WHERE?"

write only the translated ISL gloss without any additional words
""",
                },
                {"role": "user", "content": f"Translate to ISL gloss: '{text}'"},
            ],
            temperature=0.2,
            max_tokens=150,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        logging.error(f"Translation error: {e}")
        return "Translation error"


@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    isl_gloss = text_to_isl_gloss(text)
    return jsonify({"isl": isl_gloss})


@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "service": "ISL Translator"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
