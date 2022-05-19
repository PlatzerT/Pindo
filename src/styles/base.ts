import { Dimensions } from "react-native";

export const dimensions = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width,
};

export const colors = {
  primary: "#1D4ED8",
  pHigh: "#EF4444", // priority high
  pMedium: "#F59E0B", // priority medium
  pLow: "#10B981", // priority low
};

export const padding = {
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
