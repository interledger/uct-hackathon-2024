import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Lato,
  Karla,
  Paytone_One,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});
export const karla = Karla({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});
export const paytone_one = Paytone_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});
