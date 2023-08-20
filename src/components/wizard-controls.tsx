import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { useWizard } from "react-use-wizard";
import styles from "./wizard-controls.module.scss";

type WizardControlProps = {
  isNextStepDisabled?: boolean;
};

const WizardControls: FC<WizardControlProps> = function ({
  isNextStepDisabled,
}) {
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
    <div className={styles["wizard-controls"]}>
      {!isFirstStep && <Button onClick={previousStep}>Back</Button>}
      {!isLastStep && (
        <Button
          isDisabled={isNextStepDisabled}
          className={styles["next-btn"]}
          onClick={nextStep}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default WizardControls;
