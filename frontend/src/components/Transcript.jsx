export default function Transcript({ transcript }) {
  return (
      <p className="text-gray-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
        {transcript || (
          <span className="text-gray-400 italic">
            Your speech will appear here...
          </span>
        )}
      </p>
  );
}
