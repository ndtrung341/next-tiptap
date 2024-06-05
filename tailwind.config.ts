import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100ch", // add required value here
            "blockquote p:first-of-type::before": false,
            "blockquote p:first-of-type::after": false,
            ul: {
              "> li": {
                "> p": {
                  margin: 0,
                },
              },
            },
            div: {
              img: {
                margin: 0,
              },
              "&:has(* > img)": {
                marginTop: "1.5em",
                marginBottom: "1.5em",
              },
            },
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
