import { MVCWrapper } from '../../../utils/MVCWrapper';
import { homeController, homeControllerModel } from './homeController';
import { HomeView } from './HomeView';

const getContext = () => {
  return {};
};

export const HomeContent = MVCWrapper({
  view: HomeView,
  controller: homeController,
  model: homeControllerModel,
  getContext,
});

export type HomeControllerGetContext = typeof getContext;
