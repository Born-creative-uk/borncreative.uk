import typography from '@tailwindcss/typography';

export default {
  content: [
    './BC New/**/*.{html,js}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Arial', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.25)'
      }
    }
  },
  plugins: [typography]
};
