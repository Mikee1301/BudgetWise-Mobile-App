import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface CardProps {
  notTouchable: boolean;
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
}
