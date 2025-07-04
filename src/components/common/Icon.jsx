import { icons } from "lucide-react-native";
import React from "react";

const Icon = ({ name, color, size, ...props }) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) {
    // fallback: render nothing or a default icon
    return null;
  }
  return <LucideIcon color={color} size={size} {...props} />;
};

export default Icon;
