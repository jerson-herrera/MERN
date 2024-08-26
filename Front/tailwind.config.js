/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], //Dentro de index.html y los archivos que estan en la carpeta src y que termina en js,ts,jsx,tsx van a poder acceder a la clases de tailwind
  theme: {
    extend: {},
  },
  plugins: [],
};
