export const lightTheme = {
  colors: {
    // Primary colors
    primary: "#673AB7",
    primaryLight: "#9A67EA",
    primaryDark: "#320B86",
    
    // Secondary colors
    secondary: "#FFD300",
    secondaryLight: "#FFE54C",
    secondaryDark: "#C7A200",
    
    // Background colors
    background: "#FFFFFF",
    surface: "#F8F9FA",
    card: "#FFFFFF",
    
    // Text colors
    text: "#212121",
    textSecondary: "#757575",
    textTertiary: "#9E9E9E",
    
    // Status colors
    success: "#4ADE80",
    info: "#246BFD",
    warning: "#FACC15",
    error: "#F75555",
    
    // Border and divider colors
    border: "#E0E0E0",
    divider: "#EEEEEE",
    
    // Greyscale
    greyscale: {
      900: "#212121",
      800: "#424242",
      700: "#616161",
      600: "#757575",
      500: "#9E9E9E",
      400: "#BDBDBD",
      300: "#E0E0E0",
      200: "#EEEEEE",
      100: "#F5F5F5",
      50: "#FAFAFA"
    },
    
    // Legacy colors for backward compatibility
    White: "#FFFFFF",
    Black: "#000000",
    Dark3: "#35383F",
    Disabled: "#D8D8D8",
    DisButton: "#E9A33F",
  },
  font: {
    bold: "PlusJakartaSans-Bold",
    regular: "PlusJakartaSans-Regular",
    medium: "PlusJakartaSans-Medium",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 100,
  },
  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

export const darkTheme = {
  colors: {
    // Primary colors
    primary: "#9A67EA",
    primaryLight: "#C490FF",
    primaryDark: "#673AB7",
    
    // Secondary colors
    secondary: "#FFE54C",
    secondaryLight: "#FFF176",
    secondaryDark: "#FFD300",
    
    // Background colors
    background: "#121212",
    surface: "#1E1E1E",
    card: "#2D2D2D",
    
    // Text colors
    text: "#FFFFFF",
    textSecondary: "#BDBDBD",
    textTertiary: "#9E9E9E",
    
    // Status colors
    success: "#4ADE80",
    info: "#246BFD",
    warning: "#FACC15",
    error: "#F75555",
    
    // Border and divider colors
    border: "#424242",
    divider: "#2D2D2D",
    
    // Greyscale
    greyscale: {
      900: "#FFFFFF",
      800: "#E0E0E0",
      700: "#BDBDBD",
      600: "#9E9E9E",
      500: "#757575",
      400: "#616161",
      300: "#424242",
      200: "#2D2D2D",
      100: "#1E1E1E",
      50: "#121212"
    },
    
    // Legacy colors for backward compatibility
    White: "#2D2D2D",
    Black: "#FFFFFF",
    Dark3: "#424242",
    Disabled: "#424242",
    DisButton: "#E9A33F",
  },
  font: {
    bold: "PlusJakartaSans-Bold",
    regular: "PlusJakartaSans-Regular",
    medium: "PlusJakartaSans-Medium",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 100,
  },
  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.5,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

// Legacy theme export for backward compatibility
export const theme = lightTheme;