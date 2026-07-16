export type ProjectMetric = { label: string; value: string };

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  period: string;
  status: string;
  tags: string[];
  metrics?: ProjectMetric[];
  achievements?: string[];
  href?: string;
  repoPlaceholder?: string;
  featured?: boolean;
};

export const featuredProject: Project = {
  id: "urban-pulse",
  title: "Urban Pulse",
  tagline: "Smart pavement that harvests energy and reads traffic in real time.",
  description:
    "Urban Pulse is a hybrid piezoelectric + triboelectric smart-pavement system paired with an ESP32 embedded controller. Each panel harvests kinetic energy from passing vehicles while simultaneously sensing them — enabling self-powered vehicle detection, classification, and speed estimation without external power infrastructure.",
  role: "Lead Hardware & Firmware Engineer",
  period: "2024 — Present",
  status: "Patent application in progress",
  tags: ["Embedded Systems", "Energy Harvesting", "ESP32", "IoT", "Traffic Analytics", "Sustainable Infrastructure"],
  metrics: [
    { label: "Detection accuracy", value: "96.2%" },
    { label: "Energy harvested / axle", value: "18 mJ" },
    { label: "Wireless range", value: "120 m" },
    { label: "Classification classes", value: "4" },
  ],
  achievements: [
    "Winner — Electrothon 8.0",
    "Finalist — IIT Bombay Techfest",
    "Patent application filed (in progress)",
  ],
  href: "/projects/urban-pulse",
  repoPlaceholder: "github.com/vipuldabaria/urban-pulse",
  featured: true,
};

export const otherProjects: Project[] = [
  {
    id: "pinn-inertia",
    title: "PINN Inertia Estimator",
    tagline: "Physics-informed neural network for grid inertia estimation.",
    description:
      "A research prototype that estimates system inertia in real time from EMU measurement streams, using a physics-informed loss derived from the swing equation.",
    role: "Research Intern, IIT Kharagpur",
    period: "Summer 2025",
    status: "Research complete — write-up in progress",
    tags: ["PyTorch", "PINNs", "Power Systems", "Scientific ML"],
    href: "/research/pinn-inertia-estimation",
    repoPlaceholder: "github.com/vipuldabaria/pinn-inertia",
  },
  {
    id: "grid-visualizer",
    title: "Single-Line Grid Visualizer",
    tagline: "Interactive SCADA-style single-line diagram renderer.",
    description:
      "A lightweight web tool for rendering substation single-line diagrams from a JSON topology description — built while documenting the PGCIL internship.",
    role: "Personal Project",
    period: "2024",
    status: "Active",
    tags: ["TypeScript", "SVG", "SCADA", "Data Visualization"],
    repoPlaceholder: "github.com/vipuldabaria/grid-visualizer",
  },
  {
    id: "campus-ecell-site",
    title: "IIC / E-Cell Website",
    tagline: "The web presence for RTU's innovation cell.",
    description:
      "Designed and maintain the website for the Innovation & Incubation Cell — event listings, registrations, and partner showcases.",
    role: "Coordinator & Maintainer",
    period: "2024 — Present",
    status: "Live",
    tags: ["Next.js", "Web", "Design"],
  },
];
