import { MVCWrapper } from 'utils/MVCWrapper';
import { homeController } from './HomeController';
import { HomeView } from './HomeView';

export const HomeContent = MVCWrapper({
  view: HomeView,
  controller: homeController,
});

