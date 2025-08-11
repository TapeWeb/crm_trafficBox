import {deviceBreakpoints, type DeviceType} from "./types.ts";

export function getDeviceType(width: number = window.innerWidth): DeviceType {
  for(const device of deviceBreakpoints) {
    if(width <= device.maxWidth) {
      return device.type;
    }
  }
  return "Desktop";
}