'use client';

import MoreInfoModal from '@/components/login/MoreInfoModal';
import PickRoleModal from '@/components/login/PickRole';
import SignupModal from '@/components/login/SignupModal';

import { useState } from 'react';

export default function ThreeModals() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const twoNextStep = () => setCurrentStep(currentStep + 2);
  const previousStep = () => setCurrentStep(currentStep - 1);
  const twoPreviousStep = () => setCurrentStep(currentStep - 2);

  return (
    <div>
      {currentStep === 1 ? <PickRoleModal nextStep={nextStep} twoNextStep={twoNextStep} /> : ''}
      {currentStep === 2 ? <MoreInfoModal nextStep={nextStep} previousStep={previousStep} /> : ''}
      {currentStep === 3 ? <SignupModal previousStep={previousStep} twoPreviousStep={twoPreviousStep} /> : ''}
    </div>
  );
}
