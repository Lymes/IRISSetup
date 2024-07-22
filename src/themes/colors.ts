// Colors palette source https://flatuicolors.com/palette/defo

const SUN_FLOWER = "#f1c40f";
const ASBESTOS = "#1a3659";
const MIDNIGHT_BLUE = "#2c3e50";
const EMERALD = "#2ecc71";
const ALIZARIN = "#e74c3c";
const CLOUDS = "#ecf0f1";
const SILVER = "#bdc3c7";
const BLUE = "#168CED";

export type Colors = {
  primary: string;
  secondary: string;
  background: string;
  primaryForeground: string;
  primaryBackground: string;
  secondaryBackground: string;
  drawerBackground: string;
  headerBackground: string;
  headerTint: string;
  cardBackground: string;
  cardTint: string;
  borderColor: string;
  error: string;
};

const light: Colors = {
  primary: "#141e1d",
  secondary: BLUE,
  background: "#ccd4dd",
  primaryForeground: "white",
  primaryBackground: BLUE,
  secondaryBackground: ASBESTOS,
  drawerBackground: "#446063",
  headerBackground: "#446063",
  headerTint: "#f9f9f9",
  cardBackground: SUN_FLOWER,
  cardTint: "black",
  borderColor: "grey",
  error: "red",
};

const dark = {
  primary: "#ccd4dd",
  secondary: "grey",
  background: "#141e1d",
  primaryForeground: "white",
  primaryBackground: BLUE,
  secondaryBackground: ASBESTOS,
  drawerBackground: "#446063",
  headerBackground: "#446063",
  headerTint: "#f9f9f9",
  cardBackground: SUN_FLOWER,
  cardTint: "black",
  borderColor: "grey",
  error: "red",
};

export const colors = { light, dark };
