import { EPriority } from "../models/EPriority";
import { colors } from "../styles/base";

export default function priorityToColor(priority: EPriority) {
  let pointColor: string;
  let ringColor: string;
  switch (priority) {
    case EPriority.HIGH:
      pointColor = colors.pHigh;
      ringColor = colors.pRingHigh;
      break;
    case EPriority.MEDIUM:
      pointColor = colors.pMedium;
      ringColor = colors.pRingMedium;
      break;
    case EPriority.LOW:
      pointColor = colors.pLow;
      ringColor = colors.pRingLow;
      break;
  }
  return { pointColor, ringColor };
}
