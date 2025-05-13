/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)", // #ef4a23
        secondary: "var(--secondary)", // #1877f2
        success: "var(--success)", // #198754
        danger: "var(--danger)", // #dc3545
        warning: "var(--warning)", // #ffc107
        info: "var(--info)", // #0dcaf0
        white: "var(--white)", // #ffffff
        black: "var(--black)", // #000000
        slate: "var(--slate)",
        stech: "var(--stech)",
        widget: "var(--widget)",
        bg_primary: "var(--bg-primary)",
        accent: "var(--accent)",
        primary_text: "var(--primary-text)",
        secondary_text: "var(--secondary-text)",
      },
      my_linear_gradient: `linear-gradient(125deg,#0bc1e9,#3749bb,#00237e)`,
    },
  },
  plugins: [],
};
