const InfoTooltip = ({ content, className = "" }) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="w-5 h-5 bg-slate-400 hover:bg-slate-600 rounded-full flex items-center justify-center cursor-help transition-colors duration-200">
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="absolute right-0 top-6 w-64 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        <div className="absolute -top-1 right-2 w-2 h-2 bg-slate-800 transform rotate-45"></div>
        {content}
      </div>
    </div>
  );
};


export default InfoTooltip;