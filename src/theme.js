export const breakpoints = [640, 1023, 1440];

export default {
  gridSize: '1070px',
  breakpoints: breakpoints.map((i) => i + 'px'),
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  colors: {
    beige: '#FFF7EB',
    black: '#1A1A1A',
    blue: '#1B42D8',
    lightGreen: '#D7ECDC',
    orange: '#FFA015',
    white: '#FFFFFF',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    heading: 'Prompt, sans-serif',
    body: 'IBM Plex Sans, sans-serif',
  },
};
