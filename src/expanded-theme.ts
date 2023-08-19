// why don't i need to import this if i'm declaring the module and interface?
// is this akin to declaring a class?
// ok you need to keep the import

// @ts-ignore
import { Palette, PaletteColor } from "@mui/material/styles/createPalette";

// declaring custom interfaces for mui
declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    [key: number]: string;
  }

  interface Palette {
    // include all ("primary", "secondary", "tertiary", "grey") ?
    tertiary: PaletteColor;
  }
}
