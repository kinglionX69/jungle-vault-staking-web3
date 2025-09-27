
import React from 'react';

const Benefits = () => {
  const benefits = [
    {
      emoji: "🛡️",
      title: "Secure & Audited",
      description: "Battle-tested smart contracts protected by jungle magic",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      emoji: "🦍",
      title: "Emojicoin Power",
      description: "Harness the raw energy of the most powerful emojicoin tokens",
      gradient: "from-purple-500 to-purple-700"
    },
    {
      emoji: "💎",
      title: "Diamond Rewards",
      description: "Earn premium yields that make hodling worthwhile",
      gradient: "from-yellow-400 to-yellow-600"
    },
    {
      emoji: "⚡",
      title: "Lightning Fast",
      description: "Built on Aptos for instant transactions and low fees",
      gradient: "from-orange-500 to-red-600"
    },
    {
      emoji: "🌟",
      title: "Boosted Rewards %",
      description: "Get enhanced rewards through our unique multiplier system",
      gradient: "from-green-400 to-emerald-600"
    },
    {
      emoji: "🎯",
      title: "Auto-Compound",
      description: "Set it and forget it - your rewards compound automatically",
      gradient: "from-indigo-500 to-purple-600"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-card relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 gap-8 h-full">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="text-4xl flex items-center justify-center">
              {['🌿', '🍃', '🌺', '🦋'][i % 4]}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-shadow pixel-text">
            🏆 Why Choose Jungle Vault : Emojicoin?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Experience the most rewarding and secure emojicoin staking platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="pixel-card p-6 sm:p-8 hover:scale-105 transition-all duration-300 cursor-pointer group h-full flex flex-col focus-ring retro-glow"
              tabIndex={0}
              role="button"
              aria-label={`Learn more about ${benefit.title}`}
            >
              {/* Icon */}
              <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 group-hover:animate-pixel-pulse text-center">
                {benefit.emoji}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 group-hover:text-accent transition-colors text-center">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 flex-grow text-center">
                {benefit.description}
              </p>

              {/* Decorative gradient bar */}
              <div className="h-1 w-full bg-accent rounded-full opacity-70 group-hover:opacity-100 transition-opacity mt-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
