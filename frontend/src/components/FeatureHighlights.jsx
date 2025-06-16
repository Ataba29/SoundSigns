const FeatureHighlights = () => {
  const features = [
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      ),
      gradient: "from-blue-500 to-indigo-600",
      darkGradient: "dark:from-blue-400 dark:to-indigo-500",
      title: "Lightning Fast",
      description: "Instant speech-to-sign translation"
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      gradient: "from-emerald-500 to-teal-600",
      darkGradient: "dark:from-emerald-400 dark:to-teal-500",
      title: "Precision Accuracy",
      description: "Reliable sign language interpretation"
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      ),
      gradient: "from-sky-500 to-cyan-600",
      darkGradient: "dark:from-sky-400 dark:to-cyan-500",
      title: "Built with Care",
      description: "Designed for accessibility & inclusion"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="group bg-white/70 dark:bg-slate-600/80 backdrop-blur-lg rounded-2xl border border-white/30 dark:border-slate-700/30 p-6 text-center hover:bg-white/90 dark:hover:bg-slate-600/90 hover:scale-105 transition-all duration-300 shadow-xl">
          <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} ${feature.darkGradient} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {feature.icon}
            </svg>
          </div>
          <h3 className="text-slate-800 dark:text-slate-200 font-bold text-lg mb-2 transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors duration-300">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeatureHighlights;