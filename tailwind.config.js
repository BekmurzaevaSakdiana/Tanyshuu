/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      mont: ["Montserrat", "sans-serif"],
    },
    extend: {
      boxShadow: {
        'pink': '0 0 90px rgb(251, 3, 127), 0 0 12px rgba(218, 5, 112, 0.998)',
    },
    
      colors: {
        BrightRed: "#E43D12 ",
        ShadeOfPink: "#D6536D",
        LightCoral: "#FFA2B6 ",
        Goldenrod: "#EFB11B ",
        Alabaster: "#EBE9E1 ",
        customColor: "#78DBE2",
        customBlue: "#6A5ACD",
      },
    },
  },
  plugins: [],
};
