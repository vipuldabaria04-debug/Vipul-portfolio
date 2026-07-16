export const pinnResearch = {
  title: "Inertia Estimation in Modern Power Systems using Physics-Informed Neural Networks",
  shortTitle: "PINN Inertia Estimation",
  institution: "Indian Institute of Technology, Kharagpur",
  period: "Summer 2025",
  status: "Research complete — manuscript in preparation",
  abstract:
    "As power systems integrate more inverter-based renewable generation, system inertia — the property that resists sudden frequency change — is falling and becoming harder to estimate with classical methods. This project develops a Physics-Informed Neural Network (PINN) that estimates regional inertia directly from Electromechanical Mode Unit (EMU) measurements, embedding the swing equation into the training objective so the model's predictions stay physically consistent even in noisy, low-data regimes.",
  problemStatement:
    "Grid operators need fast, accurate inertia estimates to maintain frequency stability, but declining synchronous generation makes inertia time-varying and location-dependent. Purely data-driven models can fit measurement noise and violate known physics; purely analytical methods struggle with real-world measurement imperfections. The project asks: can a neural network that is constrained by the governing swing equation produce inertia estimates that are both accurate and physically trustworthy?",
  whyItMatters: [
    "Lower system inertia means faster, larger frequency deviations after a disturbance — a growing risk as renewables displace synchronous generators.",
    "Operators use inertia estimates to size frequency response reserves and set protection thresholds.",
    "Classical estimation methods (e.g. rate-of-change-of-frequency fitting) are sensitive to noise and assume idealized conditions rarely met in the field.",
  ],
  whatArePinns:
    "A Physics-Informed Neural Network is trained with a loss function that combines a standard data-fitting term with a residual term derived from a governing differential equation — in this case, the power system swing equation. This forces the network's output to remain consistent with known physics even where labeled data is sparse or noisy, improving generalization outside the training distribution.",
  methodology: [
    {
      step: "01",
      title: "Data acquisition & cleaning",
      detail: "Collected and cleaned real-world Electromechanical Mode Unit (EMU) measurement data capturing frequency and power-angle dynamics following grid disturbances.",
    },
    {
      step: "02",
      title: "Physics formulation",
      detail: "Derived a differentiable residual form of the swing equation to serve as the physics-consistency term in the loss function.",
    },
    {
      step: "03",
      title: "Model architecture",
      detail: "Designed a feed-forward PINN with automatic differentiation used to compute the physics residual directly from network outputs.",
    },
    {
      step: "04",
      title: "Training",
      detail: "Trained with a composite loss — data-fitting term + physics-residual term + boundary/initial condition term — tuning relative weights for stable convergence.",
    },
    {
      step: "05",
      title: "Evaluation",
      detail: "Benchmarked estimation accuracy, robustness to noise, and generalization against classical signal-processing baselines on held-out disturbance events.",
    },
  ],
  datasetOverview: {
    source: "Electromechanical Mode Unit (EMU) measurements",
    description:
      "EMU units capture high-resolution frequency and phase-angle measurements around grid disturbance events, which reveal a system's electromechanical oscillation modes — the raw signal from which inertia can be inferred.",
    properties: [
      "High sampling-rate frequency & angle measurements",
      "Multiple disturbance events across varying grid conditions",
      "Real-world measurement noise and missing-data segments",
    ],
  },
  lossFunction: {
    description:
      "The total loss combines three terms: a supervised data-fitting term measuring prediction error against labeled inertia values, a physics-residual term penalizing violation of the swing equation, and a regularization term for stability.",
    terms: [
      { symbol: "L_data", meaning: "Mean-squared error between predicted and measured system response" },
      { symbol: "L_physics", meaning: "Residual of the swing-equation differential constraint, evaluated via autodiff" },
      { symbol: "L_reg", meaning: "Weight regularization to control model complexity and stabilize training" },
    ],
  },
  keyLearnings: [
    "Embedding physics into the loss meaningfully improved generalization on disturbance events outside the training distribution.",
    "Careful weighting between data and physics loss terms was critical — over-weighting physics slowed convergence, under-weighting reintroduced overfitting.",
    "Real EMU data required substantial cleaning; measurement gaps and noise had a larger effect on results than model architecture choices.",
    "Scientific ML research rewards patience with the physics as much as with the model — most gains came from better problem formulation, not bigger networks.",
  ],
  futureWork: [
    "Extend the model to multi-area systems with regional inertia estimation.",
    "Explore uncertainty quantification for operator-facing confidence intervals.",
    "Prepare findings for submission to a power-systems / scientific-ML venue.",
  ],
  skills: ["Python", "PyTorch", "Physics-Informed Neural Networks", "Scientific Machine Learning", "Power System Dynamics", "EMU Data Analysis", "Research Documentation"],
};

export const researchInterests = [
  {
    title: "Power Systems & Grid Dynamics",
    detail: "Stability, protection, and the evolving physics of inverter-dominated grids.",
  },
  {
    title: "Embedded Systems",
    detail: "Low-power sensing and control at the edge — from firmware to signal conditioning.",
  },
  {
    title: "Smart & Sustainable Infrastructure",
    detail: "Self-powered sensing, energy harvesting, and instrumented civil infrastructure.",
  },
  {
    title: "Scientific Machine Learning",
    detail: "Physics-informed and physics-constrained ML for scientific and engineering systems.",
  },
  {
    title: "Intelligent Transportation",
    detail: "Traffic sensing, classification, and optimization using distributed low-cost sensors.",
  },
  {
    title: "Technology Entrepreneurship",
    detail: "Turning research-grade prototypes into deployable, fundable products.",
  },
];
