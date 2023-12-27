import {useContext} from 'react';
import {ThemeContext} from '~themes/ThemeProvider';

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
