import {
  Box,
  Center,
  Spinner,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { useWizard } from "react-use-wizard";
import styles from "./wizard-step-wrapper.module.scss";

export enum WizardStep {
  UploadRules_1,
  UploadRules_2,
  SchemaMapping_1,
  Other,
}

const stepLabels = ["Upload rules", "Schema mapping"];

type WizardStepWrapperProps = PropsWithChildren & {
  index: number;
  isLargeContent?: boolean;
};

const WizardStepWrapper: FC<WizardStepWrapperProps> = function ({
  index,
  isLargeContent = false,
  children,
}) {
  const { isLoading } = useWizard();

  const { activeStep } = useSteps({
    index,
    count: stepLabels.length,
  });

  return (
    <div className={styles.container}>
      <Stepper index={activeStep}>
        {stepLabels.map((step, index) => (
          <Step key={index}>
            <div className={styles["step-indicator-box"]}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box flexShrink="0">
                <StepTitle>{step}</StepTitle>
              </Box>
            </div>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <div className={styles.wrapper}>
        <Center className={isLargeContent ? styles.center : ""} height={500}>
          {isLoading ? <Spinner size="xl" /> : <>{children}</>}
        </Center>
      </div>
    </div>
  );
};

export default WizardStepWrapper;
