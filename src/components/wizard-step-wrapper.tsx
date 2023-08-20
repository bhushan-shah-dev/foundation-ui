import { Spinner } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { useWizard } from "react-use-wizard";
import styles from "./wizard-step-wrapper.module.scss";

const WizardStepWrapper: FC<PropsWithChildren> = function ({ children }) {
  const {
    isLoading,
    isLastStep,
    isFirstStep,
    activeStep,
    stepCount,
    previousStep,
    nextStep,
    goToStep,
    handleStep,
  } = useWizard();

  return (
    <div className={styles.wrapper}>
      {isLoading ? <Spinner size="xl" /> : <>{children}</>}
    </div>
  );
};

export default WizardStepWrapper;
