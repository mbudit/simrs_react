/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'], // Simpler definition
            },
            fontWeight: {
                normal: '400',
                medium: '500',
                bold: '600'
            }
        },
    },
    plugins: [],
}