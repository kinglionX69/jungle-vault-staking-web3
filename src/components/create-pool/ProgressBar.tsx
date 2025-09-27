
import React from 'react';
import { useCreatePool } from '@/contexts/CreatePoolContext';
import { Check, ChevronRight } from 'lucide-react';

const ProgressBar = () => {
  const { currentStep, steps, goToStep } = useCreatePool();

  return (
    <div className="mb-12">
      {/* Modern Step Indicator */}
      <div className="relative max-w-4xl mx-auto">
        {/* Background Progress Line */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-gradient-to-r from-jungle-700 via-jungle-600 to-jungle-700" />
        
        {/* Active Progress Line */}
        <div 
          className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 transition-all duration-700 ease-out shadow-lg"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {/* Steps Container */}
        <div className="relative flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = step.completed;
            const isClickable = step.completed || isActive;

            return (
              <div key={step.id} className="flex flex-col items-center group">
                {/* Step Circle */}
                <button
                  onClick={() => isClickable && goToStep(step.id)}
                  disabled={!isClickable}
                  className={`
                    relative w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                    transition-all duration-300 transform
                    ${isActive 
                      ? 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 text-jungle-950 shadow-2xl shadow-yellow-500/30 scale-110 animate-pulse' 
                      : isCompleted 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:scale-105' 
                        : 'bg-gradient-to-br from-jungle-700 to-jungle-800 text-jungle-400 shadow-inner'
                    }
                    ${isClickable 
                      ? 'cursor-pointer hover:scale-105' 
                      : 'cursor-not-allowed opacity-60'
                    }
                    border-2 ${isActive 
                      ? 'border-yellow-300/50' 
                      : isCompleted 
                        ? 'border-green-400/30' 
                        : 'border-jungle-600/30'
                    }
                  `}
                >
                  {/* Glow Effect for Active Step */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-20 animate-ping" />
                  )}
                  
                  {/* Step Content */}
                  <span className="relative z-10">
                    {isCompleted ? (
                      <Check size={18} strokeWidth={3} />
                    ) : (
                      step.emoji
                    )}
                  </span>
                </button>

                {/* Step Info Card */}
                <div className={`
                  mt-4 p-3 rounded-xl transition-all duration-300 min-w-[140px] text-center
                  ${isActive 
                    ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 shadow-lg' 
                    : isCompleted 
                      ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20' 
                      : 'bg-jungle-800/30 border border-jungle-700/50'
                  }
                  group-hover:scale-105 group-hover:shadow-lg
                `}>
                  <div className={`
                    text-sm font-semibold mb-1
                    ${isActive 
                      ? 'text-yellow-300' 
                      : isCompleted 
                        ? 'text-green-300' 
                        : 'text-jungle-400'
                    }
                  `}>
                    Step {step.id}
                  </div>
                  <div className={`
                    text-xs font-medium leading-tight
                    ${isActive 
                      ? 'text-white' 
                      : isCompleted 
                        ? 'text-green-100' 
                        : 'text-jungle-300'
                    }
                  `}>
                    {step.title}
                  </div>
                  
                  {/* Status Badge */}
                  <div className="mt-2">
                    {isActive && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-200 rounded-full border border-yellow-500/30">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                        Active
                      </span>
                    )}
                    {isCompleted && !isActive && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-500/20 text-green-200 rounded-full border border-green-500/30">
                        <Check size={10} />
                        Complete
                      </span>
                    )}
                    {!isCompleted && !isActive && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-jungle-700/50 text-jungle-400 rounded-full border border-jungle-600/30">
                        Pending
                      </span>
                    )}
                  </div>
                </div>

                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="absolute top-6 left-full w-full flex items-center justify-center pointer-events-none">
                    <ChevronRight 
                      size={16} 
                      className={`
                        transition-colors duration-300
                        ${index < currentStep - 1 
                          ? 'text-yellow-400' 
                          : 'text-jungle-600'
                        }
                      `} 
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Enhanced Progress Summary */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-jungle-800/50 rounded-2xl border border-jungle-600/30 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-jungle-200 font-medium">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          
          <div className="w-px h-4 bg-jungle-600" />
          
          <div className="text-jungle-300 text-sm">
            {Math.round((currentStep / steps.length) * 100)}% Complete
          </div>
        </div>

        {/* Mini Progress Bar */}
        <div className="mt-4 w-48 h-1.5 bg-jungle-800 rounded-full mx-auto overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 rounded-full transition-all duration-700 ease-out shadow-lg"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
