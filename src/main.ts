import "virtual:svg-icons-register";

const DOM = {
  timeline: "timeline",
  timelineStepper: "timeline__stepper",
  timelineStep: "timeline__step",
  timelineStepTitle: "timeline__step-title",
  timelineStepActive: "is-active",
  timelineStepActiveMarker: "timeline__step-active-marker",
};

const STEP_ACTIVE_MARKEP_CUSTOM_PROPS = {
  width: "--slide-width",
  posX: "--slide-pos-x",
  posY: "--slide-pos-y",
};

const timeline = document.querySelector(`.${DOM.timeline}`);
const timelineStepper = timeline?.querySelector(`.${DOM.timelineStepper}`);
const timelineStepTitle = timeline?.querySelector(`.${DOM.timelineStepTitle}`);

window.addEventListener("load", () => {
  createStepActiveMarker();
});

timeline?.addEventListener("click", (event) => {
  const { target } = event;

  if (
    !target ||
    !(target instanceof Element) ||
    !target.closest(`.${DOM.timelineStep}`)
  ) {
    return;
  }

  const currentStep = target.closest(`.${DOM.timelineStep}`);
  const stepActiveMarker = timeline.querySelector(
    `.${DOM.timelineStepActiveMarker}`
  ) as HTMLElement;

  if (!currentStep || !stepActiveMarker) {
    return;
  }

  deactivateSteps();
  activateCurrentStep(currentStep);

  const slideProps = getStepActiveMarkerProps();
  if (!slideProps) {
    return;
  }

  setStepActiveMarkerProps({ stepActiveMarker, ...slideProps });
});

function deactivateSteps(): void {
  const steps = document.querySelectorAll(`.${DOM.timelineStep}`);
  steps?.forEach((elem) => elem.classList.remove(`${DOM.timelineStepActive}`));
}

function activateCurrentStep(currentStep: Element): void {
  currentStep?.classList.add(`${DOM.timelineStepActive}`);
}

function createStepActiveMarker() {
  const stepActiveMarker = document.createElement("div");
  stepActiveMarker.classList.add(`${DOM.timelineStepActiveMarker}`);
  timelineStepper?.appendChild(stepActiveMarker);

  const positionProps = getStepActiveMarkerProps();
  const posY = getStepActiveMarkerPosY();

  if (!positionProps || typeof posY !== "number") {
    return;
  }

  setStepActiveMarkerProps({
    stepActiveMarker,
    posY,
    ...positionProps,
  });
}

interface IGetStepActiveMarkerPositionProps {
  posX: number;
  posY?: number;
  width: number;
}

interface ISetStepActiveMarkerPositionProps
  extends IGetStepActiveMarkerPositionProps {
  stepActiveMarker: HTMLElement;
}

function setStepActiveMarkerProps({
  stepActiveMarker,
  posX,
  posY,
  width,
}: ISetStepActiveMarkerPositionProps): void {
  stepActiveMarker.style.setProperty(
    `${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.width}`,
    `${width}px`
  );

  stepActiveMarker.style.setProperty(
    `${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.posX}`,
    `${posX}px`
  );

  if (typeof posY === "number") {
    stepActiveMarker.style.setProperty(
      `${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.posY}`,
      `${posY}px`
    );
  }
}

function getStepActiveMarkerProps(): IGetStepActiveMarkerPositionProps | null {
  const currentStep = getCurrentStep();

  if (!currentStep) {
    return null;
  }

  const width = getElementWidth(currentStep);
  const posX = getStepActiveMarkerPosX(currentStep);

  if (typeof posX !== "number") {
    return null;
  }

  return { posX, width };
}

function getCurrentStep(): Element | null {
  const currentStep = document.querySelector(
    `.${DOM.timelineStep}.${DOM.timelineStepActive}`
  );

  return currentStep || null;
}

function getStepActiveMarkerPosY(): number | null {
  const timelineTitlePosY = timelineStepTitle?.getBoundingClientRect().top;
  const timelineStepperPosY = timelineStepper?.getBoundingClientRect().top;

  if (!timelineTitlePosY || !timelineStepperPosY) {
    return null;
  }

  return timelineTitlePosY - timelineStepperPosY;
}

function getStepActiveMarkerPosX(currentStep: Element): number | null {
  const timelineStepperPosX = timelineStepper?.getBoundingClientRect().left;
  const currentStepPosX = currentStep.getBoundingClientRect().left;

  if (!timelineStepperPosX) {
    return null;
  }

  return currentStepPosX - timelineStepperPosX;
}

function getElementWidth(elem: Element): number {
  return elem.clientWidth;
}
