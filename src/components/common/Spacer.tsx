import React from "react";
import { View, ViewStyle } from "react-native";

interface SpacerProps {
  height?: number;
  width?: string | number;
}

const Spacer: React.FC<SpacerProps> = ({ height = 20, width = "100%" }) => {
  return <View style={{ height, width } as ViewStyle}></View>;
};

export default Spacer;
