import "virtual:svg-icons-register";

const DOM = {
  timeline: "timeline",
  timelineStepper: "timeline__stepper",
  timelineStep: "timeline__step",
  timelineStepActive: "is-active",
  timelineSlideElement: "timeline__slide",
};

const SLIDE_CUSTOM_PROPERTIES = {
  width: "--slide-width",
  posX: "--slide-pos-x",
  posY: "--slide-pos-y",
};

const timeline = document.querySelector(`.${DOM.timeline}`);
const timelineStepper = document.querySelector(`.${DOM.timelineStepper}`);

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

  if (!currentStep) {
    return;
  }

  deactivateSteps();
  activateCurrentStep(currentStep);
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
  slideElement.classList.add(`${DOM.timelineSlideElement}`);
  timelineStepper?.appendChild(slideElement);

  const positionProps = getSlideElementProperties();
  setSlideElementProperties({ slideElement, ...positionProps });
}

interface IGetSlideElementPositionProps {
  posX: number;
  posY: number;
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

  slideElement.style.setProperty(
    `${SLIDE_CUSTOM_PROPERTIES.posY}`,
    `${posY}px`
  );
}

function getSlideElementProperties(): IGetSlideElementPositionProps {
  return { posX: 0, posY: 100, width: 300 };
}
