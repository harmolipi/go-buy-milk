import { DisplayController } from './display-controller';
import { ProjectsController } from './projects-controller';

const pageLoad = () => {
  DisplayController.initialize();
  ProjectsController.initialize();
  DisplayController.updateDisplay();
};

export default pageLoad;