
import React from 'react';

const AdminLockScreen = () => {
  return (
    <div className="min-h-screen bg-jungle-950 flex items-center justify-center px-6">
      <div className="jungle-card p-12 text-center max-w-md w-full">
        <div className="text-8xl mb-8 animate-float">
          🛑
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-6 text-shadow">
          Temple Access Denied
        </h1>
        
        <p className="text-jungle-200 text-lg mb-8 leading-relaxed">
          This temple is for tribal leaders only. You don't have the key.
          <span className="block text-2xl mt-4">🏛️⚡</span>
        </p>
        
        <div className="flex justify-center mt-8 text-3xl space-x-6 opacity-60">
          <span className="animate-float">🗝️</span>
          <span className="animate-float" style={{ animationDelay: '1s' }}>👑</span>
          <span className="animate-float" style={{ animationDelay: '2s' }}>🛡️</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLockScreen;
