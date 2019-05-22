import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import SplashWindow from './src/components/SplashWindow';
import HomeScreen from './src/components/HomeScreen';
import FingerPrint from './src/components/FingerPrint';
import Calculating from './src/components/Calculating';
import ShowData from './src/components/ShowData';

const RootStack = createStackNavigator(
  {
    Splash: SplashWindow,
    Home: HomeScreen,
    Scan: FingerPrint,
    Calculating: Calculating,
    ShowData: ShowData
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(RootStack);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4caf50',
    background: '#f6f6f6'
  }
};

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <AppContainer />      
      </PaperProvider>
    );
  }
}

