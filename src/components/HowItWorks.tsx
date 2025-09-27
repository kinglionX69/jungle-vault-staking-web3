
import React from 'react';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Connect Wallet",
      description: "Link your Aptos wallet to access the jungle's treasure vaults",
      emoji: "🔗",
      icon: "🦜"
    },
    {
      step: 2,
      title: "Choose & Stake",
      description: "Select your favorite emojicoin pool and deposit your tokens",
      emoji: "🎯",
      icon: "🌿"
    },
    {
      step: 3,
      title: "Earn Rewards",
      description: "Watch your tokens grow with rewards in APT or the same token - creator's choice!",
      emoji: "💎",
      icon: "📦"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-jungle-900 to-jungle-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl">🏛️</div>
        <div className="absolute top-20 right-10 text-6xl">🌺</div>
        <div className="absolute bottom-10 left-1/4 text-7xl">🦜</div>
        <div className="absolute bottom-20 right-1/4 text-5xl">🍃</div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-shadow pixel-text">
            🗺️ How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to start your jungle vault adventure
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.step} className="relative h-full">
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent transform -translate-y-1/2 z-0"></div>
              )}
              
              <div className="pixel-card p-8 text-center hover:scale-105 transition-all duration-300 relative z-10 h-full flex flex-col pixel-glow">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent text-accent-foreground font-bold text-xl rounded-full mb-6 mx-auto">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="text-6xl mb-6 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                  <span>{step.emoji}</span>
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <Button 
            size="xl" 
            variant="pixel-retro"
            className="text-xl px-12 py-6"
          >
            🚀 Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
