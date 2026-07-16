export type ExperienceEntry = {
  id: string;
  org: string;
  role: string;
  period: string;
  location: string;
  type: "Research" | "Industrial" | "Leadership";
  summary: string;
  responsibilities: string[];
  systems: string[];
  technologies: string[];
  outcomes: string[];
  highlights: string[];
  skills: string[];
  href?: string; // link to deep-dive page, if any
};

export const experience: ExperienceEntry[] = [
  {
    id: "iit-kgp",
    org: "Indian Institute of Technology, Kharagpur",
    role: "Research Intern — Power Systems & Scientific ML",
    period: "Summer 2025",
    location: "Kharagpur, West Bengal",
    type: "Research",
    summary:
      "Researched inertia estimation in modern power systems using Physics-Informed Neural Networks (PINNs), trained on real electromechanical mode measurement data — bridging classical grid-dynamics theory with scientific machine learning.",
    responsibilities: [
      "Owned the end-to-end research pipeline — from literature review and data acquisition through model design, training, and write-up.",
      "Cleaned and pre-processed real-world Electromechanical Mode Unit (EMU) measurement streams, applying signal-processing techniques to handle sensor noise and missing-data segments.",
      "Derived a differentiable residual form of the power-system swing equation to serve as the physics-consistency loss term.",
      "Designed and trained a physics-informed neural architecture using automatic differentiation to compute the physics residual directly from network outputs.",
      "Ran controlled experimental validation against classical signal-processing baselines, isolating the physics-loss term's contribution to accuracy and robustness.",
      "Presented weekly progress to the faculty advisor and documented methodology and results to publication standard.",
    ],
    systems: [
      "Electromechanical Mode Unit (EMU) — wide-area frequency & phase-angle measurement",
      "Swing-equation-based single- and multi-machine grid dynamics models",
      "Wide-area monitoring system (WAMS) data conventions",
    ],
    technologies: ["Python", "PyTorch", "NumPy / pandas", "Signal Processing", "Automatic Differentiation", "Physics-Informed Neural Networks (PINNs)", "Experimental Validation", "Jupyter", "LaTeX"],
    outcomes: [
      "Built a working PINN estimator whose physics-residual term measurably improved generalization on disturbance events outside the training distribution.",
      "Quantified the accuracy/robustness trade-off between physics-loss weighting and pure data-fitting.",
      "Produced a documented methodology and result set that forms the basis of a manuscript currently in preparation.",
    ],
    highlights: [
      "Built a PINN-based estimator that embeds swing-equation physics directly into the training loss.",
      "Processed and cleaned real-world EMU measurement data for supervised and physics-residual training.",
      "Benchmarked estimation accuracy and generalization against conventional signal-processing baselines.",
    ],
    skills: ["Python", "PyTorch", "PINNs", "Scientific ML", "Power System Dynamics", "EMU Data"],
    href: "/research/pinn-inertia-estimation",
  },
  {
    id: "pgcil",
    org: "Power Grid Corporation of India Limited",
    role: "Industrial Intern — 220kV AIS Substation",
    period: "Winter 2024",
    location: "India",
    type: "Industrial",
    summary:
      "Hands-on exposure to grid operations at a 220kV Air-Insulated Substation — from switchyard equipment and protection philosophy to the SCADA systems operators use to run it in real time, under the safety discipline a live high-voltage yard demands.",
    responsibilities: [
      "Shadowed substation engineers during routine switching operations, equipment inspections, and maintenance procedures, always under permit-to-work and lockout-tagout safety practices.",
      "Studied the SCADA architecture used for real-time monitoring, alarm annunciation, and remote control of switchyard equipment.",
      "Reviewed single-line diagrams and busbar arrangement — double-bus, main-and-transfer schemes — and how they trade off reliability against cost.",
      "Reviewed protection coordination schemes for incoming and outgoing feeders, including lightning-arrester and wave-trap placement for surge and carrier-signal protection.",
      "Observed testing and commissioning checks on protection relays and instrument transformers following scheduled maintenance.",
      "Documented switchyard bay layouts and equipment specifications for an internal training note.",
    ],
    systems: [
      "220kV Air-Insulated Switchyard (AIS) — busbar arrangement, isolators, circuit breakers",
      "SCADA / RTU-based substation automation",
      "Current transformers (CTs), potential transformers (PTs), and Capacitor Voltage Transformers (CVTs)",
      "Lightning arresters and wave traps — surge protection and power-line carrier communication",
      "Numerical protection relays — distance, differential, and overcurrent schemes",
    ],
    technologies: ["SCADA HMI", "IEC 61850 substation communication (introductory exposure)", "Relay test sets", "Single-line diagram tools", "Permit-to-work / LOTO safety practices"],
    outcomes: [
      "Developed a working understanding of how protection philosophy, equipment redundancy, and SCADA visibility combine to keep a live 220kV bus stable.",
      "Learned to read busbar arrangement and single-line diagrams as operational tools, not textbook abstractions — including why CVTs, wave traps, and arresters sit where they do.",
      "Came away with a concrete mental model of fault clearing — from relay pickup to breaker operation to SCADA alarm — later informing my Urban Pulse sensing design.",
      "Internalized the safety discipline (permits, lockout-tagout, PPE) that live-yard work demands, non-negotiably.",
    ],
    highlights: [
      "Studied SCADA architecture used for real-time substation monitoring and control.",
      "Observed switchyard equipment: circuit breakers, isolators, CTs, PTs, CVTs, lightning arresters, and wave traps.",
      "Learned protection philosophy — relay coordination, fault clearing, busbar arrangement, and safety practices.",
    ],
    skills: ["SCADA", "Switchyard Equipment", "Protection Systems", "Busbar Arrangement", "Transmission Reliability", "Grid Operations", "Safety Practices"],
  },
  {
    id: "ntpc",
    org: "NTPC Limited",
    role: "Industrial Intern — Combined Cycle Power Plant",
    period: "Winter 2023",
    location: "India",
    type: "Industrial",
    summary:
      "Studied the combined-cycle generation process at an NTPC plant — from gas turbine combustion through heat-recovery steam generation to grid dispatch — with a focus on the thermal cycle, control-room instrumentation, and plant reliability practice.",
    responsibilities: [
      "Traced the full combined-cycle thermal cycle across gas turbine, heat recovery steam generator (HRSG), and steam turbine stages, and how waste heat recovery lifts overall efficiency.",
      "Observed condition-monitoring and preventive-maintenance routines on rotating machinery.",
      "Spent time in the control room reviewing DCS instrumentation and trend displays for turbine, generator, and boiler parameters.",
      "Studied plant dispatch scheduling and the economics behind combined-cycle operation versus simple-cycle running.",
    ],
    systems: [
      "Gas turbine — combustion, compression, and exhaust stages",
      "Heat Recovery Steam Generator (HRSG) — heat recovery from turbine exhaust",
      "Steam turbine and condenser system",
      "Distributed Control System (DCS) — control-room instrumentation for plant-wide monitoring",
    ],
    technologies: ["DCS control-room instrumentation", "Vibration & condition-monitoring basics", "Plant single-line & P&ID reading", "Thermal-cycle efficiency analysis"],
    outcomes: [
      "Built an end-to-end picture of the combined-cycle thermal cycle — how a plant converts fuel into dispatchable grid power, and where efficiency is won or lost.",
      "Understood how maintenance scheduling directly trades off against plant availability and dispatch revenue.",
      "Gained an operator's-eye appreciation, from time in the control room, for the gap between nameplate capacity and real-world availability.",
    ],
    highlights: [
      "Traced the combined-cycle flow: gas turbine → heat recovery steam generator → steam turbine.",
      "Observed plant maintenance schedules and reliability practices for rotating machinery.",
      "Learned fundamentals of power generation economics and dispatch scheduling.",
    ],
    skills: ["Gas Turbine", "Steam Turbine", "Combined Cycle Operation", "Plant Maintenance", "Power Generation"],
  },
];

export const leadership = {
  id: "iic-ecell",
  org: "Innovation & Incubation Cell (IIC) / E-Cell, RTU Kota",
  role: "Coordinator",
  period: "2024 — Present",
  summary:
    "Leading a student team that runs the institute's innovation and entrepreneurship programming — from large-scale recruitment drives to hands-on technical workshops.",
  responsibilities: [
    { title: "Internship Fair", detail: "Organized the institute-wide Internship Fair, coordinating industry partners, logistics, and student outreach." },
    { title: "Innovation Events", detail: "Managed ideation challenges and startup-pitch events to grow a campus culture of building." },
    { title: "Technical Workshops", detail: "Coordinated hands-on workshops spanning embedded systems, prototyping, and product thinking." },
    { title: "Website Management", detail: "Owns the cell's web presence — content, design, and maintenance." },
    { title: "Team Leadership", detail: "Leads a cross-functional student team, delegating ownership across events, design, and outreach." },
    { title: "Industry Interaction", detail: "Primary point of contact for incoming industry partners, mentors, and alumni collaborators." },
  ],
};
