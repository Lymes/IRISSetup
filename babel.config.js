module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
       'module-resolver',
       {
         root: ['.'],
         extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
         alias: {
           tests: ['./tests/'],
           assets: ['./assets'],
           "~contexts": ["./src/contexts"],
           "~routes": ["./src/routes"],
           "~screens": ["./src/screens"],
           "~services": ["./src/services"],
           "~hooks": ["./src/hooks"],     
           "~redux": ["./src/redux"],     
           "~components": "./src/components",
           "~navigation": "./src/navigation",
           "~constants": "./src/constants",
           "~themes": "./src/themes",
           "~i18n": "./src/i18n"
         }
       }
    ]
  ]
};
