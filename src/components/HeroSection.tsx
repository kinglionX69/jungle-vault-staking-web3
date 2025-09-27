
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center temple-bg overflow-hidden scanlines-effect">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 text-2xl md:text-4xl animate-float">🌿</div>
        <div className="absolute top-40 right-20 text-xl md:text-3xl animate-float" style={{ animationDelay: '1s' }}>🦜</div>
        <div className="absolute bottom-32 left-20 text-3xl md:text-5xl animate-float" style={{ animationDelay: '2s' }}>🏛️</div>
        <div className="absolute top-32 left-1/3 text-lg md:text-2xl animate-float" style={{ animationDelay: '0.5s' }}>🌺</div>
        <div className="absolute bottom-20 right-1/3 text-xl md:text-3xl animate-float" style={{ animationDelay: '1.5s' }}>🦋</div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 text-shadow-glow leading-tight">
            <span className="pixel-text text-pixel-glow">STAKE YOUR EMOJICOINS,</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Earn Like a King
            </span>
            <span className="ml-2 sm:ml-4 text-4xl sm:text-5xl md:text-6xl lg:text-8xl animate-pixel-pulse">🦁</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 text-jungle-200 max-w-2xl mx-auto leading-relaxed px-4">
            Welcome to the jungle's most rewarding staking platform. 
            Stake your emojicoins in mystical pools and earn boosted rewards like royalty.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            <Button 
              size="xl" 
              variant="pixel-neon"
              className="text-base sm:text-lg w-full sm:w-auto"
              onClick={() => navigate('/pools')}
            >
              🌟 Explore Pools
            </Button>
            <Button 
              size="xl" 
              variant="pixel-retro"
              className="w-full sm:w-auto"
              onClick={() => navigate('/create')}
            >
              🚀 Launch Your Pool
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative vines at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-jungle-900/50 to-transparent">
        <div className="flex justify-center items-end h-full text-2xl sm:text-4xl space-x-4 sm:space-x-8 opacity-60">
          <span>🌿</span>
          <span>🍃</span>
          <span>🌿</span>
          <span>🍃</span>
          <span>🌿</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
