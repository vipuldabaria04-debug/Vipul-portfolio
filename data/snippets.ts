export type Snippet = {
  id: string;
  title: string;
  kind: "Visualization" | "Code" | "Insight" | "Prototype" | "Lesson";
  description: string;
  code?: string;
  language?: string;
};

export const snippets: Snippet[] = [
  {
    id: "s1",
    title: "PINN Training Results",
    kind: "Visualization",
    description:
      "Loss convergence for the composite PINN objective — data term and physics-residual term plotted across training epochs. [Placeholder for training curve figure.]",
  },
  {
    id: "s2",
    title: "ESP32 Firmware — Vehicle Trigger Logic",
    kind: "Code",
    language: "cpp",
    description: "Debounced threshold trigger used to detect an axle event from the piezoelectric front-end before sampling begins.",
    code: `if (analogRead(SENSOR_PIN) > TRIGGER_THRESHOLD) {
  uint32_t now = millis();
  if (now - lastTrigger > DEBOUNCE_MS) {
    captureWindow();   // start high-rate ADC capture
    lastTrigger = now;
  }
}`,
  },
  {
    id: "s3",
    title: "Traffic Classification Algorithm",
    kind: "Insight",
    description:
      "Classifying vehicle type from a piezoelectric waveform comes down to two features: peak force and axle spacing (time between successive peaks). A lightweight decision-tree on just those two features nearly matched a heavier model — a reminder to try simple baselines first.",
  },
  {
    id: "s4",
    title: "SCADA Learning Notes",
    kind: "Lesson",
    description:
      "At PGCIL, the SCADA HMI wasn't just a dashboard — it was the operator's mental model of the entire switchyard. Good HMI design in critical infrastructure is a safety feature, not a UI nicety.",
  },
  {
    id: "s5",
    title: "Power Grid Single-Line Visualization",
    kind: "Prototype",
    description:
      "A small SVG renderer that turns a JSON substation topology into a single-line diagram, built to document what I observed during the PGCIL internship. [Placeholder for interactive demo / screenshot.]",
  },
  {
    id: "s6",
    title: "MATLAB — Swing Equation Simulation",
    kind: "Code",
    language: "matlab",
    description: "Minimal single-machine swing-equation integrator used to sanity-check the PINN physics residual before training.",
    code: `[t, w] = ode45(@(t,w) (Pm - Pe - D*w) / (2*H), tspan, w0);
plot(t, w); xlabel('t (s)'); ylabel('\\Delta\\omega (rad/s)');`,
  },
];
