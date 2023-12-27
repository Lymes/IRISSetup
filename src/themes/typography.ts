import {Platform} from 'react-native';

export type Sizes = {
  tiny: number;
  small: number;
  medium: number;
  large: number;
  huge: number;
};

export type Families = {
  bold: string;
  light: string;
  medium: string;
  regular: string;
};

const size: Sizes = {
  tiny: 10,
  small: 16,
  medium: 20,
  large: 30,
  huge: 42,
};

const letterSpacing: Sizes = {
  tiny: 2,
  small: 3,
  medium: 5,
  large: 10,
  huge: 15,
};

const family = {
  bold: 'SFProText-Bold',
  light: 'SFProText-Light',
  medium: 'SFProText-Medium',
  regular: 'SFProText-Regular',
};

export type Typography = {
  size: Sizes;
  letterSpacing: Sizes;
  family: Families;
};

export const typography: Typography = {size, letterSpacing, family};
