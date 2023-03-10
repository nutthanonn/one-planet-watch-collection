import { Theme } from '@styles/theme/light';
import React from 'react';
import { ThemeProvider } from 'styled-components';

interface AppProviderProps {
  children: React.ReactNode;
  theme: Theme;
}

const AppProvider: React.FC<AppProviderProps> = (props) => {
  return (
    <>
      <ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>
    </>
  );
};

export default AppProvider;
