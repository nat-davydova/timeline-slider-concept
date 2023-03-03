import "virtual:svg-icons-register";

const DOM = {
  timeline: "timeline",
  timelineStep: "timeline__step",
  timelineStepActive: "is-active",
};

const timeline = document.querySelector(`.${DOM.timeline}`);

function deactivateSteps(): void {
  const steps = document.querySelectorAll(`.${DOM.timelineStep}`);
  steps?.forEach((elem) => elem.classList.remove(`${DOM.timelineStepActive}`));
}

function activateCurrentStep(currentStep: Element): void {
  currentStep?.classList.add(`${DOM.timelineStepActive}`);
}

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
