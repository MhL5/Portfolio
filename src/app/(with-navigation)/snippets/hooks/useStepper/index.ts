"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";

type useStepperOptions = {
  initialStep?: number;
  loop?: boolean;
};

export function useStepper(
  steps: ReactNode[],
  { initialStep = 0, loop = false }: useStepperOptions = {},
) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const lastStep = useMemo(() => steps.length - 1, [steps.length]);
  const isFirstStep = useMemo(() => currentStep === 0, [currentStep]);
  const isLastStep = useMemo(
    () => currentStep === lastStep,
    [currentStep, lastStep],
  );

  const next = useCallback(() => {
    if (isLastStep) {
      if (loop) setCurrentStep(0);
      return;
    }
    setCurrentStep((step) => step + 1);
  }, [isLastStep, loop]);

  const back = useCallback(() => {
    if (isFirstStep) {
      if (loop) setCurrentStep(lastStep);
      return;
    }
    setCurrentStep((step) => step - 1);
  }, [isFirstStep, loop, lastStep]);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index > lastStep) {
        throw new Error(
          `Invalid step index: ${index}. Must be between 0 and ${lastStep}`,
        );
      }
      setCurrentStep(index);
    },
    [lastStep],
  );

  return {
    currentStep,
    isFirstStep,
    isLastStep,
    step: steps[currentStep],

    goTo,
    next,
    back,
  };
}
