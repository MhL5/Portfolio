"use client";

import { useState } from "react";

type useStepperProps = {
  lastStep: number;
  initialStep?: number;
  loop?: boolean;
};

/**
 * Creates a state and navigation utilities for a multi-step form (0-based).
 */
export function useStepper({
  lastStep,
  loop = false,
  initialStep = 0,
}: useStepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === lastStep;

  function next() {
    if (isLastStep) {
      if (loop) setCurrentStep(0);
      return;
    }
    setCurrentStep((step) => step + 1);
  }

  function back() {
    if (isFirstStep) {
      if (loop) setCurrentStep(lastStep);
      return;
    }
    setCurrentStep((step) => step - 1);
  }

  function goTo(index: number) {
    if (index < 0 || index > lastStep) {
      throw new Error(
        `Invalid step index: ${index}. Must be between 0 and ${lastStep}`,
      );
    }
    setCurrentStep(index);
  }

  return {
    currentStep,
    isFirstStep,
    isLastStep,

    goTo,
    next,
    back,
  };
}
