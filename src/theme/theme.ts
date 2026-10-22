import { createTheme } from '@mui/material/styles';

export type Mode = 'dark' | 'light';

export const getTheme = (mode: Mode) => {
  const d = mode === 'dark';
  return createTheme({
    palette: {
      mode,
      primary: { main: d ? '#a78bfa' : '#5b3fd0' },
      background: { default: d ? '#0e0e10' : '#f6f5f8', paper: d ? '#17171a' : '#ffffff' },
      text: { primary: d ? '#f2f1f4' : '#18171c', secondary: d ? '#a09ea8' : '#5d5b66' },
      divider: d ? '#2a2a2f' : '#dcdae3',
    },
    shape: { borderRadius: 6 },
    typography: {
      fontFamily: '"Manrope", system-ui, -apple-system, sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.03, fontSize: 'clamp(2.5rem, 7.5vw, 5.25rem)' },
      h2: { fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1, fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' },
      h3: { fontWeight: 700, letterSpacing: '-0.015em', fontSize: '1.35rem' },
      body1: { lineHeight: 1.7 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: 'smooth', scrollPaddingTop: 72 },
          '@media (prefers-reduced-motion: reduce)': { html: { scrollBehavior: 'auto' } },
          body: { overflowX: 'hidden' },
        },
      },
      MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { padding: '10px 22px', minHeight: 44 } } },
      MuiChip: { styleOverrides: { root: { borderRadius: 6, fontWeight: 500 } } },
      MuiLink: { defaultProps: { underline: 'hover' } },
    },
  });
};
