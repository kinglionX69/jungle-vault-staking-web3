
import React from 'react';
import { CreatePoolProvider, useCreatePool } from '@/contexts/CreatePoolContext';
import ProgressBar from '@/components/create-pool/ProgressBar';
import Step1TokenSettings from '@/components/create-pool/Step1TokenSettings';
import Step2PoolParameters from '@/components/create-pool/Step2PoolParameters';
import Step3NFTBoostsAndMilestones from '@/components/create-pool/Step3NFTBoostsAndMilestones';
import Step4ReviewConfirm from '@/components/create-pool/Step4ReviewConfirm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CreatePoolContent = () => {
  const { currentStep, nextStep, prevStep, validateCurrentStep } = useCreatePool();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1TokenSettings />;
      case 2:
        return <Step2PoolParameters />;
      case 3:
        return <Step3NFTBoostsAndMilestones />;
      case 4:
        return <Step4ReviewConfirm />;
      default:
        return <Step1TokenSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-jungle-950 py-8 px-6 scanlines-effect">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/pools" className="text-jungle-300 hover:text-yellow-400 text-sm mb-4 inline-block pixel-text hover:text-pixel-glow">
            ← Back to Pools
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-shadow-glow mb-4 pixel-text">
            Create Your Pool
            <span className="ml-3 text-5xl animate-pixel-pulse">🏛️</span>
          </h1>
          <p className="text-jungle-200 text-lg">
            Launch your own staking pool and start earning from your community
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar />

        {/* Step Content */}
        <div className="pixel-card p-8 mb-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between items-center">
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="pixel"
              className="border-jungle-600 text-jungle-200 hover:bg-jungle-700 disabled:opacity-50"
            >
              ← Previous
            </Button>
            
            <Button
              onClick={nextStep}
              disabled={!validateCurrentStep()}
              variant="pixel-neon"
            >
              Next →
            </Button>
          </div>
        )}
      </div>

      {/* Background jungle decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-jungle-900/20 to-transparent pointer-events-none">
        <div className="flex justify-center items-end h-full text-3xl space-x-12 opacity-10">
          <span className="animate-float">🌿</span>
          <span className="animate-float" style={{ animationDelay: '1s' }}>🦋</span>
          <span className="animate-float" style={{ animationDelay: '2s' }}>🌺</span>
          <span className="animate-float" style={{ animationDelay: '3s' }}>🍃</span>
        </div>
      </div>
    </div>
  );
};

const CreatePool = () => {
  return (
    <CreatePoolProvider>
      <CreatePoolContent />
    </CreatePoolProvider>
  );
};

export default CreatePool;
