
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import RegistrationForm from '@/components/RegistrationForm';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const { alumni, isLoading } = useAuth();
  const [showRegistration, setShowRegistration] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/bb8028a4-f5bb-4175-9319-caf1acbf4ea4.png" 
              alt="ALVA's Education Foundation" 
              className="h-16 w-16 object-contain animate-pulse"
            />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (alumni) {
    return <Dashboard />;
  }

  if (showRegistration) {
    return (
      <RegistrationForm 
        onSwitchToLogin={() => setShowRegistration(false)} 
      />
    );
  }

  return (
    <LoginForm 
      onSwitchToRegister={() => setShowRegistration(true)} 
    />
  );
};

export default Index;
