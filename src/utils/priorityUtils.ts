import {colors} from "../styles/base";

export function priorityToColor(priority: string) {
  let pointColor: string;
  let ringColor: string;
  switch (priority) {
    case "high":
      pointColor = colors.pHigh;
      ringColor = colors.pRingHigh;
      break;
    case "medium":
      pointColor = colors.pMedium;
      ringColor = colors.pRingMedium;
      break;
    case "low":
      pointColor = colors.pLow;
      ringColor = colors.pRingLow;
      break;
  }
  return { pointColor, ringColor };
}