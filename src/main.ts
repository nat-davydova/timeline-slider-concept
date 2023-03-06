import "virtual:svg-icons-register";

const DOM = {
  timeline: "timeline",
  timelineStepper: "timeline__stepper",
  timelineStep: "timeline__step",
  timelineStepTitle: "timeline__title",
  timelineStepActive: "is-active",
  timelineStepActiveMarker: "timeline__step-active-marker",
};

const SLIDE_CUSTOM_PROPERTIES = {
  width: "--slide-width",
  posX: "--slide-pos-x",
  posY: "--slide-pos-y",
};

const timeline = document.querySelector(`.${DOM.timeline}`);
const timelineStepper = timeline?.querySelector(`.${DOM.timelineStepper}`);
const timelineStepTitle = timeline?.querySelector(`.${DOM.timelineStepTitle}`);

window.addEventListener("load", () => {
  createSlideElement();
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
  const slideElement = timeline.querySelector(
    `.${DOM.timelineStepActiveMarker}`
  ) as HTMLElement;

  if (!currentStep || !slideElement) {
    return;
  }

  deactivateSteps();
  activateCurrentStep(currentStep);

  const slideProps = getSlideElementProperties();
  if (!slideProps) {
    return;
  }

  setSlideElementProperties({ slideElement, ...slideProps });
});

function deactivateSteps(): void {
  const steps = document.querySelectorAll(`.${DOM.timelineStep}`);
  steps?.forEach((elem) => elem.classList.remove(`${DOM.timelineStepActive}`));
}

function activateCurrentStep(currentStep: Element): void {
  currentStep?.classList.add(`${DOM.timelineStepActive}`);
}

function createSlideElement() {
  const slideElement = document.createElement("div");
  slideElement.classList.add(`${DOM.timelineStepActiveMarker}`);
  timelineStepper?.appendChild(slideElement);

  const positionProps = getSlideElementProperties();
  const posY = getSlideElementPosY();

  if (!positionProps || typeof posY !== "number") {
    return;
  }

  setSlideElementProperties({ slideElement, posY, ...positionProps });
}

interface IGetSlideElementPositionProps {
  posX: number;
  posY?: number;
  width: number;
}

interface ISetSlideElementPositionProps extends IGetSlideElementPositionProps {
  slideElement: HTMLElement;
}

function setSlideElementProperties({
  slideElement,
  posX,
  posY,
  width,
}: ISetSlideElementPositionProps): void {
  slideElement.style.setProperty(
    `${SLIDE_CUSTOM_PROPERTIES.width}`,
    `${width}px`
  );

  slideElement.style.setProperty(
    `${SLIDE_CUSTOM_PROPERTIES.posX}`,
    `${posX}px`
  );

  if (typeof posY === "number") {
    slideElement.style.setProperty(
      `${SLIDE_CUSTOM_PROPERTIES.posY}`,
      `${posY}px`
    );
  }
}

function getSlideElementProperties(): IGetSlideElementPositionProps | null {
  const currentStep = getCurrentStep();

  if (!currentStep) {
    return null;
  }

  const width = getElementWidth(currentStep);
  const posX = getSlideElementPosX(currentStep);

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

function getSlideElementPosY(): number | null {
  const timelineTitlePosY = timelineStepTitle?.getBoundingClientRect().top;
  const timelineStepperPosY = timelineStepper?.getBoundingClientRect().top;

  if (!timelineTitlePosY || !timelineStepperPosY) {
    return null;
  }

  return timelineTitlePosY - timelineStepperPosY;
}

function getSlideElementPosX(currentStep: Element): number | null {
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
