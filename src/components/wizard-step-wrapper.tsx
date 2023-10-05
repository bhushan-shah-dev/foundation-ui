import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  Box,
  Center,
  Divider,
  IconButton,
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

const stepLabels = ["Upload rules", "Schema mapping", "Generate report"];

type WizardStepWrapperProps = PropsWithChildren & {
  index: number;
  isLargeContent?: boolean;
  isPrevStepDisabled?: boolean;
  isNextStepDisabled?: boolean;
};

const WizardStepWrapper: FC<WizardStepWrapperProps> = function ({
  index,
  isLargeContent = false,
  isPrevStepDisabled = true,
  isNextStepDisabled = true,
  children,
}) {
  const {
    isLoading,
    isLastStep,
    isFirstStep,
    stepCount,
    previousStep,
    nextStep,
    goToStep,
    handleStep,
  } = useWizard();

  const { activeStep } = useSteps({
    index,
    count: stepLabels.length,
  });

  return (
    <div className={styles.container}>
      <Stepper className={styles.stepper} index={activeStep}>
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
      <Box className={styles["divider-left"]} position="relative" padding="10">
        <Divider orientation="vertical" />
        <AbsoluteCenter>
          <IconButton
            isRound
            variant="solid"
            aria-label="Back"
            icon={<ArrowLeftIcon />}
            onClick={previousStep}
            isDisabled={isPrevStepDisabled}
          />
        </AbsoluteCenter>
      </Box>
      <div className={styles.wrapper}>
        <Center maxW={"100%"} className={isLargeContent ? styles.center : ""}>
          {isLoading ? <Spinner size="xl" /> : <>{children}</>}
        </Center>
      </div>
      <Box className={styles["divider-right"]} position="relative" padding="10">
        <Divider orientation="vertical" />
        <AbsoluteCenter>
          <IconButton
            isRound
            variant="solid"
            aria-label="Next"
            icon={<ArrowRightIcon />}
            onClick={nextStep}
            isDisabled={isNextStepDisabled}
          />
        </AbsoluteCenter>
      </Box>
    </div>
  );
};

export default WizardStepWrapper;
