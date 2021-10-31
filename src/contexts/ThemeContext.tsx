import React, { useEffect, useState } from 'react';
import { createTheme, Theme, ThemeProvider as MaterialThemeProvider } from '@mui/material';

export type ThemeType = 'light' | 'dark';

const ThemeContext = React.createContext<
  [ThemeType, React.Dispatch<React.SetStateAction<ThemeType>>]
>(['dark', () => {}]);

export function useTheme() {
  return React.useContext(ThemeContext);
}

interface ThemeContextProps {
  children: React.ReactNode;
}

export function ThemeProvider(props: ThemeContextProps) {
  const [theme, setTheme] = useState<ThemeType>(
    window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );
  const [materialTheme, setMaterialTheme] = useState<Theme>(
    createTheme({
      palette: {
        mode: window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark',
      },
    })
  );

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
    document.querySelector('html')?.setAttribute('theme', theme);
    setMaterialTheme(
      createTheme({
        palette: {
          mode: theme,
        },
      })
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <MaterialThemeProvider theme={materialTheme}>{props.children}</MaterialThemeProvider>
    </ThemeContext.Provider>
  );
}
