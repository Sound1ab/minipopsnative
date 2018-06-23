import {Navigation} from 'react-native-navigation';
import { Provider } from 'react-redux'
import App from './src/components/App';
import store from './src/redux';

Navigation.registerComponent('example.FirstTabScreen', () => App, store, Provider);

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'One',
      screen: 'example.FirstTabScreen',
      title: 'Screen One'
    },
  ]
});
