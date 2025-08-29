export type DeviceType = "Mobile" | "Tablet" | "Laptop" | "Desktop";

export interface DeviceBreakpoint {
  type: DeviceType;
  maxWidth: number;
}

export const deviceBreakpoints: DeviceBreakpoint[] = [
  {type: "Mobile", maxWidth: 767},
  {type: "Tablet", maxWidth: 1023},
  {type: "Laptop", maxWidth: 1439},
  {type: "Desktop", maxWidth: Infinity},
];