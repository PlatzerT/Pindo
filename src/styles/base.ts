import { Dimensions } from "react-native";

export const dimensions = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width,
};

export const colors = {
  primary: "#1D4ED8",
  pHigh: "#EF4444", // priority high
  pRingHigh: "#FEE2E2",
  pMedium: "#F59E0B", // priority medium
  pRingMedium: "#FEF3C7",
  pLow: "#10B981", // priority low
  pRingLow: "#D1FAE5",
  pDeleted: "#6B7280",
  pRingDeleted: "#F3F4F6"
};

export const spacing = {
  sm: 10,
  md: 20,
  lg: 28,
  xl: 37,
};

export const fonts = {
  xs: 12,
  sm: 14,
  base: 16,
  md: 18,
  lg: 24,
  xl: 36,
  "2xl": 48,
  //primary: "Cochin",
};
