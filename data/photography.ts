export type PhotoEntry = {
  id: string;
  caption: string;
  location: string;
};

export const photos: PhotoEntry[] = [
  { id: "p1", caption: "Substation switchyard at dusk", location: "PGCIL site visit" },
  { id: "p2", caption: "Turbine hall interior", location: "NTPC plant" },
  { id: "p3", caption: "Campus in monsoon light", location: "RTU, Kota" },
  { id: "p4", caption: "IIT Kharagpur campus", location: "Research internship" },
  { id: "p5", caption: "Urban Pulse prototype, workshop bench", location: "RTU lab" },
  { id: "p6", caption: "Electrothon 8.0, demo floor", location: "Hackathon venue" },
  { id: "p7", caption: "Night sky, long exposure", location: "Kota" },
  { id: "p8", caption: "Transmission towers, golden hour", location: "Field trip" },
  { id: "p9", caption: "Street, early morning", location: "Kharagpur" },
];
