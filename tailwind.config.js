/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundColor: {
        "main-bg": "#06141B",
        "aux-bg": "#11212D",
        "t-bg": "#253745",
      },
    },
  },
  plugins: [],
};
// --bg1: #06141B;
//   --bg2: #11212D;
//   --bg3: #253745;
//   --bg4: #4A5C5A;
//   --bg5: #9BABAB;
//   --bg6: #CCD0CF;