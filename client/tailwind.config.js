module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'josefin-sans': ['Josefin Sans', 'sans-serif'],
      },
      backgroundImage: {
        'button-gradient':
          'linear-gradient(130deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
      },
      colors: {
        // Primary colors
        blue: 'hsl(220, 98%, 61%)',
        cyan: 'hsl(192, 100%, 67%)',
        violet: 'hsl(280, 87%, 65%)',

        // Light theme
        'light-bg-primary': 'hsl(0, 0%, 98%)',
        'light-bg-secondary': 'hsl(236, 33%, 92%)',
        'light-text-primary': 'hsl(236, 9%, 61%)',
        'light-text-secondary': 'hsl(233, 11%, 84%)',
        'light-text-tertiary': 'hsl(235, 19%, 35%)',

        // Dark theme
        'dark-bg-primary': 'hsl(235, 24%, 19%)',
        'dark-bg-secondary': 'hsl(235, 21%, 11%)',
        'dark-text-primary': 'hsl(234, 39%, 85%)',
        'dark-text-primary--hover': 'hsl(236, 33%, 92%)',
        'dark-text-secondary': 'hsl(234, 11%, 52%)',
        'dark-text-tertiary': 'hsl(237, 14%, 26%)',
        'dark-text-quaternary': 'hsl(233, 14%, 35%)',
      },
    },
  },
  plugins: [],
};
