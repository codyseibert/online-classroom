import { homeController } from '../components/pages/homeController';
import { HomeView } from '../components/pages/HomeView';
import { NextReactWrapper } from '../utils/NextReactWrapper';

export default NextReactWrapper({
  View: HomeView,
  controller: homeController,
  title: 'Home'
});
