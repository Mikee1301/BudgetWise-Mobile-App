/**
 * @fileoverview Defines the color palette for the application.
 * This centralized file makes it easy to maintain a consistent look and feel
 * across the entire project.
 */

export const COLORS = {
  // --- Primary Palette ---
  // Use for main actions, links, and important highlights.
  primary: "#007bff",
  primaryLight: "#66aaff",
  primaryDark: "#0056b3",

  // --- Secondary Palette ---
  // Use for less important elements and secondary actions.
  secondary: "#6c757d",
  secondaryLight: "#adb5bd",
  secondaryDark: "#495057",

  // --- Grayscale ---
  // A full grayscale palette for backgrounds, borders, and text.
  white: "#ffffff",
  gray100: "#f8f9fa",
  gray200: "#e9ecef",
  gray300: "#dee2e6",
  gray400: "#ced4da",
  gray500: "#adb5bd",
  gray600: "#6c757d", // Same as secondary
  gray700: "#495057", // Same as secondaryDark
  gray800: "#343a40",
  gray900: "#212529",
  black: "#000000",

  // --- Status & Feedback Colors ---
  success: "#28a745", // For success messages, confirmations.
  danger: "#dc3545", // For errors, warnings, and destructive actions.
  warning: "#ffc107", // For non-critical alerts.
  info: "#17a2b8", // For informational messages and highlights.

  // --- Text ---
  text: "#212529", // Default text color (almost black)
  textLight: "#6c757d", // Lighter text for secondary information
};
