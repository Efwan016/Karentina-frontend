/** @type {import('tailwindcss').Config} */

const colors = {
  color1: "#F97316",
  color2: "#4722F5",
  color3: "#0EA52F",
  color4: "#08041A",
  color5: "#FFBF32",

  gray1: "#D1D0D5",
  gray2: "#6C6D6F",
  gray3: "#F4F5F7",
  gray4: "#B9BBBE",
};

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,svg}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      fill: { ...colors },
      fontFamily: {
        sans: ["'Poppins', sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
