import DisplayController from './display-controller';
import ListsController from './lists-controller';

const pageLoad = () => {
  DisplayController.initialize();
  ListsController.initialize();
  DisplayController.updateDisplay();
};

export default pageLoad;
