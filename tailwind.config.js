/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'],
    plugins: [require('daisyui')],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                gray: {
                    500: '#64676c',
                },
                navy: {
                    100: '#e7ecf3',
                    200: '#b5c4d9',
                    600: '#114084',
                },
                cobalt: {
                    100: '#d9eafb',
                    200: '#b0d4f6',
                    500: '#0075e1',
                    600: '#0069cb',
                    700: '#005eb4',
                },
            },
        },
    },
    daisyui: {
        styled: true,
        themes: [
            {
                bookingApp: {
                    primary: '#2D2BA5',
                    secondary: '#114084',
                    accent: '#4E5154',
                    neutral: '#FCFDFD',
                    'base-100': '#ffffff',
                    textColor: 'primary',
                    hover: '#114084',
                },
            },
        ],
    },
};
