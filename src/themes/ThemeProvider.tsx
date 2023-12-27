import React, {createContext} from 'react';
import {useColorScheme} from 'react-native';
import {Colors, colors} from './colors';
import {Typography, typography} from './typography';

export type ThemeContextData = {
  colors: Colors;
  typography: Typography;
};

export const ThemeContext = createContext<ThemeContextData>(
  {} as ThemeContextData,
);

type Props = {
  children?: React.ReactNode;
};

const ThemeProvider: React.FC<Props> = ({children}) => {
  const scheme = useColorScheme();

  const theme: ThemeContextData = {
    colors: scheme === 'dark' ? colors.dark : colors.light,
    typography,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
