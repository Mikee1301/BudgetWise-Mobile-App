/**
 * @fileoverview BudgetWise Color Palette
 * Defines the complete color system for the BudgetWise financial application.
 * This centralized file ensures consistent branding and theming across
 * the entire project with colors optimized for financial data display.
 */

export const COLORS = {
  // --- Primary Brand Colors ---
  // Deep Teal - Main brand color for trust and financial stability
  primary: "#2D7D7D",
  primaryLight: "#4A9B9B",
  primaryDark: "#1F5A5A",
  primaryVeryLight: "#E6F3F3",

  // --- Financial Status Colors ---
  // Green palette for positive financial indicators
  success: "#00C896",
  successLight: "#33D4AB",
  successDark: "#00A678",
  successVeryLight: "#E6FAF6",

  // Red palette for expenses and negative indicators
  danger: "#FF6B6B",
  dangerLight: "#FF8A8A",
  dangerDark: "#E55555",
  dangerVeryLight: "#FFF0F0",

  // --- Secondary Brand Colors ---
  // Soft Purple for premium features and main balance card
  secondary: "#8B7ED8",
  secondaryLight: "#A699E3",
  secondaryDark: "#7268C7",
  secondaryVeryLight: "#F2F0FB",

  // Orange for analytics and notifications
  warning: "#FFB347",
  warningLight: "#FFC566",
  warningDark: "#E69E3A",
  warningVeryLight: "#FFF7ED",

  // Light Blue for information and neutral actions
  info: "#5DADE2",
  infoLight: "#7FBDE8",
  infoDark: "#4A96C7",
  infoVeryLight: "#EDF7FD",

  // --- Neutral Grayscale ---
  // Complete grayscale for backgrounds, text, and UI elements
  white: "#FFFFFF",
  gray50: "#FAFBFC",
  gray100: "#ECF0F1",
  gray200: "#D5DBDB",
  gray300: "#BDC3C7",
  gray400: "#A6ACAF",
  gray500: "#7F8C8D",
  gray600: "#6C7B7D",
  gray700: "#566263",
  gray800: "#2C3E50",
  gray900: "#1B2631",
  black: "#000000",

  // --- Text Colors ---
  // Optimized for readability in financial interfaces
  text: "#2C3E50", // Primary text - charcoal
  textLight: "#7F8C8D", // Secondary text - medium gray
  textMuted: "#BDC3C7", // Muted text - light gray
  textInverse: "#FFFFFF", // Text on dark backgrounds

  // --- Background Colors ---
  background: "#FFFFFF", // Main app background
  backgroundSecondary: "#FAFBFC", // Secondary background
  backgroundMuted: "#ECF0F1", // Muted background for cards

  // --- Border Colors ---
  border: "#D5DBDB", // Default borders
  borderLight: "#ECF0F1", // Light borders
  borderDark: "#BDC3C7", // Darker borders for emphasis

  // --- Account Type Colors ---
  // Specific colors for different account types
  savings: "#5DADE2", // Savings accounts - light blue
  checking: "#00C896", // Checking accounts - green
  credit: "#8B7ED8", // Credit cards - purple
  investment: "#FFB347", // Investment accounts - orange

  // --- Gradients ---
  // Pre-defined gradients for cards and special elements
  gradients: {
    primary: "linear-gradient(135deg, #2D7D7D 0%, #1F5A5A 100%)",
    success: "linear-gradient(135deg, #00C896 0%, #00A678 100%)",
    secondary: "linear-gradient(135deg, #8B7ED8 0%, #7268C7 100%)",
    warm: "linear-gradient(135deg, #FFB347 0%, #E69E3A 100%)",
    cool: "linear-gradient(135deg, #5DADE2 0%, #4A96C7 100%)",
  },

  // --- Alpha/Opacity Variants ---
  // Transparent versions for overlays and subtle effects
  alpha: {
    primary: "rgba(45, 125, 125, 0.1)",
    success: "rgba(0, 200, 150, 0.1)",
    danger: "rgba(255, 107, 107, 0.1)",
    warning: "rgba(255, 179, 71, 0.1)",
    info: "rgba(93, 173, 226, 0.1)",
    dark: "rgba(44, 62, 80, 0.1)",
  },

  // --- Shadow Colors ---
  // For consistent shadow styling
  shadow: {
    light: "rgba(0, 0, 0, 0.1)",
    medium: "rgba(0, 0, 0, 0.15)",
    dark: "rgba(0, 0, 0, 0.25)",
  },
};

// --- Color Utility Functions ---
/**
 * Get color with custom opacity
 * @param {string} color - Hex color code
 * @param {number} opacity - Opacity value between 0 and 1
 * @returns {string} RGBA color string
 */
export const withOpacity = (color, opacity) => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Get appropriate text color based on background
 * @param {string} backgroundColor - Background color hex code
 * @returns {string} Text color (dark or light)
 */
export const getContrastColor = (backgroundColor) => {
  // Simple contrast calculation
  const hex = backgroundColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? COLORS.text : COLORS.textInverse;
};

// --- Theme Presets ---
export const THEMES = {
  light: {
    background: COLORS.white,
    surface: COLORS.gray50,
    text: COLORS.text,
    textSecondary: COLORS.textLight,
  },
  card: {
    background: COLORS.white,
    border: COLORS.borderLight,
    shadow: COLORS.shadow.light,
  },
};
