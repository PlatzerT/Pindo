import { Dimensions } from "react-native";

export const dimensions = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width,
};

export const colors = {
  primary: "#2563eb",
  pointActive: "#3b82f6",
  ringActive: "#dbeafe",
  pointDeleted: "#6B7280",
  ringDeleted: "#F3F4F6",
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
};

export const sharedStyles: any = {
  screenBackground: {
    backgroundColor: colors.primary,
    flex: 1,
    width: null,
    height: null,
    position: "relative",
  },
};
