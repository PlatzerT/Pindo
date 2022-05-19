import React from "react";
import Svg, { Circle } from "react-native-svg";

interface IProps {
  pointColor: string;
  ringColor: string;
}

export default function PriorityPoint({ pointColor, ringColor }: IProps) {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none">
      <Circle cx="10.5" cy="10.5" r="10.5" fill={ringColor} />
      <Circle cx="10.5" cy="10.5" r="5.5" fill={pointColor} />
    </Svg>
  );
}
